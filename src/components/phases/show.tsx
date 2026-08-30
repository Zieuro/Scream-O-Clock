import { getCurrentSlot } from "@/domain/slots";
import { useSettingsStore } from "@/state/settingsStore";
import { useAppStore } from "@/state/store";
import { View, Text } from "react-native";
import { Separator } from "heroui-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { getLabel, fmt } from "@/constants/format";
import { getTimeLabel, getTimeRemaining } from "@/constants/clock";

export default function Show() {
  const currentSlots = useAppStore((s) => s.slots);
  const now = useAppStore((s) => s.now);

  const slot = getCurrentSlot(currentSlots, now);
  const role = useSettingsStore((s) => s.role);
  const row = slot?.row;

  const myPosition = row?.[role];
  const posLabel = myPosition ? getLabel(myPosition) : null;

  const remaining = getTimeRemaining()
  const timeLabel = getTimeLabel(remaining)

  return (
    <>
      <View className="mx-5 py-2 px-5 gap-4 flex-col">
        <Text className="font-cinzel self-center text-4xl text-neutral-400">
          Right Now
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text className="self-center text-3xl font-medium text-primary">
          {posLabel}
        </Text>
      </View>

      <View className="items-center">
        <CountdownRing strokeBackground={Colors.borderSubtle}>
          <Text className="text-foreground text-6xl">
            Hello
          </Text>
        </CountdownRing>
      </View>
    </>
  );
}
