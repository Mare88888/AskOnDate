"use client";

import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/lib/actions";
import { Button } from "@/components/Button";
import { AvoidingNoButton } from "@/components/AvoidingNoButton";
import { InviteCard } from "@/components/InviteCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import Image from "next/image";

type InvitationPageClientProps = {
  invitationId: string;
};

export function InvitationPageClient({
  invitationId,
}: InvitationPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const noSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateInvitation({ id: invitationId, accepted: false });
  }, [invitationId]);

  const handleYes = () => {
    startTransition(async () => {
      const result = await updateInvitation({
        id: invitationId,
        accepted: true,
      });
      if (result.success) {
        router.push(`/invite/${invitationId}/datetime`);
      }
    });
  };

  return (
    <InviteCard>
      <div className="relative p-6 sm:p-8">
        <ProgressIndicator currentStep={1} />

        <div className="mb-6 flex justify-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/date-invite.svg"
              alt="Cute date invitation"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="mb-8 text-center font-display text-2xl font-bold leading-snug text-rose-700 dark:text-rose-200 sm:text-3xl">
          Will you go on a date with me? ❤️
        </h1>

        <div className="relative z-20">
          <Button onClick={handleYes} loading={isPending} className="w-full">
            Yes ❤️
          </Button>
          <div
            ref={noSlotRef}
            className="mt-3 flex h-12 items-center justify-center"
            aria-hidden
          />
        </div>

        <AvoidingNoButton slotRef={noSlotRef} />
      </div>
    </InviteCard>
  );
}
