import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getInvitation } from "@/lib/actions";
import { isValidInvitationId } from "@/lib/utils";
import { InviteCard } from "@/components/InviteCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ConfirmationSummary } from "@/components/ConfirmationSummary";
import { DebugStartOverButton } from "@/components/DebugStartOverButton";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Thank you ❤️",
};

export default async function ConfirmationPage({ params }: Props) {
  const { id } = await params;

  if (!isValidInvitationId(id)) {
    notFound();
  }

  const result = await getInvitation(id);
  if (!result.success) {
    notFound();
  }

  const { accepted, dateTime, activity, activityOption, customMessage } =
    result.data;

  if (!accepted) {
    redirect(`/invite/${id}`);
  }
  if (!dateTime) {
    redirect(`/invite/${id}/datetime`);
  }
  if (!activity) {
    redirect(`/invite/${id}/activity`);
  }
  if (!activityOption) {
    redirect(`/invite/${id}/activity-details`);
  }
  if (result.data.customMessage === null) {
    redirect(`/invite/${id}/message`);
  }

  return (
    <InviteCard>
      <div className="p-6 sm:p-8">
        <ProgressIndicator currentStep={6} />
        <ConfirmationSummary
          dateTime={dateTime}
          activity={activity}
          activityOption={activityOption}
          customMessage={customMessage}
        />
      </div>
    </InviteCard>
  );
}
