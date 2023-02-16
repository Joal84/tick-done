import { useState, useEffect, useContext, useMemo } from "react";
import { supabase } from "../utils/supabase";
import AddToShopplist from "../components/add-to-shopplist";
import css from "./display-shopplist.module.css";
import { ShoppingListContext } from "../App";
import { userDataContext } from "../utils/userAuth";
import { ReactComponent as CompletedButton } from "../assets/check_circle_black_24dp.svg";
import { ReactComponent as DeleteButton } from "../assets/delete_black_24dp.svg";
import { ProductListContext } from "../App";
import { lastPurchased } from "../handlers/last-purchased";

export default function DisplayShopplist() {
  const userAuth: any = useContext(userDataContext);
  const [fetchError, setFetchError] = useState("");
  const [deletedItem, setDeletedItem] = useState([{}]);
  const [newItem, setNewItem] = useState([{}]);
  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList, setProductList]: any = useContext(ProductListContext);

  useEffect(() => {
    const fetchLProdList = async () => {
      const { data, error }: any = await supabase
        .from("products_list")
        .select();

      if (error) {
        setFetchError("Could not fetch the productList");
      }
      if (data) {
        setProductList(data);
        setFetchError("");
      }
    };
    fetchLProdList();

    const fetchList = async () => {
      const { data, error } = await supabase
        .from("shopping_lists")
        .select("*, products_list(avg_price, last_purchased, total_bought)");

      if (error) {
        setFetchError("Could not fetch the list");
      }

      if (data) {
        setList(
          data.map((item) => {
            return (item = {
              ...item,
              totalPrice: (
                item.quantity * (item.products_list?.avg_price || 0)
              ).toFixed(2),
            });
          })
        );
        setFetchError("");
      }
    };
    fetchList();
  }, [deletedItem, newItem]);
  console.log(list);

  const totalPrice = list.reduce((total, itemPrice) => {
    return (total += +itemPrice.totalPrice);
  }, 0);

  const handleQuantity = (item: any, index: number, operator: string) => {
    const newList = [...list];
    if (operator === "+")
      newList[index] = {
        ...newList[index],

        quantity: newList[index].quantity + 1,
        totalPrice: (
          (newList[index].quantity + 1) *
          (newList[index].products_list?.avg_price || 0)
        ).toFixed(2),
      };
    if (operator === "-" && newList[index].quantity > 1)
      newList[index] = {
        ...newList[index],
        quantity: newList[index].quantity - 1,
        totalPrice: (
          (newList[index].quantity - 1) *
          (newList[index].products_list?.avg_price || 0)
        ).toFixed(2),
      };

    setList(newList);
    const updateQuantity = async (quantityToUpdate: any) => {
      const { data, error }: any = await supabase
        .from("shopping_lists")
        .update({ quantity: quantityToUpdate })
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
      last_purchased: newList[index].completed && new Date(),
    };

    setList(newList);

    const updateCompleted = async (completedStatus: any) => {
      const { data, error }: any = await supabase
        .from("shopping_lists")
        .update({
          completed: completedStatus,
        })
        .eq("id", item.id);

      if (error) {
        setFetchError("Could not complete the item");
      }
      if (data) {
      }
    };

    if (newList[index].completed) {
      const updateLastPurchased = async () => {
        const { data, error }: any = await supabase
          .from("products_list")
          .update({
            last_purchased: new Date(),
            total_bought: item.products_list?.total_bought + item.quantity,
          })
          .eq("id", item.product_id)
          .select();

        if (error) {
          setFetchError(error);
        }
        if (data) {
          setNewItem(data);
        }
      };
      updateLastPurchased();
    }
    updateCompleted(!list[index].completed);
  };

  const itemPrice = (item: any) => {
    return item.totalPrice;
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
      setDeletedItem(data);
    }
  };

  return (
    <div className={css.background}>
      {Object.keys(userAuth).length !== 0 && (
        <AddToShopplist
          setNewItem={setNewItem}
          handleQuantity={handleQuantity}
        />
      )}
      <div className={css.container}>
        {list.length === 0 || Object.keys(userAuth).length === 0 ? (
          <img
            className={css.shoppingCart}
            alt="Shopping Cart image"
            src="src/assets/shopping-cart.png"
          ></img>
        ) : (
          list.map((product: any, index: number) => {
            return (
              <div
                key={Math.random()}
                className={
                  product.completed ? css.itemAddedCompleted : css.itemAdded
                }
              >
                <div className={css.divider}>
                  <h2 className={css.title}>Name</h2>
                  <span className={css.infoSpan}>{product.name}</span>
                </div>
                <div className={css.divider}>
                  <h2 className={css.title}>Quantity</h2>
                  <div className={css.quantityCont}>
                    {product.completed ? (
                      <div></div>
                    ) : (
                      <div
                        className={css.quantityButton}
                        onClick={() => handleQuantity(product, index, "-")}
                      >
                        -
                      </div>
                    )}
                    <div className={css.quantity}>{product.quantity}</div>

                    {product.completed ? (
                      <div></div>
                    ) : (
                      <div
                        className={css.quantityButton}
                        onClick={() => handleQuantity(product, index, "+")}
                      >
                        +
                      </div>
                    )}
                  </div>
                </div>
                <div className={css.divider}>
                  <h2 className={css.title}>Price</h2>
                  <span className={css.infoSpan}>{itemPrice(product)}€</span>
                </div>
                <div className={css.divider}>
                  <h2 className={css.title}>Last Purchased</h2>
                  <span className={css.infoSpan}>
                    {lastPurchased(product.products_list?.last_purchased)}
                  </span>
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
        )}
      </div>
      <div className={css.totalPriceCont}>
        Total Price:{" "}
        <span className={css.totalPrice}>{totalPrice.toFixed(2)}</span> €
      </div>
    </div>
  );
}
