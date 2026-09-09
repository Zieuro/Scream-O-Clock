import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// Called from the first real destination screens (tabs, onboarding): holds
// the native splash until they have mounted and painted, so the redirect
// through the blank index route is never visible. The root layout never
// hides the splash itself — frame-count delays lose the race against
// navigation transitions, especially on slow Android emulators.
export function useSplashReveal() {
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => SplashScreen.hideAsync());
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);
}
