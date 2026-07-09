import type { Metadata } from "next";
import { InvitePage } from "@/components/InvitePage";
import { getAppUrl } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const appUrl = getAppUrl();

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

export default async function InvitePageRoute({ params }: Props) {
  const { id } = await params;
  return <InvitePage id={id} />;
}
