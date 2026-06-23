import { createInvitation } from "@/lib/actions";
import { InviteCard } from "@/components/InviteCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { redirect } from "next/navigation";

async function createAndRedirect() {
  "use server";
  const result = await createInvitation();
  if (result.success) {
    redirect(`/invite/${result.data.id}`);
  }
}

export default function HomePage() {
  return (
    <InviteCard>
      <div className="p-8 text-center">
        <span className="mb-4 block text-5xl">💕</span>
        <h1 className="mb-3 font-display text-3xl font-bold text-rose-700 dark:text-rose-200">
          Date With Me
        </h1>
        <p className="mb-8 text-rose-500 dark:text-rose-400">
          Create a romantic date invitation to share with someone special
        </p>

        <form action={createAndRedirect}>
          <Button type="submit" className="w-full">
            Create Invitation ❤️
          </Button>
        </form>

        <p className="mt-6 text-xs text-rose-400 dark:text-rose-500">
          Or share a custom link like{" "}
          <Link
            href="/invite/our-first-date"
            className="underline hover:text-rose-600"
          >
            /invite/our-first-date
          </Link>
        </p>
      </div>
    </InviteCard>
  );
}
