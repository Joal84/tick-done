import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { userDataContext } from "../data-fecthing/userAuth";
import { signOutUser } from "./navigation";
import css from "./menu.module.css";

export default function Menu() {
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
    <div>
      <ul className={css.buttonContainer}>
        <li
          tabIndex={0}
          className={location.pathname === "/" ? css.currentLink : css.navLink}
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
            location.pathname === "/settings" ? css.currentLink : css.navLink
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
          onClick={userAuth !== null ? logoutHandler : () => navigate("/login")}
          onKeyDown={
            userAuth !== null
              ? (e) => handleKeyLogout(e, "/login")
              : (e) => handleKeyNav(e, "/login")
          }
        >
          {userAuth !== null ? "Logout" : "Login"}
        </li>
      </ul>
    </div>
  );
}
