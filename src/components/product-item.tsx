import { useContext } from "react";
import css from "./product-item.module.css";
import { lastPurchased } from "../components/shopping-item";
import { ReactComponent as DeleteButton } from "../assets/delete_black_24dp.svg";
import { ReactComponent as EditButton } from "../assets/edit_black_24dp.svg";
import { currencyContext } from "../App";
export default function ProductItem({
  product,
  handleEdit,
  handleDelete,
}: any) {
  const [currency, setCurrency]: any = useContext(currencyContext);

  const currencyValue = currency[0]?.currency || "€";
  return (
    <>
      <div key={product.id} className={css.card}>
        <div className={css.titleAndImageContainer} id={css[product.category]}>
          <div className={css.titleContainer}>
            <h2 className={css.name}>{product.name}</h2>
            <h3 className={css.category}>{product.category}</h3>
          </div>
          {product.category !== "None" ? (
            <img
              className={css.image}
              src={`src/assets/${product.category}.png`}
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
          <span className={css.title}> times</span>
          <div className={css.buttonsContainer}>
            <span className={css.price}>
              {product.avg_price?.toFixed(2)}{" "}
              <span className={css.currency}> {" " + currencyValue}</span>
            </span>
            <div>
              <EditButton
                className={css.editButton}
                onClick={() => handleEdit(product)}
              />
              <DeleteButton
                className={css.deleteButton}
                onClick={() => handleDelete(product)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
