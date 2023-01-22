import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { newAddedProduct } from "./add-to-shopplist";
import shoppingItem from "./display-shopplist.module.css";
import Button from "./button";

export default function DisplayShopplist({ setAddedProduct }: any) {
  const [fetchError, setFetchError] = useState("");
  const [list, setList]: any = useState([]);
  const updatedList = useContext(newAddedProduct);

  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase.from("shopping_lists").select();

      if (error) {
        setFetchError("Could not fetch the list");
        setList({});
      }
      if (data) {
        setList(data);
        setFetchError("");
      }
    };
    fetchList();
  }, [updatedList]);

  const handleDelete = async (item: any) => {
    const { data, error } = await supabase
      .from("shopping_lists")
      .delete()
      .eq("id", item.id)
      .select();

    if (error) {
      setFetchError("Could not delete the item");
      setList({});
    }
    if (data) {
      setAddedProduct(data);
    }
  };

  return (
    <div className={shoppingItem.background}>
      <div className={shoppingItem.container}>
        {list.length === 0 ? (
          <img
            className={shoppingItem.shoppingCart}
            alt="Shopping Cart image"
            src="src/assets/shopping-cart.png"
          ></img>
        ) : (
          list.map((product: any) => (
            <div className={shoppingItem.itemAdded}>
              <p key={product.id}>{product.product_name}</p>
              <p>{product.quantity}</p>
              <p>{product.completed.toString()}</p>
              <Button title="Delete" onClick={() => handleDelete(product)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
