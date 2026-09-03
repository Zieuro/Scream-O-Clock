import { View, Text } from "react-native";
import { Separator } from "heroui-native";

export default function NoShow() {

  return (
    <>
      <View className="mx-5 px-5 gap-4 flex-col">
        <Text className="font-cinzel-bold self-center text-4xl text-muted">
          No Show Today
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text className="self-center text-4xl font-cinzel-semibold text-primary">
          Rest well!!
        </Text>
      </View>

    </>
  );
}
