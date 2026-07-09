"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/lib/actions";
import { ACTIVITIES } from "@/lib/activities";
import { ActivitySelectionGrid } from "@/components/ActivitySelectionGrid";
import { Button } from "@/components/Button";
import { InviteCard } from "@/components/InviteCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";

type ActivityPageClientProps = {
  invitationId: string;
  initialActivity: string | null;
};

export function ActivityPageClient({
  invitationId,
  initialActivity,
}: ActivityPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(initialActivity ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) {
      setError("Please select an activity");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await updateInvitation({
        id: invitationId,
        activity: selected,
        activityOption: null,
      });
      if (result.success) {
        router.replace(`/invite/${invitationId}/activity-details`);
      } else {
        setError(result.error);
      }
    });
  };

  const handleBack = () => {
    startTransition(async () => {
      await updateInvitation({
        id: invitationId,
        activity: null,
        activityOption: null,
        customMessage: null,
      });
      router.push(`/invite/${invitationId}/datetime`);
    });
  };

  return (
    <InviteCard className="max-w-[480px]">
      <div className="p-6 sm:p-8">
        <ProgressIndicator currentStep={3} />

        <h1 className="mb-6 text-center font-display text-2xl font-bold text-rose-700 dark:text-rose-200">
          What kind of date sounds fun?
        </h1>

        <ActivitySelectionGrid
          items={ACTIVITIES}
          selected={selected}
          onSelect={setSelected}
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
