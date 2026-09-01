import { View, Text } from "react-native";
import RoleButtons from "@/components/roleButtons";
import { Switch } from "heroui-native";
import LabelFormatSwitch from "@/components/formatSwitch";

export default function Schedule() {
  return (
    <View className="flex-1 flex-col pt-5 items-center bg-background gap-5">
      <Text className="font-mpu-medium text-3xl text-foreground">
        Select Your Role
      </Text>
      <RoleButtons />

      <View className="mt-5 items-center gap-5 w-full">
        <Text className="font-mpu-medium text-3xl text-foreground">
          Role Labels
        </Text>
        <LabelFormatSwitch />
      </View>
    </View>
  );
}
