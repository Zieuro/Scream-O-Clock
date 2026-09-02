import { View } from "react-native";

export default function Center({ children }: { children: React.ReactNode }) {
  return (
    <View className="w-full flex-1 items-center justify-center gap-2">
      {children}
    </View>
  );
}