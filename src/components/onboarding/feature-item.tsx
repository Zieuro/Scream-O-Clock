import React, { FC } from "react";
import { Text, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";

// scream-o-clock-onboarding-carousel-animation 🔽

// Animation state constants for consistent transitions
const INITIAL_OPACITY = 0; // Hidden state for entering/exiting items
const ACTIVE_OPACITY = 1; // Fully visible active item
const TRANSLATE_DISTANCE = 40; // 40px vertical movement for enter/exit animations
const ACTIVE_TRANSLATE_DISTANCE = 0; // Centered position for active item
const INITIAL_SCALE = 0.8; // Slightly smaller scale for depth effect
const ACTIVE_SCALE = 1; // Full size for active item prominence

// Spring animation configuration for natural motion feel
const SPRING_CONFIG = {
  damping: 110, // Moderate damping for smooth entrance
  stiffness: 800, // Snappy stiffness for decisive transitions
};

type Props = {
  label: string; // Feature description text to display
  itemIndex: number; // This item's position in carousel for state comparison
  activeIndex: SharedValue<number>; // Current active carousel item
  prevIndex: SharedValue<number>; // Previous active item for transition direction
};

export const FeatureItem: FC<Props> = ({ label, itemIndex, activeIndex, prevIndex }) => {
  // Individual animation shared values for this feature item
  const opacity = useSharedValue(INITIAL_OPACITY); // Controls visibility fade
  const translateY = useSharedValue(-TRANSLATE_DISTANCE); // Vertical position for slide animations
  const scale = useSharedValue(INITIAL_SCALE); // Size scaling for depth effect

  // Initialize item to enter state based on scroll direction
  const initEnter = (isAscending: boolean) => {
    "worklet"; // Runs on UI thread for 60fps performance
    opacity.set(INITIAL_OPACITY);
    // Position item above or below based on swipe direction
    translateY.set(isAscending ? -TRANSLATE_DISTANCE : TRANSLATE_DISTANCE);
    scale.set(INITIAL_SCALE);
  };

  // Animate item to active state with gentle spring motion
  const onEnter = () => {
    "worklet"; // UI thread execution for smooth animations
    opacity.set(withSpring(ACTIVE_OPACITY, SPRING_CONFIG));
    translateY.set(withSpring(ACTIVE_TRANSLATE_DISTANCE, SPRING_CONFIG));
    scale.set(withSpring(ACTIVE_SCALE, SPRING_CONFIG));
  };

  // Animate item out of view with directional movement
  const onExit = (isAscending: boolean) => {
    "worklet"; // UI thread worklet for performance
    opacity.set(withSpring(INITIAL_OPACITY, SPRING_CONFIG));
    // Move item in opposite direction of scroll for natural exit
    translateY.set(withSpring(isAscending ? TRANSLATE_DISTANCE : -TRANSLATE_DISTANCE, SPRING_CONFIG));
    scale.set(withSpring(INITIAL_SCALE, SPRING_CONFIG));
  };

  // React to carousel state changes and orchestrate item transitions
  useAnimatedReaction(
    () => ({
      activeIndex: activeIndex.value,
      prevIndex: prevIndex.value,
    }),
    ({ activeIndex, prevIndex }) => {
      // Determine scroll direction for appropriate animation direction
      const isAscending = activeIndex > prevIndex; // Swiping to next item
      const isDescending = activeIndex < prevIndex; // Swiping to previous item

      if (activeIndex === itemIndex) {
        // This item is becoming active
        if (isAscending) {
          // Ascending swipe: item appears from top with entrance animation
          initEnter(true); // Start from top position with small scale and no opacity
          onEnter(); // Animate to center position with full scale and opacity
        } else if (isDescending) {
          // Descending swipe: item appears from bottom with entrance animation
          initEnter(false); // Start from bottom position with small scale and no opacity
          onEnter(); // Animate to center position with full scale and opacity
        } else {
          // Initial state or direct selection - no animation needed
          scale.set(ACTIVE_SCALE);
          opacity.set(ACTIVE_OPACITY);
          translateY.set(ACTIVE_TRANSLATE_DISTANCE);
        }
      } else if (prevIndex === itemIndex) {
        // This item is becoming inactive (was previously active)
        if (isAscending) {
          // Ascending swipe: previous item disappears downward
          onExit(true);
        } else if (isDescending) {
          // Descending swipe: previous item disappears upward
          onExit(false);
        }
      } else {
        // This item is neither active nor previously active - keep hidden
        initEnter(true);
      }
    },
  );

  // Combine all animation values into unified container style
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.get(), // Fade in/out animation
      transform: [
        {
          translateY: translateY.get(), // Vertical slide animation
        },
        {
          scale: scale.get(), // Size scaling for depth effect
        },
      ],
    };
  });

  return (
    <Animated.View className="absolute p-4" style={rContainerStyle}>
      {/* Main feature card with rounded corners and shadow */}
      <View className="px-3 py-2 rounded-[14px]" style={[styles.container, { backgroundColor: Colors.card }]}>
        <Text className="text-base" style={{ color: Colors.foreground }}>
          {label}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderCurve: "continuous", // iOS 16+ continuous curves for premium feel
    shadowColor: "#000000", // Dark shadow for subtle depth
    shadowOffset: {
      width: 0,
      height: 4, // Vertical shadow for card elevation
    },
    shadowOpacity: 0.3, // Subtle shadow opacity for dark theme
    shadowRadius: 10, // Soft shadow blur for natural appearance
  },
});

// scream-o-clock-onboarding-carousel-animation 🔼
