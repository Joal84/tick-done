import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import Modal from "./modal";
import EditProduct from "./edit-product";
import css from "./display-products.module.css";
import { ColorRing } from "react-loader-spinner";
import { ProductListContext } from "../App";
import ProductItem from "./product-item";

export default function DisplayProducts({ filteredProducts }: any) {
  const [fetchError, setFetchError] = useState("");
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [editModal, setEditModal]: any = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [avgPrice, setAvgPrice] = useState(0);
  const [editedProduct, setEditedProduct] = useState({});
  const [deletedProduct, setDeletedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchList = async () => {
      const { data, error }: any = await supabase
        .from("products_list")
        .select();

      if (error) {
        setFetchError("Could not fetch the productList");
        setIsLoading(false);
      }
      if (data) {
        setProductList(data);
        setFetchError("");
        setIsLoading(false);
      }
    };
    fetchList();
  }, [deletedProduct, editedProduct]);

  const handleEdit = (product: any) => {
    setEditModal(true);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setId(product.id);
    setAvgPrice(product.avg_price);
  };

  const handleDelete = async (item: any) => {
    setIsLoading(true);
    const { data, error }: any = await supabase
      .from("products_list")
      .delete()
      .eq("id", item.id)
      .select();

    if (error) {
      setFetchError("Could not delete the product");
      setIsLoading(false);
    }
    if (data) {
      setDeletedProduct(data);
      setIsLoading(false);
    }
  };

  return (
    <>
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

      <div className={css.gridContainer}>
        {filteredProducts.map((product: any) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
        {editModal && (
          <Modal onClose={() => setEditModal(false)}>
            <EditProduct
              onClose={setEditModal}
              name={name}
              category={category}
              description={description}
              id={id}
              avgPrice={avgPrice}
            />
          </Modal>
        )}
      </div>
    </>
  );
}
