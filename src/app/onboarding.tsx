import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FC, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
  LayoutChangeEvent,
} from "react-native";
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
import { useSplashReveal } from "@/hooks/useSplashReveal";
// scream-o-clock-onboarding-carousel-animation 🔽

// Enables animating pointerEvents for the last-page CTA reveal
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Layout constants for precise positioning calculations
const HEADER_HEIGHT = 50; // Fixed header height for content padding calculations
const GRADIENT_HEIGHT = 50; // Fade gradient height to blend bottom content seamlessly

// TEMPLATE PAGES: one entry per page — swap the image and description below to
// customize. Keep exactly one item per page. Images are static requires; drop
// your artwork into assets/images/onboarding/ and update the paths.
const SLIDES = [
  {
    // Placeholder art — replace with final onboarding images
    image: require("@/assets/images/onboarding/onboarding1_1.png"),
    description: "Set all alarms for the night with one press",
  },
  {
    image: require("@/assets/images/onboarding/onboarding2_1.png"),
    description:
      "See where you are and where you're going next with a countdown timer",
  },
  {
    image: require("@/assets/images/onboarding/onboarding3_1.png"),
    description: "See the schedule for the whole night and where you are now",
  },
  {
    image: require("@/assets/images/onboarding/onboarding4_1.png"),
    description:
      "Choose the rotation that works with your venue and make the app yours",
  },
  {
    image: require("@/assets/images/onboarding/onboarding_reset_test.png"),
    description:
      "Fix schedule bugs with one click.\nThere is an emergency restart button just in case the app fails to function properly ",
  },
  {
    image: require("@/assets/images/onboarding/noai.png"),
    description:
      "We believe that creativity is what makes us human. That is why this app was not made using generative AI",
  },
  {
    image: require("@/assets/images/onboarding/onboarding5_1.png"),
    description:
      "Spend more time scaring and less time digging through alarms and spreadsheets",
  },
];

const LAST_SLIDE_INDEX = SLIDES.length - 1;

// Headline shown for each carousel index — HEADLINES[i] displays on slide i
const HEADLINES = [
  "Welcome to\nScream O'Clock",
  "Stay on time...",
  "Rotations made easy...",
  "Options for Everyone!",
  "Just in case...",
  "Made by Humans",
  "Ready to\nFEED THE FEAR?",
];

