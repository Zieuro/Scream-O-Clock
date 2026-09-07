import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { router } from "expo-router";
import { AnimatedIndexContext } from "@/components/onboarding/animated-index-context";
import { PaginationDots } from "@/components/onboarding/pagination-dots";
import { SlideContainer } from "@/components/onboarding/slide-container";
import {
  SlideOne,
  SlideTwo,
  SlideThree,
  SlideFour,
  SlideFive,
} from "@/components/onboarding/slides";
import { Colors } from "@/constants/colors";
import { useSettingsStore } from "@/state/settingsStore";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ── TEMPLATE PAGES ──────────────────────────────────────────────────────────
// Edit the titles, descriptions, and illustrations here to customize each page.
const SLIDES = [
  {
    title: "Welcome to\nScream-O-Clock",
    description:
      "Template page 1 — introduce the app here in one or two sentences.",
    Illustration: SlideOne,
  },
  {
    title: "Page Two",
    description: "Template page 2 — describe the next feature or idea.",
    Illustration: SlideTwo,
  },
  {
    title: "Page Three",
    description: "Template page 3 — describe the next feature or idea.",
    Illustration: SlideThree,
  },
  {
    title: "Page Four",
    description: "Template page 4 — describe the next feature or idea.",
    Illustration: SlideFour,
  },
  {
    title: "Ready to Scream?",
    description: "Template page 5 — the final pitch before the CTA appears.",
    Illustration: SlideFive,
  },
];

const TOTAL_SLIDES = SLIDES.length;

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const activeIndex = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    activeIndex.set(event.contentOffset.x / width);
  });

  // CTA fades in across the final transition and is only tappable when visible.
  const rButtonStyle = useAnimatedStyle(() => {
    const lastIndex = TOTAL_SLIDES - 1;
    return {
      opacity: interpolate(
        activeIndex.get(),
        [lastIndex - 1, lastIndex],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      pointerEvents: activeIndex.get() === lastIndex ? "auto" : "none",
    };
  });

  return (
    <AnimatedIndexContext value={{ activeIndex }}>
      <View
        className="flex-1"
        style={{ paddingBottom: insets.bottom + 8, backgroundColor: Colors.background }}
      >
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: insets.top + 40 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {SLIDES.map(({ title, description, Illustration }, index) => (
            <SlideContainer key={index} title={title} description={description}>
              <Illustration index={index} />
            </SlideContainer>
          ))}
        </Animated.ScrollView>

        <View className="gap-5 px-5 pt-5">
          <PaginationDots numberOfDots={TOTAL_SLIDES} />
          <AnimatedPressable
            className="h-[50px] rounded-full justify-center items-center"
            style={[rButtonStyle, { backgroundColor: Colors.primary, borderCurve: "continuous" }]}
            onPress={() => {
              useSettingsStore.getState().setHasOnboarded(true);
              router.replace("/(tabs)");
            }}
          >
            <Text
              className="text-lg font-medium"
              style={{ color: Colors.foreground }}
            >
              Start Scaring
            </Text>
          </AnimatedPressable>
        </View>
      </View>
    </AnimatedIndexContext>
  );
}
