import css from "./shopping-item.module.css";

import { ReactComponent as CompletedButton } from "../assets/check_circle_black_24dp.svg";
import { ReactComponent as DeleteButton } from "../assets/delete_black_24dp.svg";
import { motion } from "framer-motion";

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
  return (
    <motion.ul
      className={product.completed ? css.itemAddedCompleted : css.itemAdded}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
            product.completed ? css.completedIcon : css.notCompletedIcon
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
    </motion.ul>
  );
}
