import css from "./product-item.module.css";
import { useContext } from "react";
import { CurrencyContext } from "../data-fecthing/settings-contex";
import { lastPurchased } from "../shopping-list/shopping-item";
import { ReactComponent as DeleteButton } from "../../assets/delete_black_24dp.svg";
import { ReactComponent as EditButton } from "../../assets/edit_black_24dp.svg";
import { motion } from "framer-motion";
import { images } from "../shopping-list/shopping-item";

export default function ProductItem({
  product,
  handleEdit,
  handleDelete,
}: any) {
  const [currency, setCurrency]: any = useContext(CurrencyContext);
  const currencyValue = currency[0]?.currency ?? "€";

  const handleKeyDelete = (e: any, product: any) => {
    if (e.keyCode === 13) {
      handleDelete(product);
    }
  };

  const handleKeyEdit = (e: any, product: any) => {
    if (e.keyCode === 13) {
      handleEdit(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      key={product.name}
      className={css.card}
    >
      <div className={css.titleAndImageContainer} id={css[product.category]}>
        <div className={css.titleContainer}>
          <h2 className={css.name}>{product.name}</h2>
          <h3 className={css.category}>{product.category}</h3>
        </div>
        {product.category !== "None" ? (
          <img
            className={css.image}
            src={images[product.category]}
            alt={`${product.category} image`}
          />
        ) : (
          <></>
        )}
      </div>
      <div className={css.divider} id={css[product.category]}>
        <h2 className={css.title}>Last Purchased</h2>
        <p className={css.lastPurchased}>
          {lastPurchased(product.last_purchased)}
        </p>
      </div>
      <dl className={css.description} id={css[product.category]}>
        <dd>{product.description}</dd>
      </dl>
      <div className={css.priceButtonsContainer}>
        <span className={css.title}>Bought </span>
        <span className={css.bought}>{product.total_bought}</span>
        <span className={css.title}>
          {" "}
          {product.total_bought === 1 ? "time" : "times"}
        </span>
        <div className={css.buttonsContainer}>
          <span className={css.price}>
            {product?.avg_price}
            <span className={css.currency}> {" " + currencyValue}</span>
          </span>
          <div>
            <EditButton
              tabIndex={0}
              onKeyDown={(e) => handleKeyEdit(e, product)}
              className={css.editButton}
              onClick={() => handleEdit(product)}
            />
            <DeleteButton
              onKeyDown={(e) => handleKeyDelete(e, product)}
              tabIndex={0}
              className={css.deleteButton}
              onClick={() => handleDelete(product)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
