import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getInvitation } from "@/lib/actions";
import { isValidInvitationId } from "@/lib/utils";
import { InvitationPageClient } from "@/components/InvitationPageClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    title: "Will you go on a date with me? ❤️",
    description: "Someone special has a question for you...",
    openGraph: {
      title: "Will you go on a date with me? ❤️",
      description: "Someone special has a question for you...",
      url: `${appUrl}/invite/${id}`,
      images: [{ url: `${appUrl}/api/og?id=${id}`, width: 1200, height: 630 }],
    },
  };
}

export default async function InvitePage({ params }: Props) {
  const { id } = await params;

  if (!isValidInvitationId(id)) {
    notFound();
  }

  const result = await getInvitation(id);
  if (!result.success) {
    notFound();
  }

  if (result.data.accepted && result.data.activityOption) {
    redirect(`/invite/${id}/confirmation`);
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
