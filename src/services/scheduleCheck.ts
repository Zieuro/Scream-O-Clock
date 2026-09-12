import { Show, Slot } from "@/domain/types";
import { buildActiveShow } from "@/domain/show";
import { buildSlots } from "@/domain/slots";
import { fetchConfig } from "./config";
import { fetchRows, fetchSpecialtyRows } from "./assignments";
import { useAppStore } from "@/state/store";
import { useSettingsStore } from "@/state/settingsStore";

function showsEqual(a: Show | null, b: Show | null): boolean {
  if (!a || !b) return a === b;
  return (
    a.callTime === b.callTime &&
    a.startTime === b.startTime &&
    a.endTime === b.endTime &&
    a.clearTime === b.clearTime &&
    a.slotMinutes === b.slotMinutes
  );
}

function slotsEqual(a: Slot[], b: Slot[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((slot, i) => {
    const other = b[i];
    return (
      slot.id === other?.id &&
      slot.start === other.start &&
      slot.end === other.end &&
      slot.row?.a === other.row?.a &&
      slot.row?.b === other.row?.b &&
      slot.row?.c === other.row?.c
    );
  });
}

// Dry-run of what loadShow would build right now, compared against the
// current store. Read-only: a failed fetch can't be verified, so it reports
// no change rather than risking a false prompt.
export async function checkForScheduleUpdates(): Promise<boolean> {
  const { show, slots } = useAppStore.getState();
  const roleType = useSettingsStore.getState().roleType;
  const role = useSettingsStore.getState().role;

  const config = await fetchConfig();
  if (config === null) return false;
  const rows =
    roleType === "standard" ? await fetchRows() : await fetchSpecialtyRows();
  if (rows === null) return false;

  const candidate = buildActiveShow(new Date(), config, role);
  if (!showsEqual(show ?? null, candidate)) return true;

  const candidateSlots = candidate ? buildSlots(candidate, rows) : [];
  return !slotsEqual(slots, candidateSlots);
}
