import { View, Text } from "react-native";
import RoleButtons from "@/components/roleButtons";
import LabelFormatSwitch from "@/components/buttons/formatSwitch";
import RoleTypeButton from "@/components/buttons/roleTypeButton";
import PositionSwitch from "@/components/buttons/positionSwitch";
import { Separator } from "heroui-native";

export default function Schedule() {
  return (
    <View className="flex-1 flex-col pt-5 items-center bg-background gap-3">
      <Text className="font-mpu-medium text-3xl text-muted">
        Select Your Role
      </Text>

      <RoleButtons />

      <View className="my-3 items-center w-full">
        <LabelFormatSwitch />
      </View>

      <Separator
        className="mx-10  bg-muted self-stretch"
        thickness={1}
        orientation="horizontal"
      />

      <View className="w-11/12 max-w-105 gap-5 mt-5">
        <RoleTypeButton />
        <PositionSwitch />
      </View>
    </View>
  );
}