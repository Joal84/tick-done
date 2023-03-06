import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import AddToShopplist from "../components/add-to-shopplist";
import css from "./display-shopplist.module.css";
import { ShoppingListContext } from "../App";
import { userDataContext } from "../utils/userAuth";
import { ProductListContext } from "../App";
import ShoppingItem from "../components/shopping-item";
import Background from "../components/Background/background";
import { ColorRing } from "react-loader-spinner";

export default function DisplayShopplist({ footer }: any) {
  const userAuth: any = useContext(userDataContext);
  const [fetchError, setFetchError] = useState("");
  const [deletedItem, setDeletedItem] = useState([{}]);
  const [newItem, setNewItem] = useState([{}]);
  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLProdList = async () => {
      setIsLoading(true);
      const { data, error }: any = await supabase
        .from("products_list")
        .select();

      if (error) {
        setFetchError("Could not fetch the productList");
        setIsLoading(false);
      }
      if (data) {
        setProductList(data);
        setIsLoading(false);
        setFetchError("");
      }
    };
    fetchLProdList();

    const fetchList = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("shopping_lists")
        .select("*, products_list(avg_price, last_purchased, total_bought)");

      if (error) {
        setFetchError("Could not fetch the list");
        setIsLoading(false);
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
        setIsLoading(false);
        setFetchError("");
      }
    };
    fetchList();
  }, [deletedItem, newItem]);

  const totalPrice = list.reduce((total: any, itemPrice: any) => {
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
          // setNewItem(data);
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
  console.log(list);
  return (
    <>
      <Background>
        {Object.keys(userAuth).length !== 0 && (
          <AddToShopplist setNewItem={setNewItem} />
        )}
        {isLoading && (
          <div className={css.loading}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
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
                <ShoppingItem
                  key={product.id}
                  product={product}
                  index={index}
                  itemPrice={itemPrice}
                  handleDelete={handleDelete}
                  handleQuantity={handleQuantity}
                  handleComplete={handleComplete}
                />
              );
            })
          )}
        </div>
        {Object.keys(userAuth).length !== 0 && (
          <div className={css.totalPriceCont}>
            Total Price:{" "}
            <span className={css.totalPrice}>{totalPrice.toFixed(2)}</span> €
          </div>
        )}
      </Background>
      {footer}
    </>
  );
}
