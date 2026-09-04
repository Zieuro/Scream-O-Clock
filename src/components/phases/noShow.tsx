import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Separator } from "heroui-native";

export default function NoShow() {

  return (
    <>
      <View className="gap-4 justify-evenly flex-col">
        <Text className="font-cinzel-bold text-center text-4xl text-muted">
          No Show Today
        </Text>

        <Separator className="mx-8" thickness={1} />

        <Text className="text-center text-4xl font-cinzel-semibold text-primary">
          Rest Well!!
        </Text>
      </View>

      <View className="items-center gap-2">
      <Image
        source={require("@/assets/images/ghostShadow.svg")}
        contentFit="contain"
        style={{ width: 350, height: 350 }}
        />
      </View>
      <Text className="text-center text-4xl font-cinzel-semibold text-primary">Hydrate Before You Die-Drate!!!</Text>
    </>
  );
}
