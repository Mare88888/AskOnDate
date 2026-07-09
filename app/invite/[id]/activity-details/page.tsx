import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getInvitation } from "@/lib/actions";
import { isValidInvitationId } from "@/lib/utils";
import { isValidActivityId } from "@/lib/activities";
import { ActivityDetailsPageClient } from "@/components/ActivityDetailsPageClient";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Activity details",
};

export default async function ActivityDetailsPage({ params }: Props) {
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

  if (!result.data.activity || !isValidActivityId(result.data.activity)) {
    redirect(`/invite/${id}/activity`);
  }

  if (result.data.activityOption) {
    redirect(`/invite/${id}/message`);
  }

  return (
    <ActivityDetailsPageClient
      invitationId={id}
      activity={result.data.activity}
      initialOption={result.data.activityOption}
    />
  );
}
