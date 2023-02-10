import css from "./add-to-shopplist.module.css";
import { supabase } from "../utils/supabase";
import { FormEvent, useRef, useState } from "react";
import { useContext } from "react";
import { userDataContext } from "../utils/userAuth";
import Tags from "@yaireo/tagify/dist/react.tagify";

import { ShoppingListContext } from "../App";
import { ProductListContext } from "../App";
import TagField from "./tagfield";
import Button from "./button";

export default function AddToShopplist({ setNewItem, handleQuantity }: any) {
  const tagifyRef1: any = useRef();

  const [formError, setFormError] = useState("");
  const [fetchError, setFetchError] = useState("");

  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList, setProductList]: any = useContext(ProductListContext);
  const userAuth: any = useContext(userDataContext);

  const [productName, setProductName] = useState([]);

  const user_id = userAuth.id;

  // Adding new item into the list
  const handleChange = async (e: any) => {
    setProductName(e.detail.tagify.value.map((item: any) => item.value));
  };

  //Clear Add field
  const clearAll = (tagifyRef: any) => {
    tagifyRef.current && tagifyRef.current.removeAllTags();
  };

  // Filter input for unique values in the list
  const uniqueListValue = productName.filter(
    (o1: any) =>
      !list.some(
        (o2: any) => o1.toLowerCase() === o2.product_name.toLowerCase()
      )
  );

  // Filter input for products that are not in the product list yet
  const uniqueProductListValue = productName.filter(
    (o1: any) =>
      !productList.some((o2: any) => o1.toLowerCase() === o2.name.toLowerCase())
  );

  const handleSubmit = () => {
    if (!productName) {
      setFormError("Please fill in all the fields");
      return;
    }

    uniqueListValue.map(async (item) => {
      const { data, error }: any = await supabase
        .from("shopping_lists")
        .insert([{ product_name: item, user_id }])
        .select();

      if (error) {
      }
      if (data) {
        setList([...list, ...data]);
        setNewItem(data);
      }
    });

    if (uniqueProductListValue.length > 0) {
      uniqueProductListValue.map(async (item) => {
        const { data, error }: any = await supabase
          .from("products_list")
          .insert([{ name: item, user_id }])
          .select();

        if (error) {
          setFormError(error);
        }
        if (data) {
          setProductList([...productList, ...data]);
        }
      });
    }

    clearAll(tagifyRef1);
  };

  return (
    <div className={css.container}>
      <TagField handleChange={handleChange} tagifyRef={tagifyRef1} />
      <Button title="Add" onClick={handleSubmit} />
    </div>
  );
}
