import { Description, Switch } from "heroui-native";
import { useSettingsStore } from "@/state/settingsStore";
import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";

export default function LockScreenSwitch() {
  const showOnLockScreen = useSettingsStore((s) => s.showOnLockScreen);
  const setShowOnLockScreen = useSettingsStore((s) => s.setShowOnLockScreen);

  return (
    <View className="rounded-3xl flex-row items-center justify-between bg-card mx-2 px-4 py-1.5 outline-1 outline-neutral-800 shadow-lg shadow-neutral-950">
      <View className="min-w-0 max-w-65 flex-1 pb-1 pr-5 gap-1.5">
        <Text className="font-mpu-semibold text-2xl text-foreground">
          Lock Screen Overlay
        </Text>
        <Description className=" text-muted">
          {showOnLockScreen
            ? "Use app from lock screen while kept in the foreground"
            : "App remains in the background when you lock your device"}
        </Description>
      </View>
      <Switch
        isSelected={showOnLockScreen}
        onSelectedChange={setShowOnLockScreen}
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
