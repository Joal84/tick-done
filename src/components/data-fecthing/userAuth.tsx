import { useEffect, useState, createContext } from "react";

import { supabase } from "../../utils/supabase";

export const userDataContext: any = createContext({});

export default function UserAuth({ children }: any) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const authStateChange = async function () {
      supabase.auth.onAuthStateChange(async (event) => {
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
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
    authStateChange();
  }, []);
  return (
    <userDataContext.Provider value={[user, setUser]}>
      {children}
    </userDataContext.Provider>
  );
}
