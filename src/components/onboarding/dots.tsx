import React, { FC } from "react";
import { View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Colors } from "@/constants/colors";

// scream-o-clock-onboarding-carousel-animation 🔽

interface DotsProps {
  numberOfDots: number; // Dynamic dot count for responsive pagination
  activeIndex: SharedValue<number>; // Shared value drives color transitions across all dots
}

export const Dots: FC<DotsProps> = ({ numberOfDots, activeIndex }) => {
  return (
    <View className="flex-row mt-2 items-center justify-center gap-1">
      {Array.from({ length: numberOfDots }, (_, index) => (
        <Dot key={index} index={index} activeIndex={activeIndex} />
      ))}
    </View>
  );
};

interface DotProps {
  index: number; // Dot position for active state comparison
  activeIndex: SharedValue<number>; // Shared carousel state for color animation
}

const Dot: FC<DotProps> = ({ index, activeIndex }) => {
  // Animated color transition based on active carousel state
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = withTiming(
      activeIndex.get() === index ? Colors.primary : Colors.border, // Active red, inactive dark border
      {
        duration: 200, // 200ms timing matches carousel page transition feel
      },
    );

    return {
      backgroundColor,
    };
  });

  return <Animated.View className="w-2 h-2 rounded-full" style={animatedStyle} />;
};

// scream-o-clock-onboarding-carousel-animation 🔼
