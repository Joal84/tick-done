import css from "./add-to-shopplist.module.css";
import { supabase } from "../utils/supabase";
import { FormEvent, useState } from "react";
import { useContext, useEffect, createContext } from "react";
import { userDataContext } from "../utils/userAuth";
import { ReactComponent as AddButton } from "../assets/plus-icon.svg";
import { ShoppingListContext } from "../App";
import { ProductListContext } from "../App";
import Button from "./button";

export const newAddedItem = createContext({});

export default function AddToShopplist() {
  const [productName, setProduct] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [formError, setFormError] = useState("");
  const [fetchProdError, setFetchProdError] = useState("");

  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList]: any = useContext(ProductListContext);
  const userAuth: any = useContext(userDataContext);

  const user_id = userAuth.id;

  const clearField = () => {
    setProduct("");
  };

  // Adding new item into the list

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName) {
      setFormError("Please fill in all the fields");
      return;
    }

    const { data, error }: any = await supabase
      .from("shopping_lists")
      .insert([{ product_name: productName, user_id }])
      .select();

    if (error) {
      setFormError(error);
    }
    if (data) {
      setList([...list, ...data]);
    }
    clearField();
  };

  return (
    <div className={css.container}>
      <AddButton
        className={isOpen ? css.svgClose : css.svgAdd}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <label className={css.title} htmlFor="product">
            Product Name:
          </label>

          <input
            type="text"
            list="product"
            className={css.field}
            name="product"
            value={productName}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
          <datalist id="product">
            {productList.map((product: any) => {
              return (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              );
            })}
          </datalist>

          <Button title="Add" onClick={handleSubmit} />
        </form>
      ) : null}
      {formError && <p>{formError}</p>}
    </div>
  );
}
