import Svg, { Circle } from "react-native-svg";
import { getTimeRemaining } from "@/constants/clock";
import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface RingProps {
  children?: ReactNode;
  size?: number;
  strokeWidth?: number;
  strokeBackground?: string;
  stroke?: string;
}

export default function CountdownRing({
  children,
  size = 300,
  strokeWidth = 20,
  strokeBackground = "#1e1e1e",
  stroke = "#A72023",
}: RingProps) {

  const r = size / 2 - strokeWidth / 2 - 2;
  const c = 2 * Math.PI * r;

  const progress = getTimeRemaining()

  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center"
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
          strokeDashoffset={c * (1 - progress)}
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
