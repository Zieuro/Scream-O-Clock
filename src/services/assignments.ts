import { supabase } from "./supabase";
import { Row } from "@/domain/types";

export async function fetchRows(): Promise<Row[] | null> {
  const { data, error } = await supabase.from("slot_assignment").select("id, a, b, c").order("id");

  if (error) {
    console.log(error);
    return null;
  }

  return data as Row[];
}