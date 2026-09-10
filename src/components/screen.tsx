import { Platform, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

export const isIpad = Platform.OS === "ios" && Platform.isPad;

// Caps content width on large screens (iPad/Android tablets) so phone-scale
// layouts stay centered instead of stretching edge to edge. Background color
// stays full-bleed on the outer view. On phones, width < max, so rendering
// is identical to an unconstrained layout.
export const MAX_CONTENT_WIDTH = 640;

// NativeTabs floats its capsule tab bar at the top of the screen on iPad,
// overlapping content, and its height can't be measured yet (expo-router
// limitation). Tab screens offset by this constant on iPad only.
export const IPAD_TAB_BAR_TOP_INSET = 60;

export default function Screen({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}) {
  return (
    <View
      className="flex-1 items-center"
      style={[{ backgroundColor: Colors.background }, style]}
    >
      <View
        className={`flex-1 w-full self-center ${className}`}
        style={{ maxWidth: MAX_CONTENT_WIDTH }}
      >
        {children}
      </View>
    </View>
  );
}
