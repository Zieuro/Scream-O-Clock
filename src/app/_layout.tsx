import { useEffect } from "react";
import { useAppStore } from "@/state/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HeroUINativeProvider } from "heroui-native";
import * as SplashScreen from "expo-splash-screen";
import { useLoadedFonts } from "@/constants/fonts";
import "../../global.css";
import { Colors } from "@/constants/colors";
import { harkenDarkTheme } from "@/constants/harken";
import { useClock } from "@/hooks/useClock";
import { HarkenProvider } from "@harkenapp/sdk-react-native";

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
  <HarkenProvider
        themeMode="dark"
        darkTheme={harkenDarkTheme}
        config={{
          publishableKey: "pk_live_0lgUparAhPCpnI25VbLnZKB88jfVlhzB",
        }}
      >
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={{ devInfo: { stylingPrinciples: false } }}>
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
      </HarkenProvider>
  );
}