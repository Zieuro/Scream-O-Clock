import { useAppStore } from "@/state/store";
import { getCurrentSlot } from "@/domain/slots";

export function getTimeRemaining() {
  const slots = useAppStore((s) => s.slots);
  const now = useAppStore((s) => s.now);
  const slot = getCurrentSlot(slots, now);
  
  const slotMs = slot ? slot.end - slot.start : 20 * 60_000;
  const remaining = slot ? slot.end - now : 0; // ms till next rotation
  const progress = slot ? 1 - remaining / slotMs : 0; // 0..1 around the ring
  
  return progress;
}

export function getTimeLabel(remaining: number) {
  const totalSec = Math.max(0, Math.ceil(remaining / 1000));
  return `${Math.floor(totalSec / 60)}:${String(totalSec % 60).padStart(2, "0")}`
}