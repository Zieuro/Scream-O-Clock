import { useSettingsStore } from "@/state/settingsStore";
import { View, Text } from "react-native";
import { Separator } from "heroui-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { getLabel } from "@/constants/format";
import { useCountdown } from "@/hooks/useCountdown";
import { useShow } from "@/hooks/useShow";
import Card from "../card";

export default function Show() {
  const { progress, timeLabel } = useCountdown();
  const { slot, nextSlot } = useShow();

  const role = useSettingsStore((s) => s.role);

  const row = slot?.row;
  const myPosition = row?.[role];
  const posLabel = myPosition ? getLabel(myPosition) : null;

  const nextRow = nextSlot?.row;
  const nextPosition = nextRow?.[role];
  const nextPosLabel = nextPosition ? getLabel(nextPosition) : null;

  return (
    <>
      <View className="mx-5 px-5 gap-4 flex-col">
        <Text className="font-cinzel-bold self-center text-4xl text-muted">
          Right Now
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text className="self-center text-4xl font-cinzel-semibold text-primary">
          {posLabel}
        </Text>
      </View>

      <CountdownRing
        progress={progress}
        strokeBackground={Colors.borderSubtle}
      >
        <Text
          className="text-foreground text-6xl text-center w-full"
          style={{
            fontFamily: "Cinzel_700Bold_TNum",
            fontVariant: ["tabular-nums"],
            lineHeight: 64,
          }}
        >
          {timeLabel}
        </Text>
      </CountdownRing>

      <View className="mb-5">
        <Card>
          <Text className="font-cinzel-medium self-start text-2xl text-muted">
            Next:
          </Text>

          <Text className="self-center text-3xl font-cinzel-semibold text-muted">
            {nextPosLabel}
          </Text>
        </Card>
      </View>
    </>
  );
}