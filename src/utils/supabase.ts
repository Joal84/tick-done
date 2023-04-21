import { createClient } from "@supabase/supabase-js";

const keySupa = import.meta.env.VITE_KEY;
const supaUrl = "https://pvwmmlshdbxidotgjrhd.supabase.co";

export const supabase = createClient(supaUrl, keySupa);
