import css from "./add-to-shopplist.module.css";
import { supabase } from "../utils/supabase";
import { FormEvent, useEffect, useRef, useState } from "react";
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

  // Capture products from input field
  const handleChange = async (e: any) => {
    setProductName(e.detail.tagify.value.map((item: any) => item.value));
  };

  //Clear Add field
  const clearAll = (tagifyRef: any) => {
    tagifyRef.current && tagifyRef.current.removeAllTags();
  };

  // Filter input for products that are not in the product list yet
  const newProductListValue = productName.filter(
    (o1: any) =>
      !productList.some((o2: any) => o1.toLowerCase() === o2.name.toLowerCase())
  );

  // Filter input for peoducts that are in the product List already
  const findNewProdInProductList = productList.filter((o1: any) =>
    productName.some((o2: any) => o1.name.toLowerCase() === o2.toLowerCase())
  );

  // Filter for products that are in the product list but not in the shopping list
  const uniqueItemInTheList = findNewProdInProductList.filter(
    (item1: any) =>
      !list.some(
        (item2: any) => item1.name.toLowerCase() === item2.name.toLowerCase()
      )
  );

  const handleSubmit = () => {
    if (!productName) {
      setFormError("Please fill in all the fields");
      return;
    }

    // Adding products into shopping list that already exists in Product list
    if (findNewProdInProductList.length > 0) {
      uniqueItemInTheList.map(async (item: any) => {
        const { data, error }: any = await supabase
          .from("shopping_lists")
          .insert([{ name: item.name, product_id: item.id, user_id }])
          .select();

        if (error) {
        }
        if (data) {
          setList([...list, ...data]);
          setNewItem(data);
        }
      });
    }
    // Adding products into product list that do not exists in Product list
    newProductListValue.map(async (item) => {
      const { data: prod_data, error: prod_error }: any = await supabase
        .from("products_list")
        .insert([{ name: item, category: "None", avg_price: 0, user_id }])
        .select();

      if (prod_data) {
        setProductList([...productList, ...prod_data]);
      }

      // Check if new item also does not exist in the shopping list
      const uniqueItemInTheList = prod_data.filter(
        (item1: any) =>
          !list.some(
            (item2: any) =>
              item1.name.toLowerCase() === item2.name.toLowerCase()
          )
      );

      // Add new and unique item in the shopping list
      uniqueItemInTheList.map(async (newItem: any) => {
        const { data: shopping_data, error: shopping_error } = await supabase
          .from("shopping_lists")
          .insert([
            {
              name: newItem.name,
              product_id: newItem.id,
              user_id,
            },
          ])
          .select();

        if (shopping_error) {
          setFormError(prod_error);
        }
        if (shopping_data) {
          setList([...list, ...shopping_data]);
          setNewItem(shopping_data);
        }
      });
    });

    clearAll(tagifyRef1);
  };
  return (
    <div className={css.container}>
      <TagField handleChange={handleChange} tagifyRef={tagifyRef1} />
      <Button title="Add" onClick={handleSubmit} />
    </div>
  );
}
