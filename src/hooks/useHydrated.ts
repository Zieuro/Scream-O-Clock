import { useEffect, useState } from "react";
import { useSettingsStore } from "@/state/settingsStore";

// Reactive gate on the persisted settings store finishing rehydration from
// AsyncStorage, so splash-screen and redirect logic can wait for real state
// instead of rendering against defaults.
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(
    useSettingsStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubscribe = useSettingsStore.persist.onFinishHydration(() =>
      setHydrated(true)
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

  return hydrated;
}
