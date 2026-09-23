import { View } from "react-native";

export default function Card({
  children,
  scale = 1,
}: {
  children?: React.ReactNode;
  scale?: number; // Multiplier derived from screen size; 1 matches the baseline
}) {
  return (
    <View
      className="rounded-3xl mx-5 shadow-lg shadow-neutral-950 outline-1 outline-neutral-800 bg-neutral-900"
      style={{
        marginVertical: Math.round(8 * scale),
        paddingVertical: Math.round(12 * scale),
        paddingHorizontal: Math.round(24 * scale),
      }}
    >
      {children}
    </View>
  );
}
