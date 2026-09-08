import { View } from "react-native";
import { SharedValue, useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import type { FC } from "react";

import { AnimatedChar } from "./animated-char";
import { scheduleOnRN } from "react-native-worklets";

// scream-o-clock-onboarding-carousel-animation 🔽

type Props = {
  text: string; // Text content to animate character by character
  activeIndex: SharedValue<number>; // Current carousel state for visibility control
  showIndex: number[]; // Array of carousel indices where this text should be visible
};

export const StaggeredText: FC<Props> = ({ text, activeIndex, showIndex }: Props) => {
  // Animation progress shared value: 0 = hidden, 1 = fully visible
  const progress = useSharedValue(0);

  // Trigger staggered character animation with delay
  const show = () => {
    if (progress.value === 1) return; // Prevent duplicate animations
    setTimeout(() => {
      progress.value = 1; // Start character cascade animation
    }, 250); // 250ms delay allows carousel transition to settle
  };

  // React to carousel changes and control text visibility
  useAnimatedReaction(
    () => activeIndex.get(),
    (value) => {
      if (showIndex.includes(value)) {
        // Current carousel state matches this text's display indices
        scheduleOnRN(show); // Bridge to JS thread for setTimeout
      } else {
        // Hide text immediately when not in display range
        progress.value = 0;
      }
    },
  );

  const lines = text.split("\n");

  return (
    <View className="items-center">
      {lines.map((line, lineIndex) => {
        // Continue the stagger cascade across line breaks
        const charOffset = lines
          .slice(0, lineIndex)
          .reduce((sum, prevLine) => sum + prevLine.length, 0);

        return (
          <View key={lineIndex} className="flex-row flex-wrap justify-center">
            {line.split("").map((char, index) => (
              <AnimatedChar
                key={index}
                char={char}
                index={charOffset + index} // Global character position for stagger timing
                totalCount={text.length} // Total characters for animation calculations
                progress={progress} // Shared animation trigger
              />
            ))}
          </View>
        );
      })}
    </View>
  );
};

// scream-o-clock-onboarding-carousel-animation 🔼
