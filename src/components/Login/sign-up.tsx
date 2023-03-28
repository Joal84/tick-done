import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import Button from "../Button/button";
import Title from "../title";
import css from "./sign-up.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
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
    if (formData.password !== formData.repeatPassword) {
      return;
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
    }
    if (data) {
      Swal.fire({
        title: "Account Created!",
        text: "Please check your Email inbox",
        icon: "success",
        confirmButtonColor: "#227250",
        iconColor: "#227250",
      });
    }
  };
  return (
    <motion.div animate={{ x: 100 }} className={css.container}>
      <Title>Create your account</Title>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.labelField} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className={css.field}
          placeholder="E.g. John"
          name="name"
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className={css.field}
          placeholder="E.g. something@something.com"
          name="email"
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="password">
          Password
        </label>
        <input
          minLength={8}
          id="password"
          className={css.field}
          name="password"
          type="password"
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="repeat-password">
          Repeat password
        </label>
        <input
          minLength={8}
          className={css.field}
          name="repeatPassword"
          id="repeat-password"
          type="password"
          onChange={handleChange}
        />
        <p className={css.password}>Minimum of 8 characters</p>

        <Button type="submit">Sign Up</Button>
      </form>
      <p className={css.cta}>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </motion.div>
  );
}
