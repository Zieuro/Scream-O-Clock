import { View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

// Caps content width on large screens (iPad/Android tablets) so phone-scale
// layouts stay centered instead of stretching edge to edge. Background color
// stays full-bleed on the outer view. On phones, width < max, so rendering
// is identical to an unconstrained layout.
export const MAX_CONTENT_WIDTH = 640;

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
