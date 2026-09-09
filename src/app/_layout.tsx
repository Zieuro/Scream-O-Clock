import { useEffect } from "react";
import { useLoadShow } from "@/hooks/useLoadShow";
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
import { registerNotificationEvents } from "@/services/notifications";
import { useHydrated } from "@/hooks/useHydrated";
import { useAppStore } from "@/state/store";

// Registered at module scope so background events are handled even when the
// JS bundle is woken solely to deliver them.
registerNotificationEvents();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useLoadedFonts();
  const settingsHydrated = useHydrated();
  const storeHydrated = useAppStore((s) => s.hydrated);

  // Keep the splash screen up until fonts are ready and both persisted
  // stores have rehydrated, so the first revealed frame is a real screen
  // rather than the blank index gate.
  useEffect(() => {
    if (fontsLoaded && settingsHydrated && storeHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, settingsHydrated, storeHydrated]);

  useLoadShow();
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
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
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
              contentStyle: { backgroundColor: Colors.dark },
            }}
          />
        </Stack>
      </HeroUINativeProvider>
      </GestureHandlerRootView>
      </HarkenProvider>
  );
}