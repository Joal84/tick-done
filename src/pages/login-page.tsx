import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { userDataContext } from "../utils/userAuth";

export default function Login() {
  const userAuth = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event !== "SIGNED_OUT") {
        // forward to success URL
        navigate("/");
      }
    });
  }, [userAuth]);
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={["google"]}
      />
    </div>
  );
}
