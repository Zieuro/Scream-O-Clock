import notifee, { AuthorizationStatus, AndroidImportance, TriggerType } from "@notifee/react-native";
import { Slot } from "@/domain/types";
import { getFutureSlots } from "@/domain/slots";

export async function ensureChannel() {
  const channelId = await notifee.createChannel({
    id: "scream-channel",
    name: "Scream Alarms",
    importance: AndroidImportance.HIGH,
  });
}

export async function scheduleSlotNotifications(
  slots: Slot[],
  now: number
): Promise<number> {
  const futureSlots = getFutureSlots(slots, now);
  let scheduled = 0;

  for (const slot of futureSlots) {
    await notifee.createTriggerNotification(
      {
        id: slot.id,
        title: "ROTATE",
        body: "It is time to rotate",
        android: {
          channelId: "scream-channel",
          vibrationPattern: [300, 500],
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: slot.start,
        alarmManager: true,
      },
    );
    scheduled++;
  }

  return scheduled;
}

export function cancelAllNotifications() {
  notifee.cancelAllNotifications();
}

export async function requestPermissions() {
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus == AuthorizationStatus.NOT_DETERMINED) {
    const permission = await notifee.requestPermission();
    return permission.authorizationStatus == AuthorizationStatus.AUTHORIZED;
  }
  return settings.authorizationStatus == AuthorizationStatus.AUTHORIZED;
}