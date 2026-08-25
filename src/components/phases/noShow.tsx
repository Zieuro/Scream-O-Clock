import { Colors } from "@/constants/colors";
import { Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Center from "../center";

export default function NoShow() {
  return (
    <View className="flex-1 gap-6">
      <Text className="text-text text-4xl self-center-safe">
        No Shows Today!
      </Text>

      <Text className="text-xl text-muted self-center-safe">
        Enjoy your day off
      </Text>

      <Center>
        <CircularProgress
          value={0}
          initialValue={100}
          radius={190}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeColor={Colors.tabIconDefault}
          activeStrokeColor={Colors.tabIconSelected}
        />
      </Center>
    </View>
  );
}
