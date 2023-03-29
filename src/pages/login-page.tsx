import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { userDataContext } from "../utils/userAuth";
import { ProductListContext } from "../App";
import { ShoppingListContext } from "../App";
import css from "./login-page.module.css";
import { ReactComponent as LogoBox } from "../assets/logo_box.svg";
import { ReactComponent as LogoLettering } from "../assets/logo_lettering.svg";
import { currencyContext } from "../App";

export default function Login({ signIn, signUp, resetPass }: any) {
  const userAuth = useContext(userDataContext);
  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [currency, setCurrency]: any = useContext(currencyContext);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        // forward to success URL
        navigate("/");
      }
      if (event === "SIGNED_OUT") {
        navigate("/login");
        setProductList([{}]);
        setList([{}]);
      }
    });
  }, [userAuth]);
  return (
    <>
      <div className={css.background}>
        <div className={css.container}>
          <div className={css.branding}>
            <LogoBox className={css.logoBox} />
            <LogoLettering className={css.logoLettering} />
            <span className={css.slogan}>add. buy. repeat.</span>
            <p className={css.description}>
              A grocery list application made simple.
            </p>
          </div>
          {signIn || signUp || resetPass}
        </div>
      </div>
    </>
  );
}
