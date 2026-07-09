import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { createInvitation } from "@/lib/actions";
import { getAppUrl } from "@/lib/utils";

const appUrl = getAppUrl();

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  noStore();

  const result = await createInvitation();
  if (!result.success) {
    throw new Error(result.error);
  }

  redirect(`/invite/${result.data.id}`);
}
