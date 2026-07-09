"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/lib/actions";
import { Button } from "@/components/Button";
import { InviteCard } from "@/components/InviteCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { cn } from "@/lib/utils";

const MAX_MESSAGE_LENGTH = 500;

type MessagePageClientProps = {
  invitationId: string;
  initialMessage: string | null;
};

export function MessagePageClient({
  invitationId,
  initialMessage,
}: MessagePageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState(initialMessage ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    setError(null);
    startTransition(async () => {
      const result = await updateInvitation({
        id: invitationId,
        customMessage: message.trim(),
      });
      if (result.success) {
        router.push(`/invite/${invitationId}/confirmation`);
      } else {
        setError(result.error);
      }
    });
  };

  const handleBack = () => {
    startTransition(async () => {
      await updateInvitation({
        id: invitationId,
        activityOption: null,
        customMessage: null,
      });
      router.push(`/invite/${invitationId}/activity-details`);
    });
  };

  return (
    <InviteCard>
      <div className="p-6 sm:p-8">
        <ProgressIndicator currentStep={5} />

        <h1 className="mb-2 text-center font-display text-2xl font-bold text-rose-700 dark:text-rose-200">
          Anything else you&apos;d like to say?
        </h1>
        <p className="mb-6 text-center text-sm text-rose-500 dark:text-rose-400">
          Add a sweet note, a request, or anything on your mind 💌
        </p>

        <label htmlFor="custom-message" className="sr-only">
          Custom message
        </label>
        <textarea
          id="custom-message"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
          placeholder="Can't wait to see you!"
          rows={5}
          className={cn(
            "w-full resize-none rounded-2xl border-2 border-rose-200 bg-white px-4 py-3",
            "text-sm text-rose-700 outline-none transition-colors",
            "placeholder:text-rose-300",
            "focus:border-rose-400 focus:ring-2 focus:ring-rose-200",
            "dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
            "dark:placeholder:text-rose-600",
            "dark:focus:border-rose-500 dark:focus:ring-rose-800"
          )}
        />
        <p className="mt-2 text-right text-xs text-rose-400 dark:text-rose-500">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </p>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="mt-8 flex gap-3">
          <Button
            variant="secondary"
            onClick={handleBack}
            loading={isPending}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            loading={isPending}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </InviteCard>
  );
}
