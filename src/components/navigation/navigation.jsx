import css from "./navigation.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { KeyboardEvent, useContext } from "react";
import { userDataContext } from "../data-fecthing/userAuth";
import { supabase } from "../../utils/supabase";

import { ReactComponent as LogoBox } from "../../assets/logo_box.svg";
import { ReactComponent as LogoLettering } from "../../assets/logo_lettering.svg";

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
}

function Navigation() {
  const [userAuth, setUser] = useContext(userDataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    signOutUser();
    navigate("/login");
  };

  const handleKeyNav = (e, location) => {
    if (e.keyCode === 13) {
      navigate(location);
    }
  };
  const handleKeyLogout = (e, location) => {
    if (e.keyCode === 13) {
      signOutUser();
      navigate(location);
    }
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
              className={
                location.pathname === "/" ? css.currentLink : css.navLink
              }
              onClick={() => navigate("/")}
              onKeyDown={(e) => handleKeyNav(e, "/")}
            >
              Shopping List
            </li>
            <li
              tabIndex={0}
              className={
                location.pathname === "/manage-products"
                  ? css.currentLink
                  : css.navLink
              }
              onClick={() => navigate("/manage-products")}
              onKeyDown={(e) => handleKeyNav(e, "/manage-products")}
            >
              Manage Products
            </li>
            <li
              tabIndex={0}
              className={
                location.pathname === "/settings"
                  ? css.currentLink
                  : css.navLink
              }
              onClick={() => navigate("/settings")}
              onKeyDown={(e) => handleKeyNav(e, "/settings")}
            >
              Settings
            </li>
            <li
              tabIndex={0}
              className={
                location.pathname === "/login" ? css.currentLink : css.navLink
              }
              onClick={
                Object.keys(userAuth).length !== 0
                  ? logoutHandler
                  : () => navigate("/login")
              }
              onKeyDown={
                Object.keys(userAuth).length !== 0
                  ? (e) => handleKeyLogout(e, "/login")
                  : (e) => handleKeyNav(e, "/login")
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
