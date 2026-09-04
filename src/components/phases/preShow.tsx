import { useSettingsStore } from "@/state/settingsStore";
import { useAppStore } from "@/state/store";
import { View, Text } from "react-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { getLabel } from "@/constants/format";
import { usePreShowCountdown } from "@/hooks/useCountdown";
import { useShow } from "@/hooks/useShow";
import Card from "../card";

export default function PreShow() {
  const { show, now } = useAppStore();
  const { progress, timeLabel, preTimeLabel } = usePreShowCountdown();
  const { nextSlot } = useShow();

  const { role, positionView } = useSettingsStore();

  const isAfterCalltime = (show ? now >= show.callTime : null) ? true : false;

  const nextRow = nextSlot?.row;
  const nextPosition = nextRow?.[role];
  const nextPosLabel =
    !positionView && (nextPosition === "pos1" || nextPosition === "pos2")
      ? getLabel("on")
      : nextPosition
        ? getLabel(nextPosition)
        : null;

  return (
    <>
      <View className="mx-5 px-5 gap-4 flex-col items-center">
        <Text className="font-cinzel-bold text-center text-4xl text-muted">
          {isAfterCalltime ? "Show starts in:" : "Be at\nvenue in:"}
        </Text>
      </View>

      <CountdownRing
        progress={isAfterCalltime ? progress : 0}
        strokeBackground={Colors.borderSubtle}
      >
        <Text
          className="text-foreground text-6xl text-center w-full"
          style={{
            fontFamily: "Cinzel_700Bold_TNum",
            fontVariant: ["tabular-nums"],
            lineHeight: 98,
          }}
        >
          {isAfterCalltime ? timeLabel : preTimeLabel}
        </Text>
      </CountdownRing>

      {isAfterCalltime && <View className="mb-5">
        <Card>
          <Text className="font-cinzel-medium self-start text-2xl text-muted">
            Start:
          </Text>

          <Text className="self-center text-3xl font-cinzel-semibold text-muted">
            {nextPosLabel}
          </Text>
        </Card>
      </View>}
    </>
  );
}
