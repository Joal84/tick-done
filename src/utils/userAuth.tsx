import { supabase } from "./supabase";
import { useEffect, useState, createContext } from "react";

export const userDataContext = createContext({});

export default function UserAuth({ children }: any) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const authStateChange = async function () {
      await supabase.auth.onAuthStateChange(async (event) => {
        switch (event) {
          case "SIGNED_OUT":
            setUser({});
            break;
          case "SIGNED_IN":
            await getUserData();
            break;
        }
      });
    };
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        // value.data.user
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
    authStateChange();
  }, []);

  return (
    <userDataContext.Provider value={user}>{children}</userDataContext.Provider>
  );
}
