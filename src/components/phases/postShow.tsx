import { View, Text } from "react-native";
import { Separator } from "heroui-native";
import CountdownRing from "../countdownRing";
import { Colors } from "@/constants/colors";
import { useCountdown } from "@/hooks/useCountdown";
import Card from "../card";
import useDisarm from "@/hooks/useDisarm";

export default function PostShow() {
  const { timeLabel } = useCountdown();
  useDisarm();

  return (
    <>
      <View className="mx-5 px-5 gap-4 flex-col">
        <Text className="font-cinzel-bold text-center text-4xl text-muted">
          Show is over
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text className="text-center text-4xl font-cinzel-semibold text-muted">
          Great job everyone!!!
        </Text>
      </View>

      <CountdownRing progress={0} strokeBackground={Colors.borderSubtle}>
        <Text
          className="text-foreground text-6xl text-center w-full"
          style={{
            fontFamily: "Cinzel_700Bold_TNum",
            fontVariant: ["tabular-nums"],
            lineHeight: 98,
          }}
        >
          {timeLabel}
        </Text>
      </CountdownRing>

      <View className="mb-5">
        <Card>
          <Text className="font-cinzel-bold py-2 text-center text-3xl text-primary">
            Feed the fear
          </Text>
        </Card>
      </View>
    </>
  );
}
