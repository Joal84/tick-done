import { createContext, useState, useMemo } from "react";
import { supabase } from "../../utils/supabase";
import "./loading.css";

export const CurrencyContext: any = createContext([{}]);

export default function SettingsFetch({ children }) {
  const [currency, setCurrency]: any = useState("");

  useMemo(() => {
    const fetchUserPreferences = async () => {
      const { data, error } = await supabase.from("user_settings").select();
      if (error) {
      }
      if (data) {
        setCurrency(data);
      }
    };
    fetchUserPreferences();
  }, []);

  return (
    <CurrencyContext.Provider value={[currency, setCurrency]}>
      {children}
    </CurrencyContext.Provider>
  );
}
