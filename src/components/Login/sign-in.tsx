import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { Link } from "react-router-dom";
import Title from "../title";
import Button from "../Button/button";
import css from "./sign-in.module.css";
import { motion } from "framer-motion";

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
  };
  const handleFacebookOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  };
  return (
    <motion.div animate={{ x: 100 }} className={css.container}>
      <Title>Login</Title>
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
        <p className={css.forgotPassword}>Forgot Password?</p>
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
      <p className={css.cta}>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </motion.div>
  );
}
