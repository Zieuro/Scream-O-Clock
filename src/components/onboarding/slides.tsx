import { FC } from "react";
import { Text, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { BASE_SPRING_CONFIG, type SlideItemProps } from "./constants";
import { useAnimatedIndex } from "./animated-index-context";
import { Colors } from "@/constants/colors";

// ── TEMPLATE SLIDES ─────────────────────────────────────────────────────────
// Each of these is a placeholder "page" for you to customize. Swap the emoji,
// colors, copy, and decorations freely — the animation pattern is the part to
// keep: read `activeIndex` from context, keyframe against [index, index+1, ...],
// clamp, and wrap transform targets in withSpring.
// ─────────────────────────────────────────────────────────────────────────────

const Card: FC<SlideItemProps & { emoji: string; color: string }> = ({
  index,
  emoji,
  color,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const { activeIndex } = useAnimatedIndex();

  const rStyle = useAnimatedStyle(() => {
    // Travels 2 screen widths over 2 page transitions → flies off dramatically.
    const translateX = interpolate(
      activeIndex.get(),
      [index, index + 1, index + 2],
      [0, screenWidth, screenWidth * 2],
      Extrapolation.CLAMP,
    );
    const rotate = interpolate(
      activeIndex.get(),
      [index, index + 1, index + 2],
      [-2, -4, 3],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      activeIndex.get(),
      [index, index + 1, index + 2],
      [1, 0.98, 1.2],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: withSpring(translateX, BASE_SPRING_CONFIG) },
        { rotate: withSpring(`${rotate}deg`, BASE_SPRING_CONFIG) },
        { scale: withSpring(scale, BASE_SPRING_CONFIG) },
      ],
    };
  }, [screenWidth]);

  return (
    <Animated.View
      style={[
        rStyle,
        { backgroundColor: color, borderColor: Colors.border, borderCurve: "continuous" },
      ]}
      className="absolute w-[45%] aspect-[1/1.4] top-8 left-[28%] rounded-3xl border items-center justify-center"
    >
      <Text className="text-7xl">{emoji}</Text>
    </Animated.View>
  );
};

// A subtle companion piece that exits one slide early in the other direction.
const Companion: FC<SlideItemProps & { emoji: string }> = ({ index, emoji }) => {
  const { width: screenWidth } = useWindowDimensions();
  const { activeIndex } = useAnimatedIndex();

  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      activeIndex.get(),
      [index, index + 1],
      [0, -screenWidth * 0.75],
      Extrapolation.CLAMP,
    );
    const rotate = interpolate(
      activeIndex.get(),
      [index, index + 1],
      [3, -12],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: withSpring(translateX, BASE_SPRING_CONFIG) },
        { rotate: withSpring(`${rotate}deg`, BASE_SPRING_CONFIG) },
      ],
    };
  }, [screenWidth]);

  return (
    <Animated.View
      style={[
        rStyle,
        { backgroundColor: Colors.card, borderColor: Colors.border, borderCurve: "continuous" },
      ]}
      className="absolute w-[24%] aspect-[1/1] top-[30%] left-[12%] rounded-2xl border items-center justify-center"
    >
      <Text className="text-3xl">{emoji}</Text>
    </Animated.View>
  );
};

export const SlideOne: FC<SlideItemProps> = ({ index }) => (
  <>
    <Companion index={index} emoji="🌕" />
    <Card index={index} emoji="👻" color={Colors.card} />
  </>
);

export const SlideTwo: FC<SlideItemProps> = ({ index }) => (
  <>
    <Companion index={index} emoji="🕷️" />
    <Card index={index} emoji="⏰" color={Colors.dark} />
  </>
);

export const SlideThree: FC<SlideItemProps> = ({ index }) => (
  <>
    <Companion index={index} emoji="🕸️" />
    <Card index={index} emoji="🎃" color={Colors.card} />
  </>
);

export const SlideFour: FC<SlideItemProps> = ({ index }) => (
  <>
    <Companion index={index} emoji="🦇" />
    <Card index={index} emoji="😱" color={Colors.dark} />
  </>
);

export const SlideFive: FC<SlideItemProps> = ({ index }) => (
  <>
    <Companion index={index} emoji="💀" />
    <Card index={index} emoji="🧛" color={Colors.card} />
  </>
);
