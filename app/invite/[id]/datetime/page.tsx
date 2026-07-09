import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getInvitation } from "@/lib/actions";
import { isValidInvitationId } from "@/lib/utils";
import { DateTimePageClient } from "@/components/DateTimePageClient";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "When are you free?",
};

export default async function DateTimePage({ params }: Props) {
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

  return (
    <DateTimePageClient
      invitationId={id}
      initialDateTime={result.data.dateTime}
    />
  );
}
