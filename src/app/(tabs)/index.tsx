import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        flexDirection: "column",
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: Colors.text }}>Hello</Text>
    </View>
  );
}
