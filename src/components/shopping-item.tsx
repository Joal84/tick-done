import css from "./shopping-item.module.css";

import { ReactComponent as CompletedButton } from "../assets/check_circle_black_24dp.svg";
import { ReactComponent as DeleteButton } from "../assets/delete_black_24dp.svg";
import { CurrencyContext } from "../components/Data-fecthing/settings-contex";
import { motion } from "framer-motion";
import { useContext } from "react";

export const lastPurchased = (item: any) => {
  const currentDate = new Date();
  if (item === null) {
    return "Never";
  }

  const timeDifference = currentDate.getTime() - new Date(item).getTime();
  const differenceInDays = timeDifference / (1000 * 3600 * 24);

  if (differenceInDays.toFixed(0) === "0") {
    return "Today";
  }
  if (differenceInDays.toFixed(0) === "1") {
    return "Yesterday";
  }

  return differenceInDays.toFixed(0) + " Days";
};

export default function ShoppingItem({
  product,
  index,
  handleComplete,
  handleDelete,
  handleQuantity,
  itemPrice,
}: any) {
  const [currency, setCurrency]: any = useContext(CurrencyContext);
  const currencyValue = currency[0]?.currency || "€";

  const handleKeyCompleted = (e, product, index) => {
    if (e.keyCode === 13) {
      handleComplete(product, index);
    }
  };
  return (
    <div className={css.container}>
      <div
        className={product.completed ? css.itemAddedCompleted : css.itemAdded}
      >
        <div className={css.divider}>
          <h2 className={css.title}>Name</h2>
          <span className={css.infoSpan}>{product?.products_list?.name}</span>
        </div>
        <div className={css.imageContainer}>
          {product.products_list?.category !== "None" ? (
            <img
              id={product.completed ? css.imageCompleted : ""}
              className={css.image}
              src={`src/assets/${product.products_list?.category}.png`}
              alt={`${product.products_list?.category} image category`}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={css.divider}
          id={
            product.completed
              ? css.completed
              : css[product.products_list?.category]
          }
        >
          <h2 className={css.title}>Quantity</h2>
          <div className={css.quantityCont}>
            {product.completed ? (
              <div />
            ) : (
              <div
                tabIndex={0}
                className={css.quantityButton}
                onClick={() => handleQuantity(product, index, "-")}
              >
                -
              </div>
            )}
            <div className={css.quantity}>{product.quantity}</div>

            {product.completed ? (
              <div />
            ) : (
              <div
                tabIndex={0}
                className={css.quantityButton}
                onClick={() => handleQuantity(product, index, "+")}
              >
                +
              </div>
            )}
          </div>
        </div>
        <div
          className={css.divider}
          id={
            product.completed
              ? css.completed
              : css[product.products_list?.category]
          }
        >
          <h2 className={css.title}>Price</h2>
          <span className={css.infoSpan}>
            {itemPrice(product)}
            {" " + currencyValue}
          </span>
        </div>
        <div
          className={css.divider}
          id={
            product.completed
              ? css.completed
              : css[product.products_list?.category]
          }
        >
          <h2 className={css.title}>Last Purchased</h2>
          <span className={css.infoSpan}>
            {lastPurchased(product.products_list?.last_purchased)}
          </span>
        </div>
      </div>
      <div className={css.actionButtons}>
        <CompletedButton
          tabIndex={0}
          onKeyDown={(e) => handleKeyCompleted(e, product, index)}
          className={
            product.completed ? css.completedIcon : css.notCompletedIcon
          }
          onClick={() => handleComplete(product, index)}
        />

        <DeleteButton
          tabIndex={0}
          className={css.deleteButton}
          onClick={() => handleDelete(product)}
        />
      </div>
    </div>
  );
}
