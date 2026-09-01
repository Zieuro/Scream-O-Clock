import { Button } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";

export default function SettingsButton() {

  return (
    <Button
      className="bg-card shadow-lg shadow-neutral-950 outline-1 outline-zinc-800"
      variant="tertiary"
      feedbackVariant="scale-highlight"
      accessibilityLabel="Settings"
      onPress={() => router.push("/settings")}
    >
      <Ionicons name="settings-outline" size={20} color={Colors.foreground} />
    </Button>
  );
}
