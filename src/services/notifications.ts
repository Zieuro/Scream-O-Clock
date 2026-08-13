import notifee from "@notifee/react-native";
import { AndroidImportance, TriggerType } from "@notifee/react-native";
import { Slot } from "@/domain/types";

export async function ensureChannel() {
  const channelId = await notifee.createChannel({
    id: "scream-channel",
    name: "Scream Alarms",
    importance: AndroidImportance.HIGH,
  });
}

export async function scheduleSlotNotifications(slots: Slot[]) {
  for (const slot of slots) {
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
  }
}

export function cancelAllNotifications() {
  notifee.cancelAllNotifications();
}

export function requestPermissions() {
  //TODO
}
