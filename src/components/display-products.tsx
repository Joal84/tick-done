import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import Modal from "./modal";
import EditProduct from "./edit-product";
import Button from "./button";
import css from "./display-products.module.css";
import { ProductListContext } from "../App";
import { ReactComponent as DeleteButton } from "../assets/delete_black_24dp.svg";
import { ReactComponent as EditButton } from "../assets/edit_black_24dp.svg";

export default function DisplayProducts({
  setEditOverlayOpen,
  editOverlayOpen,
}: any) {
  const [fetchError, setFetchError] = useState("");
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [avgPrice, setAvgPrice] = useState(0);
  const [editedProduct, setEditedProduct] = useState({});
  const [deletedProduct, setDeletedProduct] = useState({});

  useEffect(() => {
    const fetchList = async () => {
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
    fetchList();
  }, [deletedProduct, editedProduct]);

  const handleEdit = (product: any) => {
    setEditOverlayOpen(true);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setId(product.id);
    setAvgPrice(product.avg_price);
  };

  const handleDelete = async (item: any) => {
    const { data, error }: any = await supabase
      .from("products_list")
      .delete()
      .eq("id", item.id)
      .select();

    if (error) {
      setFetchError("Could not delete the product");
    }
    if (data) {
      setDeletedProduct(data);
    }
  };

  return (
    <div className={css.gridContainer}>
      {productList.map((product: any) => {
        return (
          <div key={product.id} className={css.card}>
            <div className={css.titleContainer}>
              <h2>{product.name}</h2>
              <h3 className="">{product.category}</h3>
            </div>
            <dl>
              <dd>{product.description}</dd>
            </dl>
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
        );
      })}
      {editOverlayOpen && (
        <Modal
          setEditOverlayOpen={setEditOverlayOpen}
          EditProduct={
            <EditProduct
              name={name}
              category={category}
              description={description}
              id={id}
              avgPrice={avgPrice}
              setEditOverlayOpen={setEditOverlayOpen}
              setEditedProduct={setEditedProduct}
            />
          }
        ></Modal>
      )}
    </div>
  );
}
