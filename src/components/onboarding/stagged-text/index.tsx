import { View } from "react-native";
import { SharedValue, useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import type { FC } from "react";

import { AnimatedChar } from "./animated-char";
import { scheduleOnRN } from "react-native-worklets";

// scream-o-clock-onboarding-carousel-animation 🔽

type Props = {
  text: string; // Text content to animate character by character
  fontSize?: number; // Rendered font size; callers scale it to the screen size
  activeIndex: SharedValue<number>; // Current carousel state for visibility control
  showIndex: number[]; // Array of carousel indices where this text should be visible
};

export const StaggeredText: FC<Props> = ({
  text,
  fontSize = 30,
  activeIndex,
  showIndex,
}: Props) => {
  // Keep explicit line height in sync so containers can size themselves
  const lineHeight = Math.round(fontSize * 1.25);
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
        // Character offset of this line in the full text (newlines included)
        // so the stagger cascade runs continuously across line breaks
        const lineOffset = lines
          .slice(0, lineIndex)
          .reduce((sum, prevLine) => sum + prevLine.length + 1, 0);
        const words = line.split(" ");

        return (
          <View key={lineIndex} className="flex-row flex-wrap justify-center">
            {words.map((word, wordIndex) => {
              // Each word is an unbreakable row so lines only wrap between
              // words, never mid-word
              const wordOffset =
                lineOffset +
                words
                  .slice(0, wordIndex)
                  .reduce((sum, prevWord) => sum + prevWord.length + 1, 0);

              return (
                <View key={wordIndex} className="flex-row">
                  {word.split("").map((char, charIndex) => (
                    <AnimatedChar
                      key={charIndex}
                      char={char}
                      fontSize={fontSize}
                      lineHeight={lineHeight}
                      index={wordOffset + charIndex} // Global character position for stagger timing
                      totalCount={text.length} // Total characters for animation calculations
                      progress={progress} // Shared animation trigger
                    />
                  ))}
                  {/* Spacer stands in for the space character between words */}
                  {wordIndex < words.length - 1 && (
                    <View style={{ width: fontSize * 0.28 }} />
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

// scream-o-clock-onboarding-carousel-animation 🔼
