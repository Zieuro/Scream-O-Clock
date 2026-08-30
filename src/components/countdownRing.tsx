import Svg, { Circle } from "react-native-svg";
import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface RingProps {
  progress: number
  children?: ReactNode;
  size?: number;
  strokeWidth?: number;
  strokeBackground?: string;
  stroke?: string;
}

export default function CountdownRing({
  progress,
  children,
  size = 300,
  strokeWidth = 20,
  strokeBackground = "#1e1e1e",
  stroke = "#A72023",
}: RingProps) {

  const r = size / 2 - strokeWidth / 2 - 2;
  const c = 2 * Math.PI * r;
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2}}
      className="justify-center self-center shadow-xl shadow-neutral-950 bg-background"
    >
      <Svg width={size} height={size}>
        {/* track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={strokeBackground}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* progress — starts at 12 o'clock */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clampedProgress)}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View
        style={StyleSheet.absoluteFill}
        className="items-center justify-center"
      >
        {children}
      </View>
    </View>
  );
}
