import { View, Text, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import RoleButtons from "@/components/roleButtonGroup";
import LabelFormatSwitch from "@/components/buttons/formatSwitch";
import RoleTypeButton from "@/components/buttons/roleTypeButton";
import PositionSwitch from "@/components/buttons/positionSwitch";
import LockScreenSwitch from "@/components/buttons/lockScreenSwitch";
import { Separator } from "heroui-native";
import FeedbackButton from "@/components/buttons/feedbackButton";
import RebuildButton from "@/components/buttons/rebuildButton";
import Screen from "@/components/screen";
import { Colors } from "@/constants/colors";

export default function Schedule() {
  return (
    <SafeAreaView
      edges={{ bottom: true }}
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <ScrollView>
        <Screen className="flex-col py-5 items-center gap-6">
          <Text className="font-mpu-semibold text-2xl text-muted">
            Select Your Role
          </Text>

          <RoleButtons />

          <View className="items-center w-full">
            <LabelFormatSwitch />
          </View>

          <Separator
            className="mx-10  bg-muted self-stretch"
            thickness={1}
            orientation="horizontal"
          />

          <View className="w-11/12 max-w-105 my-6 gap-7">
            <RoleTypeButton />
            <PositionSwitch />
            {Platform.OS === "android" && <LockScreenSwitch />}
          </View>

          <View
            className={`gap-5 my-3 ${Platform.OS === "android" ? "flex-row" : "flex-col"}`}
          >
            <FeedbackButton />
            <RebuildButton />
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
  );
}
