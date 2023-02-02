import { useEffect, useState, FormEvent } from "react";
import css from "./edit-product.module.css";
import { supabase } from "../utils/supabase";
import Button from "./button";

export default function EditProduct(props: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food-and-Pantry");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setName(props.name);
    setCategory(props.category);
    setDescription(props.description);
    setId(props.id);
  }, []);

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !category) {
      return;
    }

    const { data, error }: any = await supabase
      .from("products_list")
      .update({ name, description, category, id })
      .eq("id", id)
      .select();

    if (error) {
    }
    if (data) {
      console.log(data);
      props.setEditedProduct(data);
    }
    props.setEditOverlayOpen(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={css.container}>
        <label className={css.label} htmlFor="product-name">
          Edit Product Name
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
        <Button onClick={handleSubmit} title="Edit" />
      </form>
    </div>
  );
}
