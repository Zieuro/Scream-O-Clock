import { Platform } from "react-native";
import {
  AlarmKit,
  AlarmKitManager,
} from "react-native-ios-alarmkit";
import type { Slot } from "@/domain/types";
import { getFutureSlots } from "@/domain/slots";
import { Colors } from "@/constants/colors";

export function isAlarmKitAvailable(): boolean {
  return Platform.OS === "ios" && AlarmKit.isSupported;
}

// AlarmKit requires UUID ids but slot ids are epoch-ms strings. Derive the
// UUID deterministically so any code path can recompute it from the slot id
// to cancel that alarm later.
function slotIdToUUID(slotId: string): string {
  const hash = (seed: number): string => {
    let h = seed >>> 0;
    for (let i = 0; i < slotId.length; i++) {
      h = Math.imul(h ^ slotId.charCodeAt(i), 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, "0");
  };
  const s =
    hash(0x811c9dc5) + hash(0x01000193) + hash(0x9e3779b9) + hash(0x85ebca6b);
  // stamp version 4 + RFC variant nibbles so strict UUID parsers accept it
  const withVersion = s.slice(0, 12) + "4" + s.slice(13, 32);
  const withVariant =
    withVersion.slice(0, 16) + "8" + withVersion.slice(17, 32);
  return [
    withVariant.slice(0, 8),
    withVariant.slice(8, 12),
    withVariant.slice(12, 16),
    withVariant.slice(16, 20),
    withVariant.slice(20, 32),
  ].join("-");
}

export async function ensureAlarmKitAuthorization(): Promise<boolean> {
  if (!isAlarmKitAvailable()) return true;
  try {
    const state = await AlarmKit.getAuthorizationState();
    if (state === "authorized") return true;
    return await AlarmKit.requestAuthorization();
  } catch (err) {
    console.warn("AlarmKit authorization failed", err);
    return false;
  }
}

export async function scheduleSlotAlarms(
  slots: Slot[],
  now: number,
): Promise<number> {
  const futureSlots = getFutureSlots(slots, now);

  for (const slot of futureSlots) {
    // Built by hand instead of AlarmConfigurationFactory.alarm because the
    // factory hardcodes a postAlert countdown; a non-nil countdown makes the
    // alarm countdown-capable, which AlarmKit requires a widget extension for
    // and fails to alert without one. Zeros decode to no countdown on the
    // native side, keeping the alarm alert-only.
    const config = {
      countdownDuration: { preAlert: 0, postAlert: 0 },
      schedule: { type: "fixed" as const, date: slot.start },
      presentation: {
        alert: {
          title: "ROTATE",
          stopButton: {
            text: "Stop",
            textColor: "#FFFFFF",
            systemImageName: "stop.circle",
          },
          secondaryButton: {
            text: "Open",
            textColor: "#FFFFFF",
            systemImageName: "arrow.up.app",
          },
          secondaryButtonBehavior: "custom" as const,
        },
      },
      tintColor: Colors.primary,
      soundName: "silence.mp3",
    };
    await AlarmKitManager.shared.scheduleOrReschedule(
      slotIdToUUID(slot.id),
      config,
    );
  }

  return futureSlots.length;
}

export async function cancelAllSlotAlarms(): Promise<void> {
  if (!isAlarmKitAvailable()) return;
  const alarms = await AlarmKitManager.shared.getAlarms();
  await Promise.all(alarms.map((a) => AlarmKitManager.shared.cancel(a.id)));
}
