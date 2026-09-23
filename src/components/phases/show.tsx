import { useSettingsStore } from "@/state/settingsStore";
import { View, Text } from "react-native";
import { Separator } from "heroui-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { getLabel } from "@/constants/format";
import { useCountdown } from "@/hooks/useCountdown";
import { useShow } from "@/hooks/useShow";
import { useUiScale } from "@/hooks/useUiScale";
import Card from "../card";

export default function Show() {
  const s = useUiScale();
  const { progress, timeLabel } = useCountdown();
  const { slot, nextSlot } = useShow();

  const role = useSettingsStore((s) => s.role);
  const positionView = useSettingsStore((s) => s.positionView);

  const row = slot?.row;
  const myPosition = row?.[role];

  const posLabel = !positionView && (myPosition === "pos1" || myPosition === "pos2")
    ? getLabel('on')
    : (myPosition ? getLabel(myPosition) : null);


  const nextRow = nextSlot?.row;
  const nextPosition = nextRow?.[role];
  const nextPosLabel = !positionView && (nextPosition === "pos1" || nextPosition === "pos2")
    ? getLabel('on')
    : (nextPosition ? getLabel(nextPosition) : null);

  return (
    <>
      <View
        className="mx-5 px-5 flex-col"
        style={{ gap: Math.round(16 * s) }}
      >
        <Text
          className="font-cinzel-bold self-center text-muted"
          style={{ fontSize: Math.round(34 * s) }}
        >
          Right Now
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text
          className="self-center font-cinzel-semibold text-primary"
          style={{ fontSize: Math.round(34 * s) }}
        >
          {posLabel}
        </Text>
      </View>

      <CountdownRing progress={progress} strokeBackground={Colors.borderSubtle}>
        {(ringSize) => (
          <Text
            className="text-foreground text-center w-full"
            style={{
              fontFamily: "Cinzel_700Bold_TNum",
              fontVariant: ["tabular-nums"],
              // Cinzel metrics: lineHeight = fontSize * 1.633 keeps the
              // numerals centered; 60/98 at the 300px ring cap (as tuned)
              fontSize: ringSize * 0.2,
              lineHeight: ringSize * 0.2 * 1.633,
            }}
          >
            {timeLabel}
          </Text>
        )}
      </CountdownRing>

      <View style={{ marginBottom: Math.round(20 * s) }}>
        <Card scale={s}>
          <Text
            className="font-cinzel-medium self-start text-muted"
            style={{ fontSize: Math.round(24 * s) }}
          >
            Next:
          </Text>

          <Text
            className="self-center font-cinzel-semibold text-muted"
            style={{ fontSize: Math.round(30 * s) }}
          >
            {nextPosLabel}
          </Text>
        </Card>
      </View>
    </>
  );
}
