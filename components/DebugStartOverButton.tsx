"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/lib/actions";
import { Button } from "@/components/Button";

type DebugStartOverButtonProps = {
  invitationId: string;
};

export function DebugStartOverButton({
  invitationId,
}: DebugStartOverButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(async () => {
      await updateInvitation({
        id: invitationId,
        accepted: false,
        dateTime: null,
        activity: null,
        activityOption: null,
        customMessage: null,
      });

      router.push(`/invite/${invitationId}`);
    });
  };

  return (
    <div className="mt-8 border-t border-dashed border-rose-200 pt-6 dark:border-rose-800">
      <p className="mb-3 text-center text-xs text-rose-400 dark:text-rose-500">
        Debug only
      </p>
      <Button
        variant="ghost"
        onClick={handleReset}
        loading={isPending}
        className="w-full text-xs opacity-60"
      >
        Back to start
      </Button>
    </div>
  );
}
