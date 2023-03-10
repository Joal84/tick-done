import css from "./navigation.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "./button";
import { useContext, useEffect } from "react";
import { userDataContext } from "../utils/userAuth";
import { supabase } from "../utils/supabase";
import { ReactComponent as LogoBox } from "../assets/logo_box.svg";
import { ReactComponent as LogoLettering } from "../assets/logo_lettering.svg";

function Navigation({ setUserLogged }: any) {
  const userAuth: any = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUserLogged(userAuth);
  });

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <nav className={css.bar}>
      <div className={css.container}>
        <div
          tabIndex={0}
          className={css.branding}
          onClick={() => navigate("/")}
        >
          <LogoBox className={css.logoBox} />
          <LogoLettering className={css.logoLettering} />
          <span className={css.slogan}>add. buy. repeat.</span>
        </div>

        {Object.keys(userAuth).length !== 0 ? (
          <ul className={css.buttonContainer}>
            <li
              tabIndex={0}
              className={css.navLink}
              onClick={() => navigate("/manage-products")}
            >
              Manage Products
            </li>
            <li
              tabIndex={0}
              className={css.navLink}
              onClick={() => navigate("/settings")}
            >
              Settings
            </li>
            <li
              tabIndex={0}
              className={css.navLink}
              onClick={
                Object.keys(userAuth).length !== 0
                  ? () => signOutUser()
                  : () => navigate("/login")
              }
            >
              {Object.keys(userAuth).length !== 0 ? "Logout" : "Login"}
            </li>
          </ul>
        ) : (
          <li
            tabIndex={0}
            className={css.navLink}
            onClick={
              Object.keys(userAuth).length !== 0
                ? () => signOutUser()
                : () => navigate("/login")
            }
          >
            {Object.keys(userAuth).length !== 0 ? "Logout" : "Login"}
          </li>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
