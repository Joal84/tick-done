import { createClient } from "@supabase/supabase-js";

// const urlSupa = "https://pvwmmlshdbxidotgjrhd.supabase.co";
// const keySupa =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2d21tbHNoZGJ4aWRvdGdqcmhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Mjc0OTQyMywiZXhwIjoxOTg4MzI1NDIzfQ.FAVAacBb6xZta4ttGtDrOqi5I5dYjk3l16RqT73-B5g";

const urlSupa = import.meta.env.VITE_URL;
const keySupa = import.meta.env.VITE_API_KEY;

export const supabase = createClient(urlSupa, keySupa);
