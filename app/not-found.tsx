import Link from "next/link";
import { InviteCard } from "@/components/InviteCard";

export default function NotFound() {
  return (
    <InviteCard>
      <div className="p-8 text-center">
        <span className="mb-4 block text-5xl">💔</span>
        <h1 className="mb-3 text-2xl font-bold text-rose-700 dark:text-rose-200">
          Invitation not found
        </h1>
        <p className="mb-6 text-rose-500 dark:text-rose-400">
          This invitation link doesn&apos;t seem to exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-md"
        >
          Go to invitation
        </Link>
      </div>
    </InviteCard>
  );
}
