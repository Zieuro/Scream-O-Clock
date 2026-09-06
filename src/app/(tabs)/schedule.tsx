import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import { Colors } from "@/constants/colors";
import { useAppStore } from "@/state/store";
import { fmt, getScheduleLabel } from "@/constants/format";

export default function Schedule() {
  const { slots, now } = useAppStore();

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
                  A
                </Text>
              </View>

              <View className="flex-1 items-center">
                <Text className="font-quicksand-bold text-xl text-foreground">
                  B
                </Text>
              </View>

              <View className="flex-1 items-center">
                <Text className="font-quicksand-bold text-xl text-foreground">
                  C
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
                className="flex-row items-center border-card border-b-2 px-5 py-3">
                <View className="w-[30%]">
                  <Text className="font-quicksand-semibold text-foreground text-lg">
                    {fmt(slot.start)}
                  </Text>
                  
                  <Text className="font-quicksand-semibold text-foreground text-lg">
                    - {fmt(slot.end)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
