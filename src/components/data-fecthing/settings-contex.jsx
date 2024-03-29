import "./loading.css";
import { createContext, useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

export const CurrencyContext = createContext([]);

export default function SettingsFetch({ children }) {
  const [currency, setCurrency] = useState("€");

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const { data, error } = await supabase.from("user_settings").select();

      if (data[0]) {
        setCurrency(data[0].currency ? data[0].currency : "€");
      } else {
        setCurrency("€");
      }
    };
    fetchUserPreferences();
  }, [supabase]);

  return (
    <CurrencyContext.Provider value={[currency, setCurrency]}>
      {children}
    </CurrencyContext.Provider>
  );
}
