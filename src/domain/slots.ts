import { Show, Slot, Assignment } from "./types"

export function getPhase(now: number, show: Show): 'preShow' | 'show' | 'postShow' {
  if (now < show.callTime) return 'preShow'

  if (now >= show.callTime && now < show.endTime) return 'show'
  return 'postShow'
}

export function buildSlots(show: Show): Slot[] {
  const slots: Slot[] = []

  let cursor = show.startTime

  while (cursor < show.endTime) {
    let slotEnd = cursor + show.slotMinutes * 60000
    if (slotEnd > show.endTime) {
      slotEnd = show.endTime
    }
    const slot: Slot = {
      id: String(cursor),
      start: cursor,
      end: slotEnd,
      assignments: []
    }
    slots.push(slot)
    cursor = slotEnd
  }
  return slots
}

export function getCurrentSlot(slots: Slot[], now: number): Slot | null {
 return slots.find(slot => now >= slot.start && now < slot.end) ?? null
}

export function getNextSlot(slots: Slot[], now: number): Slot | null {
 return slots.find(slot => slot.start > now) ?? null
}
