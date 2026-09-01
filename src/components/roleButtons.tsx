import { View, Text } from "react-native";
import RoleButton from "./buttons/roleButton";

export default function RoleButtons() {
  const letterStyle = { lineHeight: 98 };

  return (
    <View className="flex-row justify-evenly gap-5">
      <RoleButton buttonRole="a">
        <Text className="text-neutral-300 text-7xl text-center font-cinzel-bold" style={letterStyle}>A</Text>
      </RoleButton>
      <RoleButton buttonRole="b">
        <Text className="text-neutral-300 text-7xl text-center font-cinzel-bold" style={letterStyle}>B</Text>
      </RoleButton>
      <RoleButton buttonRole="c">
        <Text className="text-neutral-300 text-7xl text-center font-cinzel-bold" style={letterStyle}>C</Text>
      </RoleButton>
      </View>
  );
}
