import "./loading.css";
import { createContext, useState, useMemo, ReactNode } from "react";
import { supabase } from "../../utils/supabase";

export const CurrencyContext = createContext([]);

export default function SettingsFetch({ children }) {
  const [currency, setCurrency] = useState([]);

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
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}
