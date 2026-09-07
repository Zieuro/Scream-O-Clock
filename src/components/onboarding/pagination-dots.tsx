import { FC } from "react";
import { View } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedIndex } from "./animated-index-context";
import { Colors } from "@/constants/colors";

interface DotProps {
  index: number;
}

// Each dot fades dim→primary→dim as the continuous index passes through it.
const Dot: FC<DotProps> = ({ index }) => {
  const { activeIndex } = useAnimatedIndex();

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      activeIndex.get(),
      [index - 1, index, index + 1],
      [Colors.border, Colors.primary, Colors.border],
    ),
  }));

  return <Animated.View className="size-2 rounded-full" style={animatedStyle} />;
};

export const PaginationDots: FC<{ numberOfDots: number }> = ({ numberOfDots }) => (
  <View className="flex-row items-center justify-center gap-2">
    {Array.from({ length: numberOfDots }, (_, index) => (
      <Dot key={index} index={index} />
    ))}
  </View>
);
