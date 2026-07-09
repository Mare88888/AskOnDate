import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { getAppUrl } from "@/lib/utils";

const appUrl = getAppUrl();

export const metadata: Metadata = {
  title: "Will you go on a date with me? ❤️",
  description: "Someone special has a question for you...",
  openGraph: {
    title: "Will you go on a date with me? ❤️",
    description: "Someone special has a question for you...",
    url: appUrl,
    images: [
      {
        url: `${appUrl}/api/og`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
