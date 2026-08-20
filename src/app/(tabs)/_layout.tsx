import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs
      backgroundColor={"#171717"}
      iconColor={"#a1a1aa"}
      tintColor={"#ef4444"}
      disableIndicator
      rippleColor={"#f87171"}

      labelStyle={{
          default: { fontSize: 18, fontWeight: '500' },
          selected: { fontSize: 18, fontWeight: '700' }
        }}
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
