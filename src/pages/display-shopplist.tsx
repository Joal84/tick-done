import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import AddToShopplist from "../components/add-to-shopplist";
import css from "./display-shopplist.module.css";
import Button from "../components/button";
import { userDataContext } from "../utils/userAuth";
import { ReactComponent as CompletedButton } from "../assets/check_circle_black_24dp.svg";
import { ReactComponent as DeleteButton } from "../assets/delete_black_24dp.svg";

export default function DisplayShopplist({ setAddedItem, addedItem }: any) {
  const userAuth: any = useContext(userDataContext);
  const [fetchError, setFetchError] = useState("");
  const [quantity, setQuantity] = useState(1);
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

  const handleQuantity = (item: any, index: number) => {
    const newList = [...list];
    // newList[index] = {
    //   ...newList[index],
    //   quantity: quantity,
    // };

    setList(newList);
    const updateQuantity = async (completedStatus: any) => {
      const { data, error }: any = await supabase
        .from("shopping_lists")
        .update({ quantity: completedStatus })
        .eq("id", item.id);

      if (error) {
        setFetchError("Could not complete the item");
      }
      if (data) {
      }
    };
    updateQuantity(newList[index].quantity);
  };

  const handleComplete = (item: any, index: number) => {
    const newList = [...list];
    newList[index] = {
      ...newList[index],
      completed: !newList[index].completed,
    };

    setList(newList);
    const updateCompleted = async (completedStatus: any) => {
      const { data, error }: any = await supabase
        .from("shopping_lists")
        .update({ completed: completedStatus })
        .eq("id", item.id);

      if (error) {
        setFetchError("Could not complete the item");
      }
      if (data) {
      }
    };
    updateCompleted(!list[index].completed);
  };

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

  return (
    <div className={css.background}>
      {Object.keys(userAuth).length !== 0 && (
        <AddToShopplist setAddedItem={setAddedItem} />
      )}
      <div className={css.container}>
        {list.length === 0 || Object.keys(userAuth).length === 0 ? (
          <img
            className={css.shoppingCart}
            alt="Shopping Cart image"
            src="src/assets/shopping-cart.png"
          ></img>
        ) : (
          list
            .map((product: any, index: number) => {
              return (
                <div key={Math.random()} className={css.itemAdded}>
                  <div className={css.divider}>
                    <h2>Name</h2>
                    <p key={product.id}>{product.product_name}</p>
                  </div>
                  <div className={css.divider}>
                    <h2>Quantity</h2>
                    <div className={css.quantityCont}>
                      <div>+</div>
                      <p>{product.quantity}</p>
                      <div>-</div>
                    </div>
                  </div>
                  <div className={css.divider}>
                    <CompletedButton
                      className={
                        product.completed
                          ? css.completedIcon
                          : css.notCompletedIcon
                      }
                      onClick={() => handleComplete(product, index)}
                    />
                  </div>
                  <div className={css.divider}>
                    <DeleteButton
                      className={css.deleteButton}
                      onClick={() => handleDelete(product)}
                    />
                  </div>
                </div>
              );
            })
            .reverse()
        )}
      </div>
    </div>
  );
}
