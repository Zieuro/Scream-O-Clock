import { Show, Slot, Row } from "./types";

export function getPhase(
  now: number,
  show: Show,
): "preShow" | "show" | "postShow" | "noShow" {
  if (now < show.callTime) return "preShow";
  if (now >= show.callTime && now < show.endTime) return "show";
  if (now >= show.endTime && now < show.clearTime) return "postShow";
  return "noShow";
}

export function buildSlots(show: Show, rows: Row[] | null): Slot[] {
  const slots: Slot[] = [];

  let cursor = show.startTime;
  let i = 0;

  while (cursor < show.endTime) {
    let slotEnd = cursor + show.slotMinutes * 60000;
    if (slotEnd > show.endTime) {
      slotEnd = show.endTime;
    }

    const slot: Slot = {
      id: String(cursor),
      start: cursor,
      end: slotEnd,
      row: rows && rows[i] ? rows[i] : null,
    };
    slots.push(slot);
    cursor = slotEnd;
    i++;
  }
  return slots;
}

export function getCurrentSlot(slots: Slot[], now: number): Slot | undefined {
  return slots.find((slot) => now >= slot.start && now < slot.end);
}

export function getNextSlot(slots: Slot[], now: number): Slot | undefined {
  return slots.find((slot) => slot.start > now);
}

export function getFutureSlots(slots: Slot[], now: number): Slot[] {
  return slots.filter((slot) => slot.start > now);
}