import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import Button from "../Button/button";
import Title from "../title";
import css from "./sign-up.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ColorRing } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearInput = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  };

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
    setIsLoading(true);
    if (
      formData.password !== formData.repeatPassword ||
      formData.password.length < 8
    ) {
      setIsLoading(false);
      return setErrorMessage(
        "Please repeat the same password with a minimum of 8 carachters"
      );
    }
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
        },
      },
    });
    if (error) {
      Swal.fire({
        title: "Failed to creat account",

        icon: "error",
        confirmButtonColor: "#227250",
        iconColor: "#227250",
      });
      setIsLoading(false);
    }
    if (data) {
      Swal.fire({
        title: "Account Created!",
        text: "Please check your email inbox",
        icon: "success",
        confirmButtonColor: "#227250",
        iconColor: "#227250",
      });
      setIsLoading(false);
    }
    clearInput();
  };

  return (
    <motion.div animate={{ x: 100 }} className={css.container}>
      {isLoading && (
        <div className={css.loading}>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      <Title>Create your account</Title>

      <p
        style={{
          position: "absolute",
          fontSize: "1.4rem",
          color: "red",
          textAlign: "center",
          top: "3%",
          padding: "40px",
        }}
      >
        {errorMessage}
      </p>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.labelField} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className={css.field}
          placeholder="E.g. John"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          required
          type="email"
          value={formData.email}
          className={css.field}
          placeholder="E.g. something@something.com"
          name="email"
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="password">
          Password
        </label>
        <input
          value={formData.password}
          minLength={8}
          id="password"
          className={css.field}
          name="password"
          required
          type="password"
          onChange={handleChange}
        />
        <p className={css.password}>Minimum of 8 characters</p>

        <label className={css.labelField} htmlFor="repeat-password">
          Repeat password
        </label>
        <input
          value={formData.repeatPassword}
          minLength={8}
          required
          className={css.lastField}
          name="repeatPassword"
          id="repeat-password"
          type="password"
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
      <p className={css.cta}>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </motion.div>
  );
}
