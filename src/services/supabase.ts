import { createClient } from "@supabase/supabase-js";
import { Season_Config } from "@/domain/types";

export const supabase = createClient(
  "https://ymuctryiomhqwvojqtgg.supabase.co",
  "sb_publishable_Dy-mLG-WcCyNH-icZj2fHw_Ipw6Greq",
);