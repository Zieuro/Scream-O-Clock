import { useEffect } from "react";
import { useAppStore } from "@/state/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HeroUINativeProvider } from "heroui-native";
import "../../global.css";
import { Colors } from "@/constants/colors";

export default function RootLayout() {
  useEffect(() => {
    useAppStore.getState().loadShow(new Date());
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings"
            options={{
              headerTransparent: true,
              headerTitle: "",
              headerTintColor: Colors.text,
            }}
          />
        </Stack>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
