import { useState } from "react";
import { View, Text } from "react-native";
import { Alert, Button, Dialog, useToast } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/state/store";
import {
  openAlarmPermissionSettings,
  openNotificationSettings,
} from "@/services/notifications";
import { Colors } from "@/constants/colors";

export default function ArmButton() {
  const armed = useAppStore((s) => s.armed);
  const arm = useAppStore((s) => s.arm);
  const disarm = useAppStore((s) => s.disarm);
  const { toast } = useToast();
  const [alarmsBlocked, setAlarmsBlocked] = useState(false);

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
      } else if (result.reason === "alarms-disabled") {
        setAlarmsBlocked(true);
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
    <>
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

      <Dialog isOpen={alarmsBlocked} onOpenChange={setAlarmsBlocked}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Alert status="warning">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Alarm permission needed</Alert.Title>
                <Alert.Description>
                  Android requires the &quot;Alarms &amp; reminders&quot;
                  permission so rotation reminders ring at exactly the right
                  time. Enable it for Scream O&apos; Clock, then arm again.
                </Alert.Description>
              </Alert.Content>
            </Alert>
            <View className="flex-row justify-center gap-3 mt-3">
              <Button
                variant="secondary"
                onPress={() => setAlarmsBlocked(false)}
              >
                <Text className="text-foreground">Later</Text>
              </Button>
              <Button
                variant="danger"
                onPress={() => {
                  openAlarmPermissionSettings();
                  setAlarmsBlocked(false);
                }}
              >
                <Text className="text-white">Open Settings</Text>
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}