import { supabase } from "./supabase";
import { Season_Config } from "@/domain/types";

export async function fetchConfig(): Promise<Season_Config | null> {
  const { data, error } = await supabase
    .from("season_config")
    .select("config")
    .eq("id", 1)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data.config as Season_Config;
}

export const default_config: Season_Config = {
  8: {
    // September (getMonth() is 0-indexed)
    days: [5, 6], // Friday, Saturday
    callHour: 18,
    startHour: 19,
    endHours: { 5: 0, 6: 1 }, // Friday → 01:00, Saturday → 01:00
  },
  9: {
    // October
    days: [4, 5, 6, 0], // Thursday through Sunday
    callHour: 18,
    startHour: 19,
    endHours: { 4: 0, 5: 1, 6: 1, 0: 0 }, // Thur→midnight, Fri→01:00, Sat→01:00, Sun→midnight
  },
};