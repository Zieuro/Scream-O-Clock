import { Button, useToast } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/state/store";
import { openNotificationSettings } from "@/services/notifications";
import { Colors } from "@/constants/colors";

export default function ArmButton() {
  const armed = useAppStore((s) => s.armed);
  const arm = useAppStore((s) => s.arm);
  const disarm = useAppStore((s) => s.disarm);
  const { toast } = useToast();

  const handlePress = async () => {
    if (armed) {
      disarm();
      toast.show({
        variant: "success",
        label: "Disarmed",
        description: "Scheduled reminders cancelled",
      });
      return;
    }

    try {
      const result = await arm();
      if (result.ok) {
        if (result.scheduled > 0) {
          toast.show({
            variant: "success",
            label: "Armed",
            description: `${result.scheduled} rotation reminder${result.scheduled === 1 ? "" : "s"} scheduled`,
          });
        } else {
          toast.show({
            variant: "warning",
            label: "Armed",
            description: "No upcoming slots to schedule reminders for",
          });
        }
      } else if (result.reason === "no-slots") {
        toast.show({
          variant: "danger",
          label: "Couldn't arm",
          description: "No show is scheduled today",
        });
      } else {
        toast.show({
          variant: "danger",
          label: "Couldn't arm",
          description: "Notification permission was denied",
          actionLabel: "Settings",
          onActionPress: ({ hide }) => {
            openNotificationSettings();
            hide();
          },
        });
      }
    } catch {
      toast.show({
        variant: "danger",
        label: "Couldn't arm",
        description: "Something went wrong while scheduling notifications",
      });
    }
  };

  return (
    <Button
      className={
        armed
          ? "rounded-full bg-primary shadow-lg shadow-neutral-950 outline-1 outline-primary"
          : "rounded-full bg-card shadow-lg shadow-neutral-950 outline-1 outline-zinc-800"
      }
      variant={armed ? "danger" : "tertiary"}
      feedbackVariant="scale-ripple"
      accessibilityLabel={armed ? "Disarm" : "Arm"}
      onPress={handlePress}
    >
      <Ionicons
        name={armed ? "notifications" : "notifications-outline"}
        size={20}
        color={Colors.foreground}
      />
    </Button>
  );
}