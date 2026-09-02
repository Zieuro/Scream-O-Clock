import { View } from "react-native";

export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <View className="rounded-3xl mx-5 my-2 py-3 px-6 shadow-lg shadow-neutral-950 outline-1 outline-neutral-800 bg-neutral-900">
      {children}
    </View>
  );
}