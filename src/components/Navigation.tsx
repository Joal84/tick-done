import naviCss from "./navigation.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { useContext } from "react";
import { userDataContext } from "../utils/userAuth";
import { supabase } from "../utils/supabase";

function Navigation({ setUserLogged }: any) {
  const userAuth: any = useContext(userDataContext);
  const navigate = useNavigate();
  setUserLogged(userAuth);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <div className={naviCss.bar}>
      <div className={naviCss.container}>
        <div className={naviCss.logo}>Simplista</div>
        <div className={naviCss.buttonContainer}>
          {Object.keys(userAuth).length !== 0 ? (
            <Button title="Manage Products" />
          ) : (
            ""
          )}

          <Button
            title={Object.keys(userAuth).length !== 0 ? "Logout" : "Login"}
            onClick={
              Object.keys(userAuth).length !== 0
                ? () => signOutUser()
                : () => navigate("/login")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
