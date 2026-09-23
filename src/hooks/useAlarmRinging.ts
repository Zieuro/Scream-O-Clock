import { useEffect } from "react";
import { AppState, Platform, Vibration } from "react-native";
import notifee, { EventType } from "@notifee/react-native";
import { usePathname, useRouter } from "expo-router";
import { useAppStore } from "@/state/store";
import { useSettingsStore } from "@/state/settingsStore";
import { VIBRATION_PATTERN } from "@/services/notifications";
import ShowWhenLocked from "../../modules/show-when-locked";

// Slot ids are epoch-ms strings, so any other notification id isn't an alarm.
function isSlotNotification(id?: string): boolean {
  return !!id && /^\d+$/.test(id);
}

// Bridges the OS alarm into the app: Android's full-screen intent can start
// the activity, but only the JS side can decide to show the alarm page.
// Covers all three delivery paths — cold start from a killed process
// (getInitialNotification), fired while the app is open (DELIVERED event),
// and fired while the process was alive but backgrounded (activity surfaces
// without remounting JS, so re-check displayed notifications on resume).
export function useAlarmRinging() {
  const router = useRouter();
  const pathname = usePathname();
  const ringingSlot = useAppStore((s) => s.ringingSlot);
  const startRingingSlot = useAppStore((s) => s.startRingingSlot);
  const showOnLockScreen = useSettingsStore((s) => s.showOnLockScreen);

  // Applies the lock-screen preference: while a ring is active the flags are
  // forced on (the alarm must take over the lock screen even for users with
  // the preference off — a warm app instance needs them re-asserted after the
  // full-screen intent already launched), otherwise the user's choice decides
  // whether waking the phone shows the app over the lock screen.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    ShowWhenLocked?.setShowWhenLocked(ringingSlot ? true : showOnLockScreen);
  }, [ringingSlot, showOnLockScreen]);

  // Single navigation owner for the alarm flow. The guard keeps it
  // idempotent — a dispatch only happens when the path differs from the
  // target, so no amount of event replays or effect re-runs can loop.
  // navigate (not replace) because the target can live in another navigator:
  // "/" resolves to the tabs from the root stack, which REPLACE can't cross.
  // Android-only: on iOS AlarmKit owns the alarm UI.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    if (ringingSlot && pathname !== "/alarm") router.navigate("/alarm");
    else if (!ringingSlot && pathname === "/alarm") router.navigate("/");
  }, [ringingSlot, pathname, router]);

  // The system silences a notification's alerts the moment the user views it
  // (e.g. swipes the shade down), so the app drives vibration itself: a
  // Vibrator session is independent of the notification and runs until the
  // ring ends. The looped notification sound already survives the shade.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    if (!ringingSlot) {
      Vibration.cancel();
      return;
    }
    Vibration.vibrate(VIBRATION_PATTERN, true);
    return () => Vibration.cancel();
  }, [ringingSlot]);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const checkDisplayed = async () => {
      const displayed = await notifee.getDisplayedNotifications();
      const alarm = displayed.find(({ notification }) =>
        isSlotNotification(notification.id),
      );
      // true: the alarm surfaced the app itself (full-screen intent), so
      // Stop should background the app instead of routing within it.
      if (alarm?.notification.id) startRingingSlot(alarm.notification.id, true);
    };

    void notifee.getInitialNotification().then((initial) => {
      const id = initial?.notification.id;
      if (isSlotNotification(id)) startRingingSlot(id!, true);
    });

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      const id = detail.notification?.id;
      if (type === EventType.DELIVERED && isSlotNotification(id)) {
        // false: the app was already open, so the user was in the app.
        startRingingSlot(id!, false);
      }
    });

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") void checkDisplayed();
    });
    void checkDisplayed();

    return () => {
      unsubscribe();
      subscription.remove();
    };
  }, [startRingingSlot]);
}
