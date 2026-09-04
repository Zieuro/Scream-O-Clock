import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-screens/experimental";
import { Colors } from "@/constants/colors";

export default function Schedule() {
  return (
    <SafeAreaView
      edges={{ bottom: true }}
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <View className="flex-1 p-20 bg-background justify-center items-center">
        <Text className="text-2xl text-center text-muted font-bold">Schedule Screen Under Construction</Text>
      </View>
    </SafeAreaView>
  );
}