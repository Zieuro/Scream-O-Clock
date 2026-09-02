import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Colors } from "@/constants/colors";

export default function TabsLayout() {
  return (
    <NativeTabs
      backgroundColor={Colors.background}
      indicatorColor={Colors.primary}
      tintColor={Colors.foreground}
      shadowColor={Colors.secondary}
      rippleColor={"transparent"}
    >
      <NativeTabs.Trigger
        name="index"
        disableAutomaticContentInsets
        contentStyle={{ backgroundColor: Colors.background }}
      >
        <NativeTabs.Trigger.Label>Rotation</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="schedule" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="schedule"
        disableAutomaticContentInsets
        contentStyle={{ backgroundColor: Colors.background }}
      >
        <NativeTabs.Trigger.Label>Schedule</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_clock" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}