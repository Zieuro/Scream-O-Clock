import { Redirect } from "expo-router";
import { useHydrated } from "@/hooks/useHydrated";
import { useSettingsStore } from "@/state/settingsStore";

// Redirects as soon as the persisted store has rehydrated. Declarative on
// purpose: the destination enters the tree in the same commit, and the root
// layout keeps the splash up until after that commit paints, so this screen
// never becomes visible.
export default function Index() {
  const hydrated = useHydrated();
  const hasOnboarded = useSettingsStore((s) => s.hasOnboarded);

  if (!hydrated) return null;
  return <Redirect href={hasOnboarded ? "/(tabs)" : "/onboarding"} />;
}
