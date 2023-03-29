import css from "./navigation.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userDataContext } from "../utils/userAuth";
import { supabase } from "../utils/supabase";
import { ReactComponent as LogoBox } from "../assets/logo_box.svg";
import { ReactComponent as LogoLettering } from "../assets/logo_lettering.svg";

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
}

function Navigation({ setUserLogged }: any) {
  const userAuth: any = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUserLogged(userAuth);
  });
  const logoutHandler = () => {
    signOutUser();
    navigate("/login");
  };

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
                  ? logoutHandler
                  : () => navigate("/login")
              }
            >
              {Object.keys(userAuth).length !== 0 ? "Logout" : "Login"}
            </li>
          </ul>
        ) : (
          <ul className={css.buttonContainer}>
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
        )}
      </div>
    </nav>
  );
}

export default Navigation;
