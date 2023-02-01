import { FormEvent, useEffect, useState, useContext } from "react";
import css from "./add-to-product.module.css";
import { userDataContext } from "../utils/userAuth";
import { supabase } from "../utils/supabase";
import Button from "./button";

export default function AddToProduct({
  setAddedProduct,
  setAddOverlayOpen,
}: any) {
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food-and-Pantry");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const userAuth: any = useContext(userDataContext);
  const user_id = userAuth.id;

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !category) {
      setFormError("Please fill in all the fields");
      return;
    }

    const { data, error }: any = await supabase
      .from("products_list")
      .insert([{ name, category, description, user_id }])
      .select();

    if (error) {
      setFormError(error);
    }
    if (data) {
      setAddedProduct(data);
    }
    setAddOverlayOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.container}>
        <label className={css.label} htmlFor="product-name">
          Product Name
        </label>
        <input
          className={css.categoryField}
          type="text"
          name="product-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>

        <label className={css.label} htmlFor="category">
          Category
        </label>
        <select
          className={css.categoryField}
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food-and-Pantry">Food and Pantry</option>
          <option value="Health-and-Beauty">Health and Beauty</option>
          <option value="Household">Household</option>
        </select>

        <label className={css.label} htmlFor="description">
          Description
        </label>
        <textarea
          className={css.categoryField}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        ></textarea>
        <Button onClick={handleSubmit} title="Add" />
      </form>
    </div>
  );
}
