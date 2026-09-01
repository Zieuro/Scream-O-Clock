import { View, Text } from "react-native";
import RoleButtons from "@/components/roleButtons";
import LabelFormatSwitch from "@/components/buttons/formatSwitch";
import RoleTypeButton from "@/components/buttons/roleTypeButton";
import { Separator } from "heroui-native";

export default function Schedule() {
  return (
    <View className="flex-1 flex-col pt-5 items-center bg-background gap-5">
      <Text className="font-mpu-medium text-3xl text-muted">
        Select Your Role
      </Text>

      <RoleButtons />

      <View className="my-5 items-center gap-5 w-full">
        <LabelFormatSwitch />
      </View>

      <Separator
        className="mx-10  bg-muted self-stretch"
        thickness={1}
        orientation="horizontal"
      />

      <View className="gap-5 mt-5">
        <RoleTypeButton />
      </View>
    </View>
  );
}
