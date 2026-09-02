import { View, Text } from "react-native";
import RoleButton from "./buttons/roleButton";
import { useSettingsStore } from "@/state/settingsStore";

export default function RoleButtons() {
  const letterStyle = { lineHeight: 98 }; // Adjust's font line height for ios (97 px)
  const numFormat = useSettingsStore((s) => s.numFormat);

  return (
    <View className="flex-row justify-evenly gap-5">
      <RoleButton buttonRole="a">
        <Text
          className="text-foreground text-7xl text-center font-cinzel-bold"
          style={letterStyle}
        >
          {numFormat ? "1" : "A"}
        </Text>
      </RoleButton>
      
      <RoleButton buttonRole="b">
        <Text
          className="text-foreground text-7xl text-center font-cinzel-bold"
          style={letterStyle}
        >
          {numFormat ? "2" : "B"}
        </Text>
      </RoleButton>
      
      <RoleButton buttonRole="c">
        <Text
          className="text-foreground text-7xl text-center font-cinzel-bold"
          style={letterStyle}
        >
          {numFormat ? "3" : "C"}
        </Text>
      </RoleButton>
    </View>
  );
}