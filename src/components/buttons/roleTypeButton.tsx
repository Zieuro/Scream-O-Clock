import { Button, Popover } from "heroui-native";
import { useSettingsStore } from "@/state/settingsStore";
import { View, Text } from "react-native";

export default function RoleTypeButton() {

  return (
    <Popover>
      <Popover.Trigger>
        <Button size="lg" variant="tertiary" className=" bg-card outline-1 outline-neutral-800 shadow-lg shadow-neutral-950 w-full">
          <Text className="font-mpu-semibold text-3xl text-foreground">Role Type</Text>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content presentation="bottom-sheet">
          <Popover.Title></Popover.Title>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}