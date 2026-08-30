import { View } from "react-native";

export default function Center({ children }: { children: React.ReactNode }) {
  return (
    <View className="rounded-3xl mx-5 p-5 shadow-lg shadow-neutral-950 outline-1 outline-zinc-800 bg-card">
      {children}
    </View>
  );
}
