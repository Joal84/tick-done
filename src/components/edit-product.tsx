import { useEffect, useState, FormEvent } from "react";
import css from "./edit-product.module.css";
import { supabase } from "../utils/supabase";
import Button from "../components/Button/button";
import Title from "./title";
import CategoryFilter from "./category-filter";

export default function EditProduct(props: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [avgPrice, setAvgPrice] = useState("");

  if (description === null) {
    setDescription("");
  }
  const macChar = 100 - description?.length;

  const editOptions = [
    { value: "None", label: "None" },
    { value: "Food-and-Pantry", label: "Food-and-Pantry" },
    { value: "Health-and-Beauty", label: "Health-and-Beauty" },
    { value: "Household", label: "Household" },
  ];
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
    }
    props.onClose(false);
  };
  return (
    <div>
      <Title>Edit Product</Title>
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <div className={css.nameAndCategoryContainer}>
          <div>
            <label className={css.label} htmlFor="product-name">
              Product Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="product-name"
              className={css.field}
              type="text"
              name="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className={css.categoryContainer}>
            <label className={css.label} htmlFor="category">
              Category
            </label>
            <CategoryFilter
              value={editOptions.find((option) => {
                return option.value === category;
              })}
              id="category"
              name="category"
              selector={(e) => setCategory(e.value)}
              placeholder="None"
              options={editOptions}
            />
          </div>
        </div>

        <div className={css.priceContainer}>
          <label className={css.label} htmlFor="average-price">
            Price<span style={{ color: "red" }}> *</span>
          </label>
          <input
            id="average-price"
            min="0"
            className={css.field}
            type="number"
            name="average-price"
            value={avgPrice}
            onChange={(e) => setAvgPrice(e.target.value)}
            required
          ></input>
        </div>
        <div className={css.descriptionContainer}>
          <label className={css.label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={css.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            maxLength={100}
          ></textarea>
          <p className={css.maxChar}>{`${macChar} / 100 Characters`}</p>
        </div>
        <Button onClick={handleSubmit}>Save</Button>
      </form>
    </div>
  );
}
