import React, { FC } from "react";
import { View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Colors } from "@/constants/colors";

// scream-o-clock-onboarding-carousel-animation 🔽

interface DotsProps {
  numberOfDots: number; // Dynamic dot count for responsive pagination
  activeIndex: SharedValue<number>; // Shared value drives color transitions across all dots
  size?: number; // Dot diameter; callers scale it to the screen size
  gap?: number; // Spacing between dots
}

export const Dots: FC<DotsProps> = ({
  numberOfDots,
  activeIndex,
  size = 8,
  gap = 4,
}) => {
  return (
    <View
      className="flex-row items-center justify-center"
      style={{ gap }}
    >
      {Array.from({ length: numberOfDots }, (_, index) => (
        <Dot
          key={index}
          index={index}
          activeIndex={activeIndex}
          size={size}
        />
      ))}
    </View>
  );
};

interface DotProps {
  index: number; // Dot position for active state comparison
  activeIndex: SharedValue<number>; // Shared carousel state for color animation
  size: number; // Dot diameter
}

const Dot: FC<DotProps> = ({ index, activeIndex, size }) => {
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

  return (
    <Animated.View
      className="rounded-full"
      style={[{ width: size, height: size }, animatedStyle]}
    />
  );
};

// scream-o-clock-onboarding-carousel-animation 🔼