export const Onboarding: FC = () => {
  useSplashReveal();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // Responsive scale: every size on this screen derives from the real window
  // size against a 390x844 phone baseline, clamped so small phones and
  // tablets stay in a tasteful range
  const scale = Math.min(
    Math.max(Math.min(width / 390, height / 844), 0.85),
    1.3,
  );
  const S = (size: number) => Math.round(size * scale); // Scales a baseline value
  // Typography never shrinks below its baseline (small phones keep readable
  // text) and only grows on larger screens
  const textScale = Math.min(Math.max(scale, 1), 1.3);
  const headerHeight = S(HEADER_HEIGHT);
  const headlineFontSize = Math.round(30 * textScale);
  const headlineLineHeight = Math.round(headlineFontSize * 1.25);
  // Tallest headline wraps to two lines; fixed stack height keeps the panel stable
  const headlineStackHeight = headlineLineHeight * 2;

  // The headline and description stacks hold absolutely-positioned children,
  // so their height is tracked from onLayout measurements of the content —
  // this keeps the panel spacing natural on every screen size
  const headlineHeights = useRef<Record<number, number>>({});
  const [headlineHeight, setHeadlineHeight] = useState(headlineStackHeight);
  const handleHeadlineLayout =
    (index: number) => (event: LayoutChangeEvent) => {
      const measured = Math.ceil(event.nativeEvent.layout.height);
      if (headlineHeights.current[index] !== measured) {
        headlineHeights.current[index] = measured;
        setHeadlineHeight(Math.max(...Object.values(headlineHeights.current)));
      }
    };

  const descriptionHeights = useRef<Record<number, number>>({});
  const [descriptionHeight, setDescriptionHeight] = useState(S(56));
  const handleDescriptionLayout =
    (index: number) => (event: LayoutChangeEvent) => {
      const measured = Math.ceil(event.nativeEvent.layout.height);
      if (descriptionHeights.current[index] !== measured) {
        descriptionHeights.current[index] = measured;
        setDescriptionHeight(
          Math.max(...Object.values(descriptionHeights.current)),
        );
      }
    };

  // Scroll tracking shared values for coordinated animations across components
  const prevOffsetX = useSharedValue(0); // Previous scroll position for direction detection
  const scrollDirection = useSharedValue<"to-left" | "to-right" | "idle">(
    "idle",
  ); // Current scroll direction for animation coordination

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
        (scrollDirection.get() === "idle" ||
          scrollDirection.get() === "to-left")
      ) {
        scrollDirection.set("to-right"); // Scrolling right (next item)
      }

      if (
        positivePrevOffsetX - positiveOffsetX > 0 &&
        (scrollDirection.get() === "idle" ||
          scrollDirection.get() === "to-right")
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

  // The pagination dots fade out across that same transition, replaced by the CTA
  const rDotsStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        activeIndex.get(),
        [LAST_SLIDE_INDEX - 1, LAST_SLIDE_INDEX],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  const startScaring = () => {
    useSettingsStore.getState().setHasOnboarded(true);
    router.replace("/(tabs)");
  };

  return (
    <View
      className="flex-1 items-center"
      style={{ backgroundColor: Colors.background }}
    >
      {/* Content column: full-bleed on phones, centered + capped on iPad */}
      <View className="flex-1 w-full self-center max-w-160">
      {/* Header with brand mark */}
      <View
        className="absolute left-0 right-0 items-center justify-center"
        style={{ height: headerHeight, top: insets.top + S(8) }}
      ></View>
      {/* Carousel: width-locked slides, one per page */}
      <Animated.FlatList
        data={SLIDES}
        renderItem={({ item }) => (
          <View
            className="flex-1 items-center justify-center"
            style={{ width }}
          >
            {/* Slide placeholder card — swap for real page content */}
            <View
              className="w-3/4 h-full overflow-hidden items-center border-card border-2"
              style={[
                styles.borderCurve,
                { backgroundColor: Colors.card, borderRadius: S(40) },
              ]}
            >
              <Image
                source={item.image}
                contentFit="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        )}
        contentContainerStyle={{
          paddingTop: insets.top + headerHeight + S(28),
        }}
        horizontal
        pagingEnabled // Enables snap-to-page behavior for carousel
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // ~60fps scroll updates for smooth animations
      />
      {/* Bottom panel: staggered headline + feature items + dots + CTA.
          minHeight scales the panel with screen height; the flex-1 spacer
          pushes the description, dots, and CTA down on larger phones and
          collapses to zero on smaller ones. */}
      <View
        className="absolute bottom-0 left-0 right-0"
        style={{
          minHeight: "30%",
          paddingHorizontal: S(32),
          paddingTop: S(24),
          paddingBottom: insets.bottom + S(8),
          backgroundColor: Colors.background,
        }}
      >
        {/* Fade gradient creates seamless blend from transparent to background color */}
        <LinearGradient
          colors={["rgba(18,18,18,0)", Colors.background]} // 0% to 100% opacity fade
          style={styles.gradient}
        />
        {/* Overlapping text animations - only one visible per carousel state.
            The stack tracks the tallest headline so single- and multi-line
            texts both fit without fixed spacing. */}
        <View
          className="w-full items-center justify-center"
          style={{ height: headlineHeight }}
        >
          {HEADLINES.map((headline, index) => (
            <View
              key={index}
              className="absolute left-0 right-0"
              onLayout={handleHeadlineLayout(index)}
            >
              <StaggeredText
                text={headline}
                fontSize={headlineFontSize}
                activeIndex={activeIndex}
                showIndex={[index]}
              />
            </View>
          ))}
        </View>
        <View
          className="w-full items-center justify-center"
          style={{ height: descriptionHeight, marginTop: S(16) }}
        >
          {SLIDES.map((item, index) => (
            <FeatureItem
              key={index}
              label={item.description}
              scale={textScale}
              itemIndex={index}
              onLayout={handleDescriptionLayout(index)}
              activeIndex={activeIndex} // Drives enter/exit animations
              prevIndex={prevIndex} // Determines transition direction
            />
          ))}
        </View>
        {/* Spare panel height collects here, pinning the dots and CTA to the
            bottom while headline and description keep natural spacing */}
        <View className="flex-1" />
        {/* On the last page the CTA crossfades over the pagination dots —
            both share this slot so the panel layout never jumps. */}
        <View style={{ height: S(56), justifyContent: "center" }}>
          <AnimatedPressable
            className="items-center justify-center"
            style={[
              styles.borderCurve,
              rButtonStyle,
              {
                backgroundColor: Colors.primary,
                height: S(56),
                paddingHorizontal: S(12),
                borderRadius: S(19),
              },
            ]}
            onPress={startScaring}
          >
            <Text
              className="font-medium"
              style={{ color: Colors.foreground, fontSize: S(18) }}
            >
              Start Scaring
            </Text>
          </AnimatedPressable>
          <Animated.View
            className="absolute left-0 right-0 top-0 bottom-0 items-center justify-center"
            pointerEvents="none"
            style={rDotsStyle}
          >
            <Dots
              numberOfDots={SLIDES.length}
              activeIndex={activeIndex}
              size={S(8)}
              gap={S(4)}
            />
          </Animated.View>
        </View>
      </View>
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
