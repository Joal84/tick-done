import { FormEvent, useEffect, useState, useContext } from "react";
import css from "./add-to-product.module.css";
import { userDataContext } from "../utils/userAuth";
import { supabase } from "../utils/supabase";
import Button from "./button";
import { ProductListContext } from "../App";

export default function AddToProduct({ setAddOverlayOpen }: any) {
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [description, setDescription] = useState("");
  const [avgPrice, setAvgPrice] = useState(0);
  const [formError, setFormError] = useState("");

  const userAuth: any = useContext(userDataContext);
  const user_id = userAuth.id;

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !category) {
      setFormError("Please fill in all the fields");
      return;
    }
    if (
      productList.some((item) => item.name.toLowerCase() === name.toLowerCase())
    ) {
      return;
    }

    const { data, error }: any = await supabase
      .from("products_list")
      .insert([{ name, category, description, avg_price: avgPrice, user_id }])
      .select();

    if (error) {
      setFormError(error);
    }
    if (data) {
      setProductList([...productList, ...data]);
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
        <Button onClick={handleSubmit} title="Add" />
      </form>
    </div>
  );
}
