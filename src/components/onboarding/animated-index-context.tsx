import { createContext, useContext } from "react";
import type { SharedValue } from "react-native-reanimated";

type AnimatedIndexContextType = {
  activeIndex: SharedValue<number>;
};

// Stable object reference — providing this through context causes no re-renders.
export const AnimatedIndexContext = createContext<AnimatedIndexContextType>(
  {} as AnimatedIndexContextType,
);

export const useAnimatedIndex = () => useContext(AnimatedIndexContext);
