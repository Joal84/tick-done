import css from "./shopping-item.module.css";
import { ReactComponent as CompletedButton } from "../../assets/check_circle_black_24dp.svg";
import { ReactComponent as DeleteButton } from "../../assets/delete_black_24dp.svg";
import { CurrencyContext } from "../data-fecthing/settings-contex";
import { Reorder, useMotionValue, useDragControls } from "framer-motion";
import { useContext } from "react";
import { useRaisedShadow } from "../drag-and-drop/ise-raised-shadow";
import DragButton from "../drag-and-drop/DragButton";
import foodAndPantry from "../../assets/Food-and-Pantry.png";
import healthAndBeauty from "../../assets/Health-and-Beauty.png";
import household from "../../assets/Household.png";

export const images = {
  "Food-and-Pantry": foodAndPantry,
  "Health-and-Beauty": healthAndBeauty,
  Household: household,
};

export const lastPurchased = (item) => {
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
}) {
  const [currency, setCurrency] = useContext(CurrencyContext);
  const currencyValue = currency[0]?.currency || "€";
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  const handleKeyCompleted = (e, product, index) => {
    if (e.keyCode === 13) {
      handleComplete(product, index);
    }
  };

  const handleKeyDelete = (e, product, index) => {
    if (e.keyCode === 13) {
      handleDelete(product, index);
    }
  };
  const handleKeyQuantity = (e, product, index, operator) => {
    if (e.keyCode === 13) {
      handleQuantity(product, index, operator);
    }
  };

  return (
    <Reorder.Item
      value={product}
      key={product}
      className={css.container}
      dragListener={false}
      dragControls={dragControls}
      style={{ boxShadow, y, marginTop: "24px" }}
    >
      <DragButton dragControls={dragControls} />
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
              src={images[product.products_list?.category]}
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
                onKeyDown={(e) => handleKeyQuantity(e, product, index, "-")}
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
                onKeyDown={(e) => handleKeyQuantity(e, product, index, "+")}
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
          onKeyDown={(e) => handleKeyDelete(e, product, index)}
          className={css.deleteButton}
          onClick={() => handleDelete(product)}
        />
      </div>
    </Reorder.Item>
  );
}
