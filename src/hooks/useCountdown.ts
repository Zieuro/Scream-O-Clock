import { useMemo } from "react";
import { getCurrentSlot, getNextSlot } from "@/domain/slots";
import { useAppStore } from "@/state/store";

function formatTimeLabel(remainingMs: number) {
  const totalSec = Math.max(0, Math.ceil(remainingMs / 1000));
  return `${Math.floor(totalSec / 60)}:${String(totalSec % 60).padStart(2, "0")}`;
}

export function useCountdown() {
  const { slots, now } = useAppStore();

  return useMemo(() => {
    const slot = getCurrentSlot(slots, now);

    if (!slot) {
      return {
        slot: undefined,
        remainingMs: 0,
        progress: 0,
        timeLabel: "0:00",
      };
    }

    const durationMs = Math.max(1, slot.end - slot.start);
    const remainingMs = Math.max(0, slot.end - now);
    const progress = Math.min(1, Math.max(0, 1 - remainingMs / durationMs));

    return {
      slot,
      remainingMs,
      progress,
      timeLabel: formatTimeLabel(remainingMs),
    };
  }, [slots, now]);
}

export function usePreShowCountdown() {
  const { now, show, slots } = useAppStore();

  return useMemo(() => {
    const nextSlot = getNextSlot(slots, now);

    if (!nextSlot) {
      return {
        slot: undefined,
        remainingMs: 0,
        progress: 0,
        timeLabel: "0:00",
      };
    }

    const durationMs = Math.max(1, nextSlot.end - nextSlot.start);
    const remainingMs = show ? Math.max(0, show.startTime - now) : 0;
    const progress = Math.min(1, Math.max(0, 1 - remainingMs / durationMs));
    return {
      progress,
      remainingMs,
      timeLabel: formatTimeLabel(remainingMs),
    };
  }, [slots, now, show]);
}
