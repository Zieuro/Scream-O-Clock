import { Description, Label, Switch } from "heroui-native";
import { useSettingsStore } from "@/state/settingsStore";
import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";

export default function PositionSwitch() {
  const { positionView, setPositionView } = useSettingsStore();

  return (
    <View className="rounded-3xl flex-row items-center justify-between bg-card mx-2 px-4 py-3 outline-1 outline-neutral-800 shadow-lg shadow-neutral-950">
      <View className="min-w-0 max-w-65 flex-1 py-2 pr-3 gap-1.5">
        <Text className="font-mpu-semibold text-2xl text-foreground">Position View</Text>
        <Text className="font-mpu-medium text-muted">{positionView ? "Toggles numbered positions Currently shows 'Position 1' 'Position 2'" : "Toggles numbered positions Currently only shows 'On Set'"}</Text>
      </View>
      <Switch
        isSelected={positionView}
        onSelectedChange={setPositionView}
        className="shrink-0"
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
    </View>
  );
}
