import { useEffect, useState, createContext } from "react";
import { supabase } from "../../utils/supabase";

export const userDataContext = createContext(null);

export default function UserAuth({ children }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const authStateChange = async function () {
      supabase.auth.onAuthStateChange(async (event) => {
        switch (event) {
          case "SIGNED_OUT":
            setUser(null);
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
