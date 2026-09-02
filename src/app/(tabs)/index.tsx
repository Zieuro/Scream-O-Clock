import { View } from "react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import ArmButton from "@/components/buttons/armButton";
import SettingsButton from "@/components/buttons/settingsButton";
import Show from "@/components/phases/show";
import { Colors } from "@/constants/colors";

export default function Index() {
  return (
    <SafeAreaView
      edges={{ bottom: true }}
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <View className="flex-1 pt-safe-offset-6 px-6 pb-6 bg-background gap-8">
        <View className="flex-row justify-between">
          <ArmButton />
          <SettingsButton />
        </View>
        <Show />
      </View>
    </SafeAreaView>
  );
}