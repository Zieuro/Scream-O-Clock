import { View } from "react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import ArmButton from "@/components/buttons/armButton";
import SettingsButton from "@/components/buttons/settingsButton";
import Show from "@/components/phases/show";
import PreShow from "@/components/phases/preShow";
import PostShow from "@/components/phases/postShow";
import NoShow from "@/components/phases/noShow";
import { Colors } from "@/constants/colors";
import { getPhase } from "@/domain/slots";
import { useAppStore } from "@/state/store";

export default function Index() {
  const { now, show } = useAppStore();
  const showType = show ? getPhase(now, show) : null;

  function whichShow() {
    console.log(showType)
    switch (showType) {
      case "preShow":
        return <PreShow />;
      case "show":
        return <Show />;
      case "postShow":
        return <PostShow />;
      default:
        return <NoShow />;
    }
  }
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
        {whichShow()}
      </View>
    </SafeAreaView>
  );
}