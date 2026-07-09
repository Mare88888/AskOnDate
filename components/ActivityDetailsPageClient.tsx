"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/lib/actions";
import { getActivityOptions } from "@/lib/activities";
import { ActivitySelectionGrid } from "@/components/ActivitySelectionGrid";
import { Button } from "@/components/Button";
import { InviteCard } from "@/components/InviteCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";

type ActivityDetailsPageClientProps = {
  invitationId: string;
  activity: string;
  initialOption: string | null;
};

export function ActivityDetailsPageClient({
  invitationId,
  activity,
  initialOption,
}: ActivityDetailsPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(initialOption ?? "");
  const [error, setError] = useState<string | null>(null);

  const options = getActivityOptions(activity);

  const handleContinue = () => {
    if (!selected) {
      setError("Please select an option");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await updateInvitation({
        id: invitationId,
        activityOption: selected,
      });
      if (result.success) {
        router.replace(`/invite/${invitationId}/message`);
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
      router.push(`/invite/${invitationId}/activity`);
    });
  };

  return (
    <InviteCard className="max-w-[480px]">
      <div className="p-6 sm:p-8">
        <ProgressIndicator currentStep={4} />

        <h1 className="mb-6 text-center font-display text-2xl font-bold text-rose-700 dark:text-rose-200">
          What are you feeling?
        </h1>

        <ActivitySelectionGrid
          items={options}
          selected={selected}
          onSelect={setSelected}
          animated
        />

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="flex gap-3">
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
            disabled={!selected}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </InviteCard>
  );
}
