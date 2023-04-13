import css from "./display-shopplist.module.css";
import { useContext } from "react";
import { supabase } from "../../utils/supabase";
import { ShoppingListContext } from "../../components/data-fecthing/shoppinglist-contex";
import { userDataContext } from "../../components/data-fecthing/userAuth";
import { CurrencyContext } from "../../components/data-fecthing/settings-contex";
import { ProductListContext } from "../../components/data-fecthing/productlist-context";
import AddToShopplist from "../../components/shopping-list/add-to-shopplist";
import ShoppingItem from "../../components/shopping-list/shopping-item";
import { Reorder } from "framer-motion";

export default function DisplayShopplist({ nav, footer }: any) {
  const [userAuth, setUser]: any = useContext(userDataContext);
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [currency]: any = useContext(CurrencyContext);
  const [list, setList]: any = useContext(ShoppingListContext);

  const totalPriceCalculator = (shoppingList: any) => {
    return shoppingList.reduce((total: any, itemPrice: any) => {
      return (total += +itemPrice.totalPrice);
    }, 0);
  };

  const totalCompleteCalculator = () => {
    return list.filter((item: any) => item.completed === true).length;
  };

  const handleQuantity = (item: any, index: number, operator: string) => {
    const newList = [...list];
    if (operator === "+")
      newList[index] = {
        ...newList[index],

        quantity: newList[index].quantity + 1,
        totalPrice: (
          (newList[index].quantity + 1) *
          (newList[index].products_list?.avg_price || 0.0)
        ).toFixed(2),
      };
    if (operator === "-" && newList[index].quantity > 1)
      newList[index] = {
        ...newList[index],
        quantity: newList[index].quantity - 1,
        totalPrice: (
          (newList[index].quantity - 1) *
          (newList[index].products_list?.avg_price || 0.0)
        ).toFixed(2),
      };

    setList(newList);

    const updateQuantity = async (quantityToUpdate: any) => {
      const { data, error }: any = await supabase
        .from("shopping_lists")
        .update({ quantity: quantityToUpdate })
        .eq("id", item.id);
    };
    updateQuantity(newList[index].quantity);
  };

  const handleComplete = (item: any, index: number) => {
    const newList = [...list];
    newList[index] = {
      ...newList[index],
      completed: !newList[index].completed,
    };
    if (newList[index].completed) {
      newList[index] = {
        ...newList[index],
        products_list: {
          ...newList[index].products_list,
          last_purchased: new Date(),
          category: item.products_list.category,
        },
      };
    }

    setList(newList);
    const updateCompleted = async (completedStatus: any) => {
      const { data, error }: any = await supabase
        .from("shopping_lists")
        .update({
          completed: completedStatus,
        })
        .eq("product_id", item.product_id);
    };

    if (newList[index].completed) {
      const updateLastPurchased = async () => {
        const { data, error }: any = await supabase
          .from("products_list")
          .update({
            last_purchased: new Date(),
            total_bought: item.products_list?.total_bought + item.quantity,
          })
          .eq("id", item.product_id);

        const newProdList = [...productList];
        const currentProductIndex = newProdList.findIndex(
          (prodItem) => prodItem.id === item.product_id
        );
        const updateProduct = {
          ...productList[currentProductIndex],
          last_purchased: new Date(),
          total_bought:
            productList[currentProductIndex].total_bought + item.quantity,
        };
        newProdList[currentProductIndex] = updateProduct;
        setProductList(newProdList);
      };
      updateLastPurchased();
    }
    updateCompleted(newList[index].completed);
  };

  const itemPrice = (item: any) => {
    return item.totalPrice;
  };

  const handleDelete = async (item: any) => {
    const newList = list.filter((itemToDelete: any) => {
      return itemToDelete.product_id !== item.product_id;
    });
    const { data, error } = await supabase
      .from("shopping_lists")
      .delete()
      .eq("product_id", item.product_id);

    setList(newList);
  };
  const reOrder = (value: any) => {
    setList(
      value.map((item: any, index: number) => {
        return { ...item, order: index };
      })
    );
    value.map(async (item: any, index: number) => {
      const { data, error } = await supabase
        .from("shopping_lists")
        .update([
          {
            order: index,
          },
        ])
        .eq("product_id", item.product_id);
    });
  };

  return (
    <div className={css.wrapperContainer}>
      {nav}
      <div className={css.fullPage}>
        {Object.keys(userAuth).length !== 0 && <AddToShopplist />}
        <div className={css.container}>
          {list.length === 0 || Object.keys(userAuth).length === 0 ? (
            <div className={css.emptyListContainer}>
              <img
                className={css.emptyListImage}
                alt="Shopping Cart image"
                src="src/assets/empty_shopplist.webp"
              ></img>
              <p className={css.emptyCartMessage}>Your shopplist is empty.</p>
            </div>
          ) : (
            <Reorder.Group axis="y" values={list} onReorder={reOrder}>
              {list.map((product: any, index: number) => {
                return (
                  <ShoppingItem
                    key={product.name}
                    product={product}
                    index={index}
                    itemPrice={itemPrice}
                    handleDelete={handleDelete}
                    handleQuantity={handleQuantity}
                    handleComplete={handleComplete}
                  />
                );
              })}
            </Reorder.Group>
          )}
        </div>
        {Object.keys(userAuth).length !== 0 && (
          <div className={css.completeCounter}>
            <span>Completed </span>
            <span className={css.counter}>
              {totalCompleteCalculator()} / {list.length}
            </span>
            <div className={css.divider}></div>
            <div className={css.totalPriceCont}>
              Total Price:{" "}
              <span className={css.totalPrice}>
                {totalPriceCalculator(list)?.toFixed(2)}
              </span>
              <span style={{ fontSize: "2rem", fontWeight: "300" }}>
                {" "}
                {currency[0]?.currency || "€"}
              </span>
            </div>
          </div>
        )}
      </div>
      {footer}
    </div>
  );
}
