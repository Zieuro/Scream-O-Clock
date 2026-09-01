import { Switch } from "heroui-native";
import { View, Text } from "react-native";

export default function LabelFormatSwitch() {
  return (
    <View className="flex flex-row justify-evenly w-full">
      <Text className="text-3xl font-mpu-medium text-neutral-300">ABC</Text>

      <Switch className="mt-2">
        <Switch.Thumb />
      </Switch>

      <Text className="text-3xl font-mpu-medium text-neutral-300">123</Text>
    </View>
  );
}
