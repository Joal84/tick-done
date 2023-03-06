import css from "./product-item.module.css";
import { lastPurchased } from "../components/shopping-item";
import { ReactComponent as DeleteButton } from "../assets/delete_black_24dp.svg";
import { ReactComponent as EditButton } from "../assets/edit_black_24dp.svg";

export default function ProductItem({
  product,
  handleEdit,
  handleDelete,
}: any) {
  return (
    <>
      <div key={product.id} className={css.card}>
        <div className={css.titleContainer}>
          <h2 className={css.name}>{product.name}</h2>
          <h3 className={css.category}>{product.category}</h3>
        </div>
        <dl>
          <dd>{product.description}</dd>
        </dl>
        <div>
          <h2 className={css.title}>Total bought:</h2>
          <span className={css.lastPurchased}>{product.total_bought}</span>
        </div>
        <div>
          <h2 className={css.title}>Last purchased:</h2>
          <span className={css.lastPurchased}>
            {lastPurchased(product.last_purchased)}
          </span>
        </div>
        <div className={css.buttonsContainer}>
          <span className={css.price}>
            {product.avg_price} <span className={css.currency}>€</span>
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
    </>
  );
}
