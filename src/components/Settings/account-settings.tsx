import css from "./account-settings.module.css";
import { supabase } from "../../utils/supabase";
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../data-fecthing/userAuth";
import { signOutUser } from "../../components/navigation/navigation";
import Title from "../../components/title/title";
import Button from "../button/button";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const [userData, setUserData] = useState({ userName: "", email: "" });
  const [password, setPassword] = useState({
    password: "",
    repeatPassword: "",
  });
  const userAuth: any = useContext(userDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    setUserData({
      userName: userAuth?.user_metadata?.name,
      email: userAuth?.email,
    });
  }, []);

  const handleDelteUser = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to delete this account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ba6473",
      cancelButtonColor: "#227250",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const { data, error } = supabase.auth.admin.deleteUser(userAuth.id);
        signOutUser();
        navigate("/login");
        Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
          confirmButtonColor: "#227250",
          iconColor: "#227250",
        });
      } else {
        return;
      }
    });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    // Update email
    if (userData.email !== userAuth.email && userData.email.length > 4) {
      const { data, error } = await supabase.auth.updateUser({
        email: userData.email,
      });
      if (error) {
      }
      if (data) {
        Swal.fire({
          title: "Email Updated",
          text: "Please check your email inbox and approve the change.",
          icon: "success",
          confirmButtonColor: "#227250",
          iconColor: "#227250",
        });
      }
    }

    // Update Name
    if (
      userData.userName.length > 1 &&
      userData.userName !== userAuth?.user_metadata?.name
    ) {
      const { data, error } = await supabase.auth.updateUser({
        data: { name: userData.userName },
      });
      if (error) {
      }
      if (data) {
        Swal.fire({
          title: "Information Updated",

          icon: "success",
          confirmButtonColor: "#227250",
          iconColor: "#227250",
        });
      }
    }

    // Update password
    if (
      password.password === password.repeatPassword &&
      password.repeatPassword.length > 8
    ) {
      const { data, error } = await supabase.auth.updateUser({
        password: password.repeatPassword,
      });
      if (error) {
      }
      if (data) {
        Swal.fire({
          title: "Password Updated",
          icon: "success",
          confirmButtonColor: "#227250",
          iconColor: "#227250",
        });
      }
    }
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "USER_UPDATED");
    });
  };

  return (
    <div className={css.container}>
      <form
        className={css.form}
        onSubmit={handleUserUpdate}
        autoComplete="new-password"
      >
        <Title type="secondTitle">Account Information</Title>
        <label className={css.label}>
          Name
          <input
            type="text"
            className={css.input}
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          ></input>
        </label>
        <label className={css.label}>
          Email
          <input
            autoComplete="new-password"
            type="text"
            className={css.input}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          ></input>
        </label>
        <label className={css.label}>
          New Password
          <input
            minLength={8}
            autoComplete="new-password"
            type="password"
            className={css.input}
            onChange={(e) =>
              setPassword({ password: e.target.value, repeatPassword: "" })
            }
          ></input>
        </label>
        <label className={css.label}>
          Repeat New Password
          <input
            minLength={8}
            type="password"
            className={css.input}
            onChange={(e) =>
              setPassword({ ...password, repeatPassword: e.target.value })
            }
          ></input>
        </label>
        <div className={css.buttonsContainer}>
          <Button className="base" onSubmit={handleUserUpdate}>
            Save
          </Button>
          <Button className="delete" onClick={handleDelteUser}>
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
}
