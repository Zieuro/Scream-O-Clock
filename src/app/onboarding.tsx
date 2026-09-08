import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Dots } from "@/components/onboarding/dots";
import { FeatureItem } from "@/components/onboarding/feature-item";
import { StaggeredText } from "@/components/onboarding/stagged-text";
import { Colors } from "@/constants/colors";
import { useSettingsStore } from "@/state/settingsStore";

// scream-o-clock-onboarding-carousel-animation 🔽

// Enables animating pointerEvents for the last-page CTA reveal
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Layout constants for precise positioning calculations
const HEADER_HEIGHT = 50; // Fixed header height for content padding calculations
const GRADIENT_HEIGHT = 50; // Fade gradient height to blend bottom content seamlessly

// TEMPLATE PAGES: one entry per page — swap the emoji, description, and
// headline below to customize. Keep exactly one item per page.
const SLIDES = [
  { emoji: "👻", description: "Template page 1 — introduce the app here ✍️" },
  { emoji: "⏰", description: "Template page 2 — describe the next feature 🧠" },
  { emoji: "🎃", description: "Template page 3 — describe the next feature 🥗" },
  { emoji: "😱", description: "Template page 4 — describe the next feature 🕯️" },
  { emoji: "🧛", description: "Template page 5 — the final pitch 💀" },
];

const LAST_SLIDE_INDEX = SLIDES.length - 1;

export const Onboarding: FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Scroll tracking shared values for coordinated animations across components
  const prevOffsetX = useSharedValue(0); // Previous scroll position for direction detection
  const scrollDirection = useSharedValue<"to-left" | "to-right" | "idle">("idle"); // Current scroll direction for animation coordination

  // Index tracking for carousel state management
  const activeIndex = useSharedValue(0); // Current active carousel item (drives dots, text, feature animations)
  const prevIndex = useSharedValue(0); // Previous active item for transition direction detection

  // Worklet-optimized scroll handler for 60fps carousel animations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const offsetX = event.contentOffset.x;
      // Clamp to positive values to handle iOS bounce effects
      const positiveOffsetX = Math.max(offsetX, 0);
      const positivePrevOffsetX = Math.max(prevOffsetX.get(), 0);

      // Calculate active index with 0.5 threshold for smooth page transitions
      // That means that when we scroll to the middle of the screen, we switch to the next page
      activeIndex.set(Math.floor(offsetX / width + 0.5));

      // Direction detection logic for feature item transition animations
      if (
        positivePrevOffsetX - positiveOffsetX < 0 &&
        (scrollDirection.get() === "idle" || scrollDirection.get() === "to-left")
      ) {
        scrollDirection.set("to-right"); // Scrolling right (next item)
      }

      if (
        positivePrevOffsetX - positiveOffsetX > 0 &&
        (scrollDirection.get() === "idle" || scrollDirection.get() === "to-right")
      ) {
        scrollDirection.set("to-left"); // Scrolling left (previous item)
      }

      prevOffsetX.set(offsetX);
    },
  });

  // Capture previous index when scroll direction changes for transition animations
  useAnimatedReaction(
    () => scrollDirection.get(),
    () => {
      prevIndex.set(activeIndex.get()); // Store current as previous for feature item exit animations
    },
  );

  // CTA fades in across the final transition; pointerEvents gates taps when hidden
  const rButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        activeIndex.get(),
        [LAST_SLIDE_INDEX - 1, LAST_SLIDE_INDEX],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      pointerEvents: activeIndex.get() === LAST_SLIDE_INDEX ? "auto" : "none",
    };
  });

  const startScaring = () => {
    useSettingsStore.getState().setHasOnboarded(true);
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors.background }}>
      {/* Header with brand mark */}
      <View
        className="absolute left-0 right-0 items-center justify-center"
        style={{ height: HEADER_HEIGHT, top: insets.top + 8 }}
      >
        <View
          className="w-12 h-12 rounded-[17px] items-center justify-center"
          style={[styles.borderCurve, { backgroundColor: Colors.card }]}
        >
          <Text className="text-xl">🎃</Text>
        </View>
      </View>
      {/* Carousel: width-locked slides, one per page */}
      <Animated.FlatList
        data={SLIDES}
        renderItem={({ item }) => (
          <View className="flex-1 items-center justify-center" style={{ width }}>
            {/* Slide placeholder card — swap for real page content */}
            <View
              className="w-3/4 h-full rounded-[40px] items-center justify-center"
              style={[styles.borderCurve, { backgroundColor: Colors.card }]}
            >
              <Text className="text-8xl">{item.emoji}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT + 28 }}
        horizontal
        pagingEnabled // Enables snap-to-page behavior for carousel
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // ~60fps scroll updates for smooth animations
      />
      {/* Bottom panel: staggered headline + feature items + dots + CTA */}
      <View
        className="absolute bottom-0 left-0 right-0 px-8 pt-6"
        style={{ paddingBottom: insets.bottom + 8, backgroundColor: Colors.background }}
      >
        {/* Fade gradient creates seamless blend from transparent to background color */}
        <LinearGradient
          colors={["rgba(18,18,18,0)", Colors.background]} // 0% to 100% opacity fade
          style={styles.gradient}
        />
        <View className="items-center mb-10">
          {/* Overlapping text animations - only one visible per carousel state */}
          <View className="mb-5 items-center justify-center h-8">
            <View className="absolute">
              <StaggeredText text="Welcome to..." activeIndex={activeIndex} showIndex={[0, 1]} />
            </View>
            <View className="absolute">
              <StaggeredText text="Scream-O-Clock" activeIndex={activeIndex} showIndex={[2, 3]} />
            </View>
            <View className="absolute">
              <StaggeredText text="Ready to scream?" activeIndex={activeIndex} showIndex={[4]} />
            </View>
          </View>
          <View className="h-14 w-full mb-8 items-center justify-center">
            {SLIDES.map((item, index) => (
              <FeatureItem
                key={index}
                label={item.description}
                itemIndex={index}
                activeIndex={activeIndex} // Drives enter/exit animations
                prevIndex={prevIndex} // Determines transition direction
              />
            ))}
          </View>
          {/* Pagination dots with smooth color transitions */}
          <Dots numberOfDots={SLIDES.length} activeIndex={activeIndex} />
        </View>
        <AnimatedPressable
          className="h-[56px] px-3 rounded-[19px] items-center justify-center"
          style={[styles.borderCurve, rButtonStyle, { backgroundColor: Colors.primary }]}
          onPress={startScaring}
        >
          <Text className="text-lg font-medium" style={{ color: Colors.foreground }}>
            Start Scaring
          </Text>
        </AnimatedPressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: "continuous",
  },
  gradient: {
    position: "absolute",
    top: -GRADIENT_HEIGHT,
    left: 0,
    right: 0,
    height: GRADIENT_HEIGHT,
  },
});

export default Onboarding;

// scream-o-clock-onboarding-carousel-animation 🔼
