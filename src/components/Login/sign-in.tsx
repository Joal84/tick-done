import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import Title from "../title";
import Button from "../button";
import css from "./sign-in.module.css";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
    }
    if (data) {
    }
  };
  const handleGoogleOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data);
  };
  const handleFacebookOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
    console.log(data);
  };
  return (
    <div className={css.container}>
      <Title title="Login" />
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.labelField} htmlFor="email">
          Email
        </label>
        <input className={css.field} name="email" onChange={handleChange} />
        <label className={css.labelField} htmlFor="password">
          Password
        </label>
        <input
          className={css.field}
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
      </form>
      <div className={css.dividerContainer}>
        <div className={css.divider}></div>
        <span className={css.dividerLabel}>or</span>
        <div className={css.divider}></div>
      </div>
      <Button onClick={handleGoogleOAuth} className="google">
        <span>Login with Google</span>
      </Button>
      <Button onClick={handleFacebookOAuth} className="facebook">
        <span>Login with Facebook</span>
      </Button>
      <p className={css.cta}>Don’t have an account? Sign Up</p>
    </div>
  );
}
