import { useWindowDimensions } from "react-native";

// Scales UI text and chrome against an 844dp-tall phone baseline. Height-only:
// the countdown screen is height-constrained, so width would skew the result.
// The floor is deliberately low (~0.72) so small phones genuinely shrink —
// unlike a fixed size, which leaves the flexible center starved for space.
export function useUiScale() {
  const { height } = useWindowDimensions();
  return Math.min(Math.max(height / 844, 0.72), 1.15);
}
