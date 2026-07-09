import { notFound, redirect } from "next/navigation";
import { getInvitation } from "@/lib/actions";
import { isValidInvitationId } from "@/lib/utils";
import { InvitationPageClient } from "@/components/InvitationPageClient";

type InvitePageProps = {
  id: string;
};

export async function InvitePage({ id }: InvitePageProps) {
  if (!isValidInvitationId(id)) {
    notFound();
  }

  const result = await getInvitation(id);
  if (!result.success) {
    notFound();
  }

  if (result.data.accepted && result.data.customMessage !== null) {
    redirect(`/invite/${id}/confirmation`);
  }
  if (result.data.accepted && result.data.activityOption) {
    redirect(`/invite/${id}/message`);
  }
  if (result.data.accepted && result.data.activity) {
    redirect(`/invite/${id}/activity-details`);
  }
  if (result.data.accepted && result.data.dateTime) {
    redirect(`/invite/${id}/activity`);
  }
  if (result.data.accepted) {
    redirect(`/invite/${id}/datetime`);
  }

  return <InvitationPageClient invitationId={id} />;
}
