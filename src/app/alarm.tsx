import { useEffect } from "react";
import { Platform, Text, Pressable, View } from "react-native";
import { Redirect } from "expo-router";
import notifee from "@notifee/react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import Screen from "@/components/screen";
import { Colors } from "@/constants/colors";
import { useAppStore } from "@/state/store";
import { getRandom } from "@/constants/format";
import { useSplashReveal } from "@/hooks/useSplashReveal";

// Android's stand-in for AlarmKit's system alarm UI: the full-screen intent
// lands here over the lock screen. The notification owns the ringing sound
// (loopSound), so stopping means cancelling it. Navigation is owned by
// useAlarmRinging — this page only manages ringing state.
export default function Alarm() {
  // A cold-start alarm lands here without (tabs) ever mounting, so this is
  // the screen responsible for revealing the splash.
  useSplashReveal();

  const ringingSlot = useAppStore((s) => s.ringingSlot);
  const stopRingingSlot = useAppStore((s) => s.stopRingingSlot);

  // The ring ended elsewhere (Stop pressed on the notification, disarm, or
  // the notification expired) — clear it so useAlarmRinging navigates away.
  // Cancel defensively too, so a flaky displayed-notifications check can't
  // resurrect the ring.
  useEffect(() => {
    if (!ringingSlot) return;
    notifee.getDisplayedNotifications().then((displayed) => {
      const stillRinging = displayed.some(
        ({ notification }) => notification.id === ringingSlot,
      );
      if (!stillRinging) {
        void notifee.cancelNotification(ringingSlot);
        stopRingingSlot();
      }
    });
  }, [ringingSlot, stopRingingSlot]);

  const stop = async () => {
    if (ringingSlot) await notifee.cancelNotification(ringingSlot);
    stopRingingSlot();
  };

  // The alarm page is Android-only (useAlarmRinging never navigates here on
  // iOS, where AlarmKit owns the alarm UI) — a stray deep link just bounces
  // back to Rotation.
  if (Platform.OS !== "android") return <Redirect href="/" />;

  const bodies = [
    "It is time to rotate",
    "Drink some water!",
    "You got this!\nKeep scaring!",
  ] as const;
  const body = getRandom(bodies);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Screen className="p-safe flex-1 items-center justify-center gap-6 px-6">
        <View className="flex-1 w-full items-center justify-evenly">
          <Text className="font-quicksand-bold text-primary text-7xl">
            ROTATE
          </Text>
          <Text className="font-quicksand-semibold text-foreground text-center text-3xl">
            {body}
          </Text>
          <Pressable
            onPress={stop}
            className="mt-12 w-full max-w-xs items-center rounded-full bg-primary py-6 active:opacity-80"
            accessibilityLabel="Stop alarm"
            accessibilityRole="button"
          >
            <Text className="font-mpu-bold text-2xl text-white">
              STOP
            </Text>
          </Pressable>
        </View>
      </Screen>
    </SafeAreaView>
  );
}
