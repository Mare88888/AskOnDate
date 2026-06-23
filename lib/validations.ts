import { z } from "zod";

export const invitationIdSchema = z
  .string()
  .min(3, "Invitation ID must be at least 3 characters")
  .max(64, "Invitation ID must be at most 64 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Invitation ID can only contain letters, numbers, hyphens, and underscores"
  );

export const createInvitationSchema = z.object({
  id: invitationIdSchema.optional(),
});

export const updateInvitationSchema = z.object({
  id: invitationIdSchema,
  accepted: z.boolean().optional(),
  dateTime: z.coerce.date().optional().nullable(),
  activity: z.string().min(1).max(100).optional().nullable(),
  activityOption: z.string().min(1).max(100).optional().nullable(),
});

export const getInvitationSchema = z.object({
  id: invitationIdSchema,
});

export type CreateInvitationInput = z.infer<typeof createInvitationSchema>;
export type UpdateInvitationInput = z.infer<typeof updateInvitationSchema>;
export type GetInvitationInput = z.infer<typeof getInvitationSchema>;

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
