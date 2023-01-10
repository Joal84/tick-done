import naviCss from "./navigation.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../utils/userAuth";
import { supabase } from "../utils/supabase";

function Navigation() {
  const userAuth = useContext(userDataContext);
  const navigate = useNavigate();

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
  }
  console.log(userAuth);
  return (
    <div className={naviCss.bar}>
      <div className={naviCss.container}>
        <div className={naviCss.logo}>Simplista</div>
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
  );
}

export default Navigation;
