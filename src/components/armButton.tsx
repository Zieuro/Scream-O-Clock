import { Button, useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/state/store";

export default function ArmButton() {
  const armed = useAppStore((s) => s.armed);
  const arm = useAppStore((s) => s.arm);
  const disarm = useAppStore((s) => s.disarm);

  const [accentFg, dangerFg] = useThemeColor([
    "accent-foreground",
    "danger-foreground",
  ]);

  return (
    <Button
      variant={armed ? "danger" : "tertiary"}
      feedbackVariant="scale-ripple"
      accessibilityLabel={armed ? "Disarm" : "Arm"}
      onPress={armed ? disarm : arm}
    >
      <Ionicons
        name={armed ? "notifications" : "notifications-outline"}
        size={20}
        color={armed ? dangerFg : accentFg}
      />
    </Button>
  );
}
