import { useMemo } from "react";
import { getCurrentSlot, getFutureSlots, getNextSlot } from "@/domain/slots";
import { useAppStore } from "@/state/store";

export function useShow() {
  const slots = useAppStore((s) => s.slots);
  const now = useAppStore((s) => s.now);

  return useMemo(() => {
    const slot = getCurrentSlot(slots, now);
    const nextSlot = getNextSlot(slots, now);
    const futureSlots = getFutureSlots(slots, now);

    return {
      slot,
      nextSlot,
      futureSlots,
    };
  }, [slots, now]);
}
