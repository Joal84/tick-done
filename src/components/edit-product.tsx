import { useEffect, useState, FormEvent } from "react";
import css from "./edit-product.module.css";
import { supabase } from "../utils/supabase";
import Button from "../components/Button/button";

export default function EditProduct(props: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [avgPrice, setAvgPrice] = useState("");

  useEffect(() => {
    setName(props.name);
    setCategory(props.category);
    setDescription(props.description);
    setId(props.id);
    setAvgPrice(props.avgPrice);
  }, []);

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !category) {
      return;
    }

    const { data, error }: any = await supabase
      .from("products_list")
      .update({ name, description, category, avg_price: avgPrice, id })
      .eq("id", id)
      .select();

    if (error) {
    }
    if (data) {
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
          <option value="None">None</option>
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
        <label className={css.price} htmlFor="average-price">
          Price
        </label>
        <input
          className={css.categoryField}
          type="number"
          name="average-price"
          value={avgPrice}
          onChange={(e) => setAvgPrice(e.target.value)}
          required
        ></input>
        <Button onClick={handleSubmit} title="Edit" />
      </form>
    </div>
  );
}
