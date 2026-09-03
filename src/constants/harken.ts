import type { PartialHarkenTheme } from "@harkenapp/sdk-react-native";
import { Colors } from "./colors";

export const harkenDarkTheme: PartialHarkenTheme = {
  colors: {
    background: Colors.background,
    formBackground: "transparent",
    surface: Colors.card,
    backgroundSecondary: Colors.card,
    text: Colors.foreground,
    textSecondary: Colors.muted,
    textPlaceholder: "#737373",
    border: Colors.borderSubtle,
    borderFocused: Colors.primary,
    primary: "#701719",
    primaryPressed: "#8A1A1C",
  },
  radii: { form: 20 },
};
