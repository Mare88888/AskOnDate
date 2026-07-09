"use server";

import { prisma } from "@/lib/prisma";
import { generateInvitationId } from "@/lib/utils";
import {
  createInvitationSchema,
  getInvitationSchema,
  updateInvitationSchema,
  type ActionResult,
} from "@/lib/validations";
import { revalidatePath } from "next/cache";

export type DateResponseData = {
  id: string;
  accepted: boolean;
  dateTime: Date | null;
  activity: string | null;
  activityOption: string | null;
  customMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function createInvitation(
  input?: { id?: string }
): Promise<ActionResult<DateResponseData>> {
  try {
    const parsed = createInvitationSchema.safeParse(input ?? {});
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input" };
    }

    const customId = parsed.data.id;
    if (customId) {
      const existing = await prisma.dateResponse.findUnique({
        where: { id: customId },
      });
      if (existing) {
        return { success: true, data: existing };
      }
    }

    const invitation = await prisma.dateResponse.create({
      data: {
        id: customId ?? generateInvitationId(),
      },
    });

    return { success: true, data: invitation };
  } catch (error) {
    console.error("createInvitation error:", error);
    return { success: false, error: "Failed to create invitation" };
  }
}

export async function getInvitation(
  id: string
): Promise<ActionResult<DateResponseData>> {
  try {
    const parsed = getInvitationSchema.safeParse({ id });
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid ID" };
    }

    let invitation = await prisma.dateResponse.findUnique({
      where: { id: parsed.data.id },
    });

    if (!invitation) {
      invitation = await prisma.dateResponse.create({
        data: { id: parsed.data.id },
      });
    }

    return { success: true, data: invitation };
  } catch (error) {
    console.error("getInvitation error:", error);
    return { success: false, error: "Failed to fetch invitation" };
  }
}

export async function updateInvitation(
  input: {
    id: string;
    accepted?: boolean;
    dateTime?: Date | null;
    activity?: string | null;
    activityOption?: string | null;
    customMessage?: string | null;
  }
): Promise<ActionResult<DateResponseData>> {
  try {
    const parsed = updateInvitationSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input" };
    }

    const { id, ...data } = parsed.data;

    const invitation = await prisma.dateResponse.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });

    revalidatePath(`/invite/${id}`);
    revalidatePath(`/invite/${id}/datetime`);
    revalidatePath(`/invite/${id}/activity`);
    revalidatePath(`/invite/${id}/activity-details`);
    revalidatePath(`/invite/${id}/message`);
    revalidatePath(`/invite/${id}/confirmation`);

    return { success: true, data: invitation };
  } catch (error) {
    console.error("updateInvitation error:", error);
    return { success: false, error: "Failed to update invitation" };
  }
}
