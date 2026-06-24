import type { Metadata } from "next";
import { InvitePage, DEFAULT_INVITATION_ID } from "@/components/InvitePage";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Will you go on a date with me? ❤️",
  description: "Someone special has a question for you...",
  openGraph: {
    title: "Will you go on a date with me? ❤️",
    description: "Someone special has a question for you...",
    url: appUrl,
    images: [
      {
        url: `${appUrl}/api/og?id=${DEFAULT_INVITATION_ID}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HomePage() {
  return <InvitePage id={DEFAULT_INVITATION_ID} />;
}
