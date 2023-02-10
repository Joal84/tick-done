import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import Modal from "./modal";
import EditProduct from "./edit-product";
import Button from "./button";
import css from "./display-products.module.css";
import { ProductListContext } from "../App";

export default function DisplayProducts({
  setEditOverlayOpen,
  editOverlayOpen,
}: any) {
  const [fetchError, setFetchError] = useState("");
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
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
    <div>
      {productList
        .map((product: any) => {
          return (
            <div className={css.container} key={Math.random()}>
              <p key={product.id}>{product.name}</p>;
              <p key={product.name}>{product.category}</p>
              <p key={product.description}>{product.description}</p>
              <Button title="Edit" onClick={() => handleEdit(product)} />
              <Button title="Delete" onClick={() => handleDelete(product)} />
            </div>
          );
        })
        .reverse()}
      {editOverlayOpen && (
        <Modal
          setEditOverlayOpen={setEditOverlayOpen}
          EditProduct={
            <EditProduct
              name={name}
              category={category}
              description={description}
              id={id}
              setEditOverlayOpen={setEditOverlayOpen}
              setEditedProduct={setEditedProduct}
            />
          }
        ></Modal>
      )}
    </div>
  );
}
