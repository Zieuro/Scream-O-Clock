import notifee, {
  AuthorizationStatus,
  AndroidImportance,
  AndroidNotificationSetting,
  EventType,
  TriggerType,
  AlarmType,
  AndroidCategory,
} from "@notifee/react-native";
import { Platform } from "react-native";
import { Slot } from "@/domain/types";
import { getFutureSlots } from "@/domain/slots";
import {
  isAlarmKitAvailable,
  ensureAlarmKitAuthorization,
  scheduleSlotAlarms,
  cancelAllSlotAlarms,
} from "@/services/alarmkit";

// Channel settings (sound, vibration) are immutable once a channel is created,
// so changes to them require a new channel id. Older channels are deleted on
// init to keep device channel lists clean.
const CHANNEL_ID = "scream-channel-v4";
const LEGACY_CHANNEL_IDS = [
  "scream-channel",
  "scream-channel-v2",
  "scream-channel-v3",
];

// Channel vibration patterns play once through rather than looping, so make
// the pattern long enough to outlast the looped notification sound.
export const VIBRATION_PATTERN = Array.from({ length: 600 }, () => [250, 250]).flat();

export async function ensureChannel() {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: "Scream Alarms",
    importance: AndroidImportance.HIGH,
    bypassDnd: true,
    vibration: true,
    vibrationPattern: VIBRATION_PATTERN,
  });
  for (const legacyId of LEGACY_CHANNEL_IDS) {
    await notifee.deleteChannel(legacyId);
  }
}

export async function scheduleSlotNotifications(
  slots: Slot[],
  now: number,
): Promise<number> {
  if (isAlarmKitAvailable()) {
    return scheduleSlotAlarms(slots, now);
  }

  const futureSlots = getFutureSlots(slots, now);
  let scheduled = 0;

  for (const slot of futureSlots) {
    await notifee.createTriggerNotification(
      {
        id: slot.id,
        title: "ROTATE",
        body: "It is time to rotate",
        android: {
          channelId: CHANNEL_ID,
          category: AndroidCategory.ALARM,
          loopSound: true,
          ongoing: true,
          pressAction: { id: "default", launchActivity: "default" },
          fullScreenAction: { id: "default", launchActivity: "default" },
          actions: [{ title: "Stop", pressAction: { id: "stop-alarm" } }],
        },
        ios: {
          sound: "silence.caf",
          interruptionLevel: "timeSensitive",
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: slot.start,
        // alarmManager: true maps to plain setExact(), which Doze defers to
        // maintenance windows — alarms arrive minutes-to-hours late. SET_ALARM
        // _CLOCK is AlarmManager.setAlarmClock, the API real clock apps use:
        // it fires on time in Doze and shows the app's next alarm in system
        // alarm indicators.
        alarmManager: { type: AlarmType.SET_ALARM_CLOCK },
      },
    );
    scheduled++;
  }

  return scheduled;
}

export function cancelAllNotifications() {
  cancelAllSlotAlarms();
  notifee.cancelAllNotifications();
}

export async function requestPermissions() {
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
    const permission = await notifee.requestPermission();
    if (permission.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
      return false;
    }
  }

  return ensureAlarmKitAuthorization();
}

export function openNotificationSettings() {
  if (Platform.OS === "android") {
    notifee.openNotificationSettings();
  }
}

export function openAlarmPermissionSettings() {
  if (Platform.OS === "android") {
    notifee.openAlarmPermissionSettings();
  }
}

// Samsung/Xiaomi-style battery managers kill background apps — and with them
// the manifest receiver that delivers trigger notifications. activity is null
// on devices (and stock Android) without such a manager.
export async function hasOemPowerManager(): Promise<boolean> {
  if (Platform.OS !== "android") return false;
  const info = await notifee.getPowerManagerInfo();
  return info.activity != null;
}

export function openPowerManagerSettings() {
  if (Platform.OS === "android") {
    notifee.openPowerManagerSettings();
  }
}

// Android 12+ gates exact alarms behind SCHEDULE_EXACT_ALARM (user-revocable,
// and revocation deletes all scheduled triggers). NOT_SUPPORTED means the OS
// predates the permission, where exact alarms are always allowed — so only
// an explicit DISABLED blocks arming.
export async function ensureExactAlarmsEnabled(): Promise<boolean> {
  if (Platform.OS !== "android") return true;
  const settings = await notifee.getNotificationSettings();
  return settings.android.alarm !== AndroidNotificationSetting.DISABLED;
}

// loopSound keeps playing until the notification is cancelled, and ongoing
// notifications cannot be swiped away, so the Stop press action is the only
// off switch.
export function registerNotificationEvents() {
  notifee.onForegroundEvent(async ({ type, detail }) => {
    const id = detail.notification?.id;
    if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction?.id === "stop-alarm" &&
      id
    ) {
      await notifee.cancelNotification(id);
    }
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const id = detail.notification?.id;
    if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction?.id === "stop-alarm" &&
      id
    ) {
      await notifee.cancelNotification(id);
    }
  });
}
