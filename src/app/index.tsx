import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useSettingsStore } from "@/state/settingsStore";

// Waits for zustand persist to rehydrate from AsyncStorage before redirecting,
// so first launch reliably lands on onboarding instead of flashing the tabs.
export default function Index() {
  const hasOnboarded = useSettingsStore((s) => s.hasOnboarded);
  const [hydrated, setHydrated] = useState(
    useSettingsStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubscribe = useSettingsStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    // Covers hydration finishing between initial render and subscribing above.
    const check = setTimeout(() => {
      if (useSettingsStore.persist.hasHydrated()) setHydrated(true);
    }, 0);
    return () => {
      clearTimeout(check);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    router.replace(hasOnboarded ? "/(tabs)" : "/onboarding");
  }, [hydrated, hasOnboarded]);

  return null;
}
