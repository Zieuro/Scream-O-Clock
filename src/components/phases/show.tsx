import { getCurrentSlot } from "@/domain/slots";
import { useAppStore } from "@/state/store";
import { View, Text } from "react-native";

export default function Show() {
  const currentSlots = useAppStore((s) => s.slots)
  const now = useAppStore((s) => s.now)
  
  const slot = getCurrentSlot(currentSlots, now)
  const row = slot?.row
  return (
    <View className="rounded-3xl mx-5 p-5 shadow-xl outline-1 outline-secondary bg-card">
      <Text className="text-2xl text-foreground text-">Position</Text>
      <Text>{}</Text>
    </View>
  );
}
