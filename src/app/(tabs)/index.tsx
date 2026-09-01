import { View, Text } from "react-native";
import ArmButton from "@/components/buttons/armButton";
import SettingsButton from "@/components/buttons/settingsButton";
import Show from "@/components/phases/show";

export default function Index() {
  return (
    <View className="flex-1 p-safe-offset-6 bg-background gap-10">
      <View className="flex-row justify-between">
        <ArmButton />
        <SettingsButton />
      </View>
      <Show />
    </View>
  );
}
