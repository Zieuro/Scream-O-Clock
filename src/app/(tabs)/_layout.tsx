import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Colors } from "@/constants/colors";

export default function TabsLayout() {
  return (
    <NativeTabs
      backgroundColor={Colors.background}
      indicatorColor={Colors.primary}
      tintColor={Colors.foreground}
      shadowColor={Colors.secondary}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Rotation</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="schedule" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="schedule">
        <NativeTabs.Trigger.Label>Schedule</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_clock" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
