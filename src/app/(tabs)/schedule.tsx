import { useEffect, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import Screen from "@/components/screen";
import { Colors } from "@/constants/colors";
import { useAppStore } from "@/state/store";
import { fmt, POS_STYLE, getScheduleLabel } from "@/constants/format";
import { useSettingsStore } from "@/state/settingsStore";
import { getCurrentSlot } from "@/domain/slots";
import { Role } from "@/domain/types";

export default function Schedule() {
  const slots = useAppStore((s) => s.slots);
  const now = useAppStore((s) => s.now);
  const numFormat = useSettingsStore((s) => s.numFormat);
  const positionView = useSettingsStore((s) => s.positionView);
  const roleType = useSettingsStore((s) => s.roleType);
  const role = useSettingsStore((s) => s.role)
  const currentID = getCurrentSlot(slots, now)?.id;

  // Auto-focus the current slot: rows report their Y through onLayout, and
  // this effect retries each render (the clock ticks every second) until the
  // current slot's row has measured, then scrolls once.
  const scrollViewRef = useRef<ScrollView>(null);
  const itemLayouts = useRef<Record<string, number>>({});
  const didAutoScroll = useRef(false);

  // A freshly built show has new slot ids — re-enable the auto-focus so it
  // scrolls to the new current slot after the rows measure.
  useEffect(() => {
    didAutoScroll.current = false;
  }, [slots]);

  useEffect(() => {
    if (didAutoScroll.current || !currentID || slots.length === 0) return;
    const y = itemLayouts.current[currentID];
    if (y === undefined) return;
    scrollViewRef.current?.scrollTo({ y: Math.max(y - 8, 0), animated: false });
    didAutoScroll.current = true;
  });

  const columns: Role[] =
    roleType === "specialty" ? ["a", "b"] : ["a", "b", "c"];
  return (
    <SafeAreaView
      edges={{ bottom: true }}
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: 4,
      }}
    >
      {/* Page View */}
      <Screen className="p-safe mx-2 flex-1">
        {/* Schedule View */}
        <View className="flex-1 border-3 border-card rounded-2xl mx-4 overflow-y-hidden">
          {/* Header View */}
          <View className="flex-row gap-4 bg-card rounded-t-xl p-2 items-center">
            <View className="w-[30%] items-center">
              <Text className="font-mpu-bold text-xl text-foreground">
                Time
              </Text>
            </View>

            {/*ABC View */}
            <View className="flex-1 flex-row">
              <View className="flex-1 items-center">
                <Text className={`font-mpu-bold text-xl text-foreground ${role === "a" && "text-primary font-mpu-extrabold"}`}>
                  {numFormat ? "1" : "A"}
                </Text>
              </View>

              <View className="flex-1 items-center">
                <Text className={`font-mpu-bold text-xl text-foreground ${role === "b" && "text-primary font-mpu-extrabold"}`}>
                  {numFormat ? "2" : "B"}
                </Text>
              </View>

              {roleType === "standard" && (
                <View className="flex-1 items-center">
                  <Text className={`font-mpu-bold text-xl text-foreground ${role === "c" && "text-primary font-mpu-extrabold"}`}>
                    {numFormat ? "3" : "C"}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Schedule Body */}
          <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
            {slots.map((slot) => (
              /* Row View */
              <View
                key={slot.id}
                onLayout={(e) => {
                  itemLayouts.current[slot.id] = e.nativeEvent.layout.y;
                }}
                className={`flex-row items-center border-card border-b-2 pl-5 py-3 ${slot.id === currentID ? "bg-primary/20" : ""}`}
              >
                {/* Time View */}
                <View className="w-[30%] border-r-2 border-card">
                  <Text className="font-quicksand-semibold text-foreground text-lg">
                    {fmt(slot.start)}
                  </Text>

                  <Text className="font-quicksand-semibold text-foreground text-lg">
                    - {fmt(slot.end)}
                  </Text>
                </View>

                {/* ABC Schedule View */}
                <View className="flex-1 flex-row">
                  {columns.map((role) => {
                    const p = slot.row?.[role]; // Temporary pos
                    const pos = p && getScheduleLabel(p, positionView);
                    return (
                      <View key={role} className="flex-1 items-center ">
                        <Text
                          className={
                            pos
                              ? POS_STYLE[pos]?.className
                              : "font-quicksand-semibold text-foreground text-lg"
                          }
                        >
                          {pos ? POS_STYLE[pos]?.label : "-"}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </Screen>
    </SafeAreaView>
  );
}
