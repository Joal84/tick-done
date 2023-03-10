import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import Button from "../Button/button";
import Title from "../title";
import css from "./sign-up.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
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
    }
  };
  return (
    <motion.div animate={{ x: 100 }} className={css.container}>
      <Title title="Create a tick-done account" />
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.labelField} htmlFor="name">
          Name
        </label>
        <input
          className={css.field}
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="email">
          Email
        </label>
        <input
          className={css.field}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <label className={css.labelField} htmlFor="Password">
          Password
        </label>
        <input
          className={css.field}
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <p className={css.password}>
          Password should have a minimum of 5 characters
        </p>
        <Button type="submit">Sign Up</Button>
      </form>
      <p className={css.cta}>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </motion.div>
  );
}
