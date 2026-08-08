import { Show } from "./types"

/* =============================================================
    Constant config for the season
============================================================= */
const SEASON_CONFIG: Record<number, {
  days: number[],
  callHour: number,
  startHour: number,
  endHours: Record<number, number>
}> = {
  8: {  // September (getMonth() is 0-indexed)
    days: [5, 6],           // Friday, Saturday
    callHour: 19,
    startHour: 20,
    endHours: { 5: 1, 6: 1 } // Friday → 01:00, Saturday → 01:00
  },
  9: {  // October
    days: [4, 5, 6, 0],     // Thursday through Sunday
    callHour: 19,
    startHour: 20,
    endHours: { 4: 0, 5: 1, 6: 1, 0: 0 } // Thur→midnight, Fri→01:00, Sat→01:00, Sun→midnight
  }
}

export function buildTodaysShow(date: Date): Show | null {
  const thisMonth = date.getMonth()
  const today = date.getDay()
  const callDate = new Date(date)
  const startDate = new Date(date)
  const endDate = new Date(date)

  // Check if its Sept or Oct
  if (!(thisMonth in SEASON_CONFIG)) return null
  const config = SEASON_CONFIG[thisMonth]

  // Checks if today is a show day
  if (!config.days.includes(today)) return null

  // Gets the close hour (midnight or 1am) for today's show
  if (!(today in config.endHours)) return null
  const endHour = config.endHours[today]

  /* =============================================================
    Turns the todays times to epoch ms and gets ready for return
   ============================================================= */
  callDate.setHours(config.callHour, 0, 0, 0)
  const callTime = callDate.getTime()

  startDate.setHours(config.startHour, 0, 0, 0)
  const startTime = startDate.getTime()

  // Midnight rollover
  if (endHour < config.callHour) {
    endDate.setDate(endDate.getDate() + 1)
  }
  endDate.setHours(endHour, 0, 0, 0)
  const endTime = endDate.getTime()

  return {
    callTime: callTime,
    startTime: startTime,
    endTime: endTime,
    slotMinutes: 20, // fixed rotation interval
  }
}
