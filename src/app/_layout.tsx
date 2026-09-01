import { useEffect } from "react";
import { useAppStore } from "@/state/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HeroUINativeProvider } from "heroui-native";
import * as SplashScreen from "expo-splash-screen";
import { useLoadedFonts } from "@/constants/fonts";
import "../../global.css";
import { Colors } from "@/constants/colors";
import { useClock } from "@/hooks/useClock";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useLoadedFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    useAppStore.getState().loadShow(new Date());
  }, []);
  useClock();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings"
            options={{
              headerTransparent: false,
              headerStyle: { backgroundColor: Colors.dark },
              headerShadowVisible: true,
              headerTitle: "Settings",
              headerBackTitle: "Back",
              headerBackButtonDisplayMode: "generic",
              headerTintColor: Colors.foreground,
            }}
          />
        </Stack>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
