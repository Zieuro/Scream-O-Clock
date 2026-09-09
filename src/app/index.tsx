import { useEffect } from "react";
import { router } from "expo-router";
import { useHydrated } from "@/hooks/useHydrated";
import { useSettingsStore } from "@/state/settingsStore";

// Redirects as soon as the persisted store has rehydrated. The splash screen
// stays up (gated in _layout) until after this decision is made, so this
// component never paints a blank frame to the user.
export default function Index() {
  const hydrated = useHydrated();
  const hasOnboarded = useSettingsStore((s) => s.hasOnboarded)

  useEffect(() => {
    if (!hydrated) return;
    router.replace(hasOnboarded ? "/(tabs)" : "/onboarding");
  }, [hydrated, hasOnboarded]);

  return null;
}
