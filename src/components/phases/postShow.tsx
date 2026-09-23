import { View, Text } from "react-native";
import { Separator } from "heroui-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { useCountdown } from "@/hooks/useCountdown";
import { useUiScale } from "@/hooks/useUiScale";
import Card from "../card";
import useDisarm from "@/hooks/useDisarm";

export default function PostShow() {
  const s = useUiScale();
  const { timeLabel } = useCountdown();
  useDisarm();

  return (
    <>
      <View
        className="mx-5 px-5 flex-col"
        style={{ gap: Math.round(16 * s) }}
      >
        <Text
          className="font-cinzel-bold text-center text-muted"
          style={{ fontSize: Math.round(34 * s) }}
        >
          Show is over
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text
          className="text-center font-cinzel-semibold text-muted"
          style={{ fontSize: Math.round(34 * s) }}
        >
          Great job everyone!!!
        </Text>
      </View>

      <CountdownRing progress={0} strokeBackground={Colors.borderSubtle}>
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
            {timeLabel}
          </Text>
        )}
      </CountdownRing>

      <View style={{ marginBottom: Math.round(20 * s) }}>
        <Card scale={s}>
          <Text
            className="font-cinzel-bold py-2 text-center text-primary"
            style={{ fontSize: Math.round(30 * s) }}
          >
            Feed the fear
          </Text>
        </Card>
      </View>
    </>
  );
}
