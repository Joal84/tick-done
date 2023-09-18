import css from "./navigation.module.css";
import { useContext, useState } from "react";
import { userDataContext } from "../data-fecthing/userAuth";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import Menu from "./menu";
import { ReactComponent as LogoBox } from "../../assets/logo_box.svg";
import { ReactComponent as LogoLettering } from "../../assets/logo_lettering.svg";
import { ReactComponent as MenuLogo } from "../../assets/menu.svg";

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
};

function Navigation() {
  const navigate = useNavigate();
  const [userAuth, setUser] = useContext(userDataContext);
  const [modal, setModal] = useState(false);

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

        {userAuth?.length !== 0 ? (
          <div>
            <div className={css.menuDisplay}>
              <Menu />
            </div>
            <MenuLogo
              className={css.menuLogo}
              onClick={() => setModal(!modal)}
            />
            {modal ? (
              <Modal onClose={() => setModal(false)}>
                <Menu />
              </Modal>
            ) : (
              ""
            )}
          </div>
        ) : (
          <ul className={css.buttonContainer}>
            <li
              tabIndex={0}
              className={css.navLink}
              onClick={
                userAuth?.length !== 0
                  ? () => signOutUser()
                  : () => navigate("/login")
              }
            >
              {userAuth?.length !== 0 ? "Logout" : "Login"}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
