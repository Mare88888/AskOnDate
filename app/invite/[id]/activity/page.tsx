import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getInvitation } from "@/lib/actions";
import { isValidInvitationId } from "@/lib/utils";
import { ActivityPageClient } from "@/components/ActivityPageClient";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Choose an activity",
};

export default async function ActivityPage({ params }: Props) {
  const { id } = await params;

  if (!isValidInvitationId(id)) {
    notFound();
  }

  const result = await getInvitation(id);
  if (!result.success) {
    notFound();
  }

  if (!result.data.accepted) {
    redirect(`/invite/${id}`);
  }

  if (!result.data.dateTime) {
    redirect(`/invite/${id}/datetime`);
  }

  if (result.data.activityOption) {
    redirect(
      result.data.customMessage !== null
        ? `/invite/${id}/confirmation`
        : `/invite/${id}/message`
    );
  }

  return (
    <ActivityPageClient
      invitationId={id}
      initialActivity={result.data.activity}
    />
  );
}
