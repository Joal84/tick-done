import css from "./login-page.module.css";
import { supabase } from "../../utils/supabase";
import { redirect } from "react-router-dom";
import { useEffect, useContext } from "react";
import { userDataContext } from "../../components/data-fecthing/userAuth";
import { ProductListContext } from "../../components/data-fecthing/productlist-context";
import { ShoppingListContext } from "../../components/data-fecthing/shoppinglist-contex";
import { ReactComponent as LogoBox } from "../../assets/logo_box.svg";
import { ReactComponent as LogoLettering } from "../../assets/logo_lettering.svg";

export default function Login({ signIn, signUp, resetPass }: any) {
  const [userAuth, setUser]: any = useContext(userDataContext);
  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList, setProductList]: any = useContext(ProductListContext);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        // forward to success URL
        redirect("/");
      }
      if (event === "SIGNED_OUT") {
        redirect("/login");
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
