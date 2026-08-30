import { Button, useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/state/store";
import { Colors } from "@/constants/colors";

export default function ArmButton() {
  const armed = useAppStore((s) => s.armed);
  const arm = useAppStore((s) => s.arm);
  const disarm = useAppStore((s) => s.disarm);

  return (
    <Button
      className={
        armed
          ? "bg-primary shadow-lg shadow-neutral-950 outline-1 outline-primary"
          : "bg-card shadow-lg shadow-neutral-950 outline-1 outline-zinc-800"
      }
      variant={armed ? "danger" : "tertiary"}
      feedbackVariant="scale-ripple"
      accessibilityLabel={armed ? "Disarm" : "Arm"}
      onPress={armed ? disarm : arm}
    >
      <Ionicons
        name={armed ? "notifications" : "notifications-outline"}
        size={20}
        color={Colors.foreground}
      />
    </Button>
  );
}
