import { Role, Season_Config, Show } from "./types";
import { useSettingsStore } from "@/state/settingsStore";

// The show that should currently be displayed: during the after-midnight
// window (< 3 AM) yesterday's show takes priority while it is still within
// its clear window; once cleared, today's show takes over.
export function buildActiveShow(
  date: Date,
  config: Season_Config,
  role: Role,
): Show | null {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayShow =
    date.getHours() < 3 ? buildTodaysShow(yesterday, config, role) : null;
  return yesterdayShow && yesterdayShow.clearTime > date.getTime()
    ? yesterdayShow
    : buildTodaysShow(date, config, role);
}

export function buildTodaysShow(
  date: Date,
  config: Season_Config,
  role: Role,
): Show | null {
  const thisMonth = date.getMonth();
  const today = date.getDay();
  const callDate = new Date(date);
  const startDate = new Date(date);
  const endDate = new Date(date);
  const clearDate = new Date(date);

  // Check if its Sept or Oct
  if (!(thisMonth in config)) return null;
  const thisConfig = config[thisMonth];

  // Checks if today is a show day
  if (!thisConfig.days.includes(today)) return null;

  // Gets the close hour (midnight or 1am) for today's show
  if (!(today in thisConfig.endHours)) return null;
  const endHour = thisConfig.endHours[today];
  const clearHour = endHour + 2;

  /* =============================================================
    Turns the todays times to epoch ms and gets ready for return
   ============================================================= */
  if (role === "c") {
    callDate.setHours(thisConfig.callHour, 30, 0, 0);
  } else {
    callDate.setHours(thisConfig.callHour, 0, 0, 0);
  }
  const callTime = callDate.getTime();

  startDate.setHours(thisConfig.startHour, 0, 0, 0);
  const startTime = startDate.getTime();

  // Midnight rollover
  if (endHour < thisConfig.callHour) {
    endDate.setDate(endDate.getDate() + 1);
  }
  endDate.setHours(endHour, 0, 0, 0);
  const endTime = endDate.getTime();

  if (clearHour < thisConfig.callHour) {
    clearDate.setDate(clearDate.getDate() + 1);
  }
  clearDate.setHours(clearHour, 0, 0, 0);
  const clearTime = clearDate.getTime();

  // Checks roleType and sets slotMinutes accordingly
  const roleType = useSettingsStore.getState().roleType
  const slotMinutes = (roleType === "specialty") ? 30 : 20

  return {
    callTime: callTime,
    startTime: startTime,
    endTime: endTime,
    clearTime: clearTime,
    slotMinutes: slotMinutes, // rotation interval
  };
}
