import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { Creepster_400Regular } from "@expo-google-fonts/creepster";
import {
  Cinzel_400Regular,
  Cinzel_500Medium,
  Cinzel_600SemiBold,
  Cinzel_700Bold,
  Cinzel_800ExtraBold,
  Cinzel_900Black,
} from "@expo-google-fonts/cinzel";
import {
  MPLUSU_100Thin,
  MPLUSU_200ExtraLight,
  MPLUSU_300Light,
  MPLUSU_400Regular,
  MPLUSU_500Medium,
  MPLUSU_600SemiBold,
  MPLUSU_700Bold,
  MPLUSU_800ExtraBold,
  MPLUSU_900Black,
} from "@expo-google-fonts/m-plus-u";

export function useLoadedFonts() {
  return useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Creepster_400Regular,
    Cinzel_400Regular,
    Cinzel_500Medium,
    Cinzel_600SemiBold,
    Cinzel_700Bold,
    Cinzel_800ExtraBold,
    Cinzel_900Black,
    Cinzel_700Bold_TNum: require("../../assets/Cinzel-Bold-TNum.ttf"),
    MPLUSU_100Thin,
    MPLUSU_200ExtraLight,
    MPLUSU_300Light,
    MPLUSU_400Regular,
    MPLUSU_500Medium,
    MPLUSU_600SemiBold,
    MPLUSU_700Bold,
    MPLUSU_800ExtraBold,
    MPLUSU_900Black,
  });
}