import { useSettingsStore } from "@/state/settingsStore";
import { useAppStore } from "@/state/store";
import { View, Text } from "react-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { getLabel } from "@/constants/format";
import { usePreShowCountdown } from "@/hooks/useCountdown";
import { useShow } from "@/hooks/useShow";
import { useUiScale } from "@/hooks/useUiScale";
import Card from "../card";

export default function PreShow() {
  const s = useUiScale();
  const show = useAppStore((s) => s.show);
  const now = useAppStore((s) => s.now);
  const { progress, timeLabel, preTimeLabel } = usePreShowCountdown();
  const { nextSlot } = useShow();

  const role = useSettingsStore((s) => s.role);
  const positionView = useSettingsStore((s) => s.positionView);

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
      <View
        className="mx-5 px-5 flex-col items-center"
        style={{ gap: Math.round(16 * s) }}
      >
        <Text
          className="font-cinzel-bold text-center text-muted"
          style={{ fontSize: Math.round(34 * s) }}
        >
          {isAfterCalltime ? "Show starts in:" : "Be at\nvenue in:"}
        </Text>
      </View>

      <CountdownRing
        progress={isAfterCalltime ? progress : 0}
        strokeBackground={Colors.borderSubtle}
      >
        {(ringSize) => (
          <Text
            className="text-foreground text-center w-full"
            style={{
              fontFamily: "Cinzel_700Bold_TNum",
              fontVariant: ["tabular-nums"],
              fontSize: ringSize * 0.2,
              lineHeight: ringSize * 0.2 * 1.633,
            }}
          >
            {isAfterCalltime ? timeLabel : preTimeLabel}
          </Text>
        )}
      </CountdownRing>

      {isAfterCalltime && (
        <View style={{ marginBottom: Math.round(20 * s) }}>
          <Card scale={s}>
            <Text
              className="font-cinzel-medium self-start text-muted"
              style={{ fontSize: Math.round(24 * s) }}
            >
              Start:
            </Text>

            <Text
              className="self-center font-cinzel-semibold text-muted"
              style={{ fontSize: Math.round(30 * s) }}
            >
              {nextPosLabel}
            </Text>
          </Card>
        </View>
      )}
    </>
  );
}
