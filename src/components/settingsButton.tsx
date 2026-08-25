import { Button, useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SettingsButton() {
  const [accentFg] = useThemeColor(["accent-foreground"]);

  return (
    <Button
      variant="tertiary"
      feedbackVariant="scale-highlight"
      accessibilityLabel="Settings"
      onPress={() => router.push("/settings")}
    >
      <Ionicons name="settings-outline" size={20} color={accentFg} />
    </Button>
  );
}
