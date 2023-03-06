import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import css from "./sign-up.module.css";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={css.field}
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          className={css.field}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          className={css.field}
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
