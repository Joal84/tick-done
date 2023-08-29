import { useEffect, useState, createContext } from "react";
import { supabase } from "../../utils/supabase";

export const userDataContext = createContext(null);

export default function UserAuth({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authStateChange = async () => {
      supabase.auth.onAuthStateChange(async (event) => {
        switch (event) {
          case "SIGNED_OUT":
            setUser(null);
            break;
          case "SIGNED_IN":
            await getUserData();
            break;
          case "USER_UPDATED":
            await getUserData();
            break;
        }
      });
    };
    const getUserData = async () => {
      const { data: newUser } = await supabase.auth.getUser();
      // await supabase.auth.getUser().then((value) => {
      //  if (value.data?.user) {
      //   setUser(value.data.user);
      //}
      //  });
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
