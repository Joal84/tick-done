import css from "./reset-pass.module.css";
import { supabase } from "../../utils/supabase";
import { useState } from "react";
import { motion } from "framer-motion";
import Title from "../../components/title/title";
import Button from "../button/button";

export default function ResetPass() {
  const [password, setPassword] = useState({
    password: "",
    repeatPassword: "",
  });
  const passwordResetHandler = (e) => {
    e.preventDefault();
    if (
      password.password !== password.repeatPassword ||
      password.password.length < 1
    ) {
      return;
    }
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const { data, error } = await supabase.auth.updateUser({
          password: password.password,
        });

        if (data) {
          alert("Password updated successfully!");
        }
        if (error) {
          alert("There was an error updating your password.");
        }
      }
    });
  };

  const handleChange = () => {
    setPassword((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <motion.div animate={{ x: 100 }} className={css.container}>
      <Title>Reset your password</Title>
      <form className={css.form} onSubmit={passwordResetHandler}>
        <label className={css.labelField} htmlFor="password">
          New password
        </label>
        <input
          value={password.password}
          minLength={8}
          id="password"
          className={css.field}
          name="password"
          type="password"
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="repeat-password">
          Repeat new password
        </label>
        <input
          value={password.repeatPassword}
          minLength={8}
          className={css.field}
          name="repeatPassword"
          id="repeat-password"
          type="password"
          onChange={handleChange}
        />
        <p className={css.password}>Minimum of 8 characters</p>

        <Button type="submit" onSubmit={passwordResetHandler}>
          Reset
        </Button>
      </form>
    </motion.div>
  );
}
