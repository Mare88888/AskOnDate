"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/lib/actions";
import {
  ACTIVITY_DETAILS,
  type ActivityId,
  isValidActivityId,
} from "@/lib/activities";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/Button";
import { InviteCard } from "@/components/InviteCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { motion } from "framer-motion";

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

  const options = isValidActivityId(activity)
    ? ACTIVITY_DETAILS[activity as ActivityId]
    : [];

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
        router.push(`/invite/${invitationId}/confirmation`);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <InviteCard className="max-w-[480px]">
      <div className="p-6 sm:p-8">
        <ProgressIndicator currentStep={4} />

        <h1 className="mb-6 text-center font-display text-2xl font-bold text-rose-700 dark:text-rose-200">
          What are you feeling?
        </h1>

        <div className="mb-6 grid grid-cols-2 gap-3">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ActivityCard
                emoji={option.emoji}
                label={option.label}
                selected={selected === option.id}
                onSelect={() => setSelected(option.id)}
              />
            </motion.div>
          ))}
        </div>

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => router.push(`/invite/${invitationId}/activity`)}
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
