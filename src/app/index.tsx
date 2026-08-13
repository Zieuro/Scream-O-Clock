import { Text, View, StyleSheet } from "react-native";
import MainScreen from "@/src/ui/MainScreen";
import "@/global.css";

export default function Index() {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
