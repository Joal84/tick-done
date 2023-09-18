import { useEffect, useState, createContext, useContext } from "react";
import { redirect } from "react-router-dom";
import { supabase } from "../../utils/supabase";

export const userDataContext = createContext(null);

export default function UserAuth({ children }) {
  const [user, setUser] = useState([{}]);

  useEffect(() => {
    const authStateChange = async () => {
      supabase.auth.onAuthStateChange(async (event) => {
        switch (event) {
          case "SIGNED_OUT":
            redirect("/login");
            setUser([{}]);

            break;
          case "SIGNED_IN":
            await getUserData();
            redirect("/");
            break;
          case "USER_UPDATED":
            await getUserData();
            redirect("/");
            break;
        }
      });
    };
    const getUserData = async () => {
      const { data: newUser } = await supabase.auth.getUser();
      setUser(newUser);
    };
    getUserData().then(authStateChange);
  }, [supabase]);
  return (
    <userDataContext.Provider value={[user, setUser]}>
      {children}
    </userDataContext.Provider>
  );
}
