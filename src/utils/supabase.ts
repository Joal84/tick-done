import { createClient } from "@supabase/supabase-js";

export const urlSupa = "https://pvwmmlshdbxidotgjrhd.supabase.co";
export const keySupa =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2d21tbHNoZGJ4aWRvdGdqcmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NDk0MjMsImV4cCI6MTk4ODMyNTQyM30.xEDAQGLUvCdTH9oxhI3FIcbvkMDasbs2GR9j6_fzqww";

export const supabase = createClient(urlSupa, keySupa);
