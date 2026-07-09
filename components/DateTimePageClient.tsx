"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/lib/actions";
import { Button } from "@/components/Button";
import { DateTimePicker } from "@/components/DateTimePicker";
import { InviteCard } from "@/components/InviteCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";

type DateTimePageClientProps = {
  invitationId: string;
  initialDateTime: Date | null;
};

export function DateTimePageClient({
  invitationId,
  initialDateTime,
}: DateTimePageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState(
    initialDateTime
      ? initialDateTime.toISOString().split("T")[0]
      : ""
  );
  const [time, setTime] = useState(
    initialDateTime
      ? initialDateTime.toTimeString().slice(0, 5)
      : ""
  );

  useEffect(() => {
    if (date && time) {
      const dateTime = new Date(`${date}T${time}`);
      if (!isNaN(dateTime.getTime())) {
        updateInvitation({ id: invitationId, dateTime });
      }
    }
  }, [date, time, invitationId]);

  const handleContinue = () => {
    if (!date || !time) {
      setError("Please select both a date and time");
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    if (isNaN(dateTime.getTime())) {
      setError("Invalid date or time");
      return;
    }

    if (dateTime < new Date()) {
      setError("Please select a future date and time");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await updateInvitation({
        id: invitationId,
        dateTime,
      });
      if (result.success) {
        router.replace(`/invite/${invitationId}/activity`);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <InviteCard>
      <div className="p-6 sm:p-8">
        <ProgressIndicator currentStep={2} />

        <h1 className="mb-6 text-center font-display text-2xl font-bold text-rose-700 dark:text-rose-200">
          When are you free?
        </h1>

        <DateTimePicker
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="mt-8 flex gap-3">
          <Button
            variant="secondary"
            onClick={() => router.push(`/invite/${invitationId}`)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            loading={isPending}
            disabled={!date || !time}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </InviteCard>
  );
}
