import css from "./sign-in.module.css";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import Title from "../../components/title/title";
import Button from "../button/button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const resetPasswordHandler = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      { redirectTo: "http://localhost:5173/password-reset" }
    );
    if (error) {
    }
    if (data) {
      Swal.fire({
        title: "Reset your password",
        text: `A password reset link was sent to ${formData.email}`,
        icon: "success",
        confirmButtonColor: "#227250",
        iconColor: "#227250",
      });
    }
  };

  const handleChange = (event: any) => {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data, error }: any = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setErrorMessage("Invalid credentials");
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
        <input
          className={css.field}
          type="email"
          name="email"
          onChange={handleChange}
        />
        <p style={{ fontSize: "1.4rem", color: "red" }}>{errorMessage}</p>
        <label className={css.labelField} htmlFor="password">
          Password
        </label>
        <input
          className={css.field}
          name="password"
          minLength={8}
          type="password"
          onChange={handleChange}
        />
        <p className={css.forgotPassword} onClick={resetPasswordHandler}>
          Forgot Password?
        </p>
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
