import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { userDataContext } from "../utils/userAuth";
import { ProductListContext } from "../App";
import { ShoppingListContext } from "../App";
import css from "./login-page.module.css";

export default function Login() {
  const userAuth = useContext(userDataContext);
  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList, setProductList]: any = useContext(ProductListContext);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event !== "SIGNED_OUT") {
        // forward to success URL
        navigate("/");
      }
      if (event === "SIGNED_OUT") {
        setProductList([{}]);
        setList([{}]);
      }
    });
  }, [userAuth]);
  return (
    <div className={css.background}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={["google"]}
      />
    </div>
  );
}
