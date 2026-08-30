import { useSettingsStore } from "@/state/settingsStore";
import { View, Text } from "react-native";
import { Separator } from "heroui-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { getLabel } from "@/constants/format";
import { useCountdown } from "@/hooks/useCountdown";
import Card from "../card";

export default function Show() {
  const { slot, progress, timeLabel } = useCountdown();

  const role = useSettingsStore((s) => s.role);
  const row = slot?.row;

  const myPosition = row?.[role];
  const posLabel = myPosition ? getLabel(myPosition) : null;

  return (
    <>
      <View className="mx-5 py-2 px-5 gap-4 flex-col">
        <Text className="font-cinzel-bold self-center text-4xl text-foreground">
          Right Now
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text className="self-center text-4xl font-cinzel-semibold text-primary">
          {posLabel}
        </Text>
      </View>

      <View className="items-center">
        <CountdownRing
          progress={progress}
          strokeBackground={Colors.borderSubtle}
        >
          <Text
            className="text-foreground text-6xl text-center"
              style={{
                fontFamily: "Cinzel_700Bold_TNum",
                fontVariant: ["tabular-nums"],
                minWidth: 140,
              }}>
            {timeLabel}
          </Text>
        </CountdownRing>
      </View>

      <Card>
        <Text className="font-cinzel-medium self-start text-2xl text-foreground">
          Next:
        </Text>

        <Text className="self-center text-3xl font-cinzel-semibold text-foreground">
          {posLabel}
        </Text>
      </Card>
    </>
  );
}
