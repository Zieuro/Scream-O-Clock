import { Switch } from "heroui-native";
import { View, Text } from "react-native";
import { useSettingsStore } from "@/state/settingsStore";
import { Colors } from "@/constants/colors";

export default function LabelFormatSwitch() {
  const numFormat = useSettingsStore((s) => s.numFormat);
  const setNumFormat = useSettingsStore((s) => s.setNumFormat);

  return (
    <View className="flex flex-row justify-evenly w-full">
      <Text className="text-3xl font-mpu-medium text-foreground">ABC</Text>

      <Switch
        isSelected={numFormat}
        onSelectedChange={setNumFormat}
        className="mt-2"
        animation={{
          backgroundColor: { value: [Colors.card, Colors.primary] },
        }}
      >
        <Switch.Thumb
          animation={{
            left: {
              value: 4,
              springConfig: {
                damping: 30,
                stiffness: 300,
                mass: 1,
              },
            },
          }}
        />
      </Switch>

      <Text className="text-3xl font-mpu-medium text-foreground">123</Text>
    </View>
  );
}