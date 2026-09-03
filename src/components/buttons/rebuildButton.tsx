import { Alert, Button, Dialog, useDialog } from "heroui-native";
import { Text, View } from "react-native";
import { useAppStore } from "@/state/store";

function ConfirmActions() {
  const { onOpenChange } = useDialog();
  const { loadShow } = useAppStore();
  const today = new Date();

  return (
    <View className="flex-row justify-center gap-3 mt-3">
      <Button variant="secondary" onPress={() => onOpenChange(false)}>
        <Text className="text-foreground">Cancel</Text>
      </Button>
      <Button
        variant="danger"
        onPress={() => {
          loadShow(today);
          onOpenChange(false);
        }}
      >
        <Text className="text-white">Restart</Text>
      </Button>
    </View>
  );
}

export default function RebuildButton() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button
          variant="danger-soft"
          className="rounded-full shadow-lg shadow-neutral-950 outline-1 outline-zinc-800"
        >
          <Text className="font-mpu-medium text-xl text-foreground">
            Restart App
          </Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Alert status="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Restart app?</Alert.Title>
              <Alert.Description>
                The rotation schedule will restart. Only use when the schedule is glitched.
              </Alert.Description>
            </Alert.Content>
          </Alert>
          <ConfirmActions />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
