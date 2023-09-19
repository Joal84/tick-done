import css from "./add-to-product.module.css";
import { supabase } from "../../utils/supabase";
import { useState, useContext } from "react";
import { userDataContext } from "../data-fecthing/userAuth";
import { ProductListContext } from "../data-fecthing/productlist-context";
import Button from "../button/button";
import Title from "../title/title";
import SelectComponent from "../select-component/select-component";

export default function AddToProduct({ onClose }) {
  const [productList, setProductList] = useContext(ProductListContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [description, setDescription] = useState("");
  const [avgPrice, setAvgPrice] = useState(0);
  const [formError, setFormError] = useState("");

  const [userAuth, setUser] = useContext(userDataContext);
  const user_id = userAuth?.user.id;

  const macChar = 100 - description.length;

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!name || !category) {
      setFormError("Please fill in all the fields");
      return;
    }
    if (
      productList?.some(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return;
    }

    const { data, error } = await supabase
      .from("products_list")
      .insert([{ name, category, description, avg_price: avgPrice, user_id }])
      .select();

    if (error) {
      setFormError(error);
    }
    if (data) {
      setProductList([...data, ...productList]);
    }
    onClose(false);
  };
  const addOptions = [
    { value: "None", label: "None" },
    { value: "Food-and-Pantry", label: "Food-and-Pantry" },
    { value: "Health-and-Beauty", label: "Health-and-Beauty" },
    { value: "Household", label: "Household" },
  ];

  return (
    <div>
      <Title>Add a New Product</Title>
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <div className={css.nameAndCategoryContainer}>
          <div>
            <label className={css.label} htmlFor="product-name">
              Product Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="product-name"
              className={css.fieldName}
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
            <SelectComponent
              id="category"
              name="category"
              selector={(e) => setCategory(e.value)}
              placeholder="None"
              options={addOptions}
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
