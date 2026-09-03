import { View, Text } from "react-native";
import RoleButtons from "@/components/roleButtonGroup";
import LabelFormatSwitch from "@/components/buttons/formatSwitch";
import RoleTypeButton from "@/components/buttons/roleTypeButton";
import PositionSwitch from "@/components/buttons/positionSwitch";
import { Separator } from "heroui-native";
import DonateButton from "@/components/buttons/donateButton";
import FeedbackButton from "@/components/buttons/feedbackButton";
import RebuildButton from "@/components/buttons/rebuildButton";

export default function Schedule() {
  return (
    <View className="flex-1 flex-col pt-5 items-center bg-background gap-6">
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

      <View className="w-11/12 max-w-105 my-6 gap-5">
        <RoleTypeButton />
        <PositionSwitch />
      </View>

      <View className="gap-5 flex-col my-3">
        <View className="gap-5 flex-row">
          <DonateButton />
          <FeedbackButton />
        </View>
        <RebuildButton />
      </View>
    </View>
  );
}
