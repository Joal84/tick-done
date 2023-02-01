import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import AddToShopplist from "../components/add-to-shopplist";
import shoppingItem from "./display-shopplist.module.css";
import Button from "../components/button";
import { userDataContext } from "../utils/userAuth";

export default function DisplayShopplist({ setAddedItem, addedItem }: any) {
  const userAuth: any = useContext(userDataContext);
  const [fetchError, setFetchError] = useState("");
  const [list, setList]: any = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase.from("shopping_lists").select();

      if (error) {
        setFetchError("Could not fetch the list");
      }
      if (data) {
        setList(data);
        setFetchError("");
      }
    };
    fetchList();
  }, [addedItem]);

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
      setAddedItem(data);
    }
  };

  console.log(list.reverse());

  return (
    <div className={shoppingItem.background}>
      {Object.keys(userAuth).length !== 0 && (
        <AddToShopplist setAddedItem={setAddedItem} />
      )}
      <div className={shoppingItem.container}>
        {list.length === 0 || Object.keys(userAuth).length === 0 ? (
          <img
            className={shoppingItem.shoppingCart}
            alt="Shopping Cart image"
            src="src/assets/shopping-cart.png"
          ></img>
        ) : (
          list
            .map((product: any) => (
              <div key={Math.random()} className={shoppingItem.itemAdded}>
                <p key={product.id}>{product.product_name}</p>
                <p key={product.quantity}>{product.quantity}</p>
                <p key={product.name}>{product.completed.toString()}</p>
                <Button title="Delete" onClick={() => handleDelete(product)} />
              </div>
            ))
            .reverse()
        )}
      </div>
    </div>
  );
}
