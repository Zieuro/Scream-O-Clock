import { View, Text } from "react-native";
import ArmButton from "@/components/armButton";
import SettingsButton from "@/components/settingsButton";
import NoShow from "@/components/phases/noShow";
import PostShow from "@/components/phases/postShow";
import PreShow from "@/components/phases/preShow";
import Show from "@/components/phases/show";

export default function Index() {
  return (
    <View className="flex-1 p-safe-offset-6 bg-background gap-10">
      <View className="flex-row justify-between">
        <ArmButton />
        <SettingsButton />
      </View>

      <View className="flex-auto">
        <Show />
      </View>
    </View>
  );
}
