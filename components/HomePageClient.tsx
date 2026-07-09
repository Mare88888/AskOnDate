"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createInvitation } from "@/lib/actions";
import { Button } from "@/components/Button";
import { InviteCard } from "@/components/InviteCard";

export function HomePageClient() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createInvitation();
      if (result.success) {
        router.replace(`/invite/${result.data.id}`);
      }
    });
  };

  return (
    <InviteCard>
      <div className="p-6 text-center sm:p-8">
        <span className="mb-4 block text-5xl">💌</span>
        <h1 className="mb-3 font-display text-2xl font-bold text-rose-700 dark:text-rose-200">
          Date With Me
        </h1>
        <p className="mb-8 text-sm text-rose-500 dark:text-rose-400">
          Create a new invitation link to send to someone special.
        </p>
        <Button onClick={handleCreate} loading={isPending} className="w-full">
          Create invitation ❤️
        </Button>
      </div>
    </InviteCard>
  );
}
