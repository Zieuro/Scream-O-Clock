import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import { Colors } from "@/constants/colors";
import { useAppStore } from "@/state/store";
import { fmt, POS_STYLE, getScheduleLabel } from "@/constants/format";
import { useSettingsStore } from "@/state/settingsStore";

export default function Schedule() {
  const { slots, now } = useAppStore();
  const numFormat = useSettingsStore((s) => s.numFormat);
  const positionView = useSettingsStore((s) => s.positionView)
  
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
      <View className="p-safe-offset-4 flex-1">
        {/* Schedule View */}
        <View className="flex-1 border-3 border-card rounded-2xl overflow-y-hidden">
          {/* Header View */}
          <View className="flex-row gap-4 bg-card rounded-t-xl p-2 items-center">
            <View className="w-[30%] items-center">
              <Text className="font-quicksand-bold text-xl text-foreground">
                Time
              </Text>
            </View>

            {/*ABC View */}
            <View className="flex-1 flex-row">
              <View className="flex-1 items-center">
                <Text className="font-quicksand-bold text-xl text-foreground">
                  {numFormat ? "1" : "A"}
                </Text>
              </View>

              <View className="flex-1 items-center">
                <Text className="font-quicksand-bold text-xl text-foreground">
                  {numFormat ? "2" : "B"}
                </Text>
              </View>

              <View className="flex-1 items-center">
                <Text className="font-quicksand-bold text-xl text-foreground">
                  {numFormat ? "3" : "C"}
                </Text>
              </View>
            </View>
          </View>

          {/* Schedule Body */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {slots.map((slot) => (
              /* Row View */
              <View
                key={slot.id}
                className="flex-row items-center border-card border-b-2 pl-5 py-3"
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
                  {(["a", "b", "c"] as const).map((role) => {
                    const p = slot.row?.[role]; // Temporary pos
                    const pos = p && getScheduleLabel(p, positionView)
                    return (
                      <View key={role} className="flex-1 items-center ">
                        <Text className={pos ? POS_STYLE[pos].className : "font-quicksand-semibold text-foreground text-lg"}>
                          {pos ? POS_STYLE[pos].label : "-"}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
