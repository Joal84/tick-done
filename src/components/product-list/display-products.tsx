import css from "./display-products.module.css";
import { useState, useContext } from "react";
import { supabase } from "../../utils/supabase";
import { ProductListContext } from "../../components/data-fecthing/productlist-context";
import { ShoppingListContext } from "../../components/data-fecthing/shoppinglist-contex";
import { userDataContext } from "../../components/data-fecthing/userAuth";
import Modal from "../modal/modal";
import EditProduct from "./edit-product";
import ProductItem from "./product-item";
import Swal from "sweetalert2";

export default function DisplayProducts({ filteredProducts }: any) {
  const [userAuth, setUser]: any = useContext(userDataContext);
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [list, setList]: any = useContext(ShoppingListContext);
  const [editModal, setEditModal]: any = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [avgPrice, setAvgPrice] = useState(0);

  const handleEdit = (product: any) => {
    setEditModal(true);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setId(product.id);
    setAvgPrice(product.avg_price);
  };

  const handleDelete = async (item: any) => {
    const checkShoppingList = list.some(
      (listItem: any) => listItem.product_id === item.id
    );
    if (checkShoppingList) {
      Swal.fire({
        title:
          "This product is in your shopping list. Are you sure you want to delete it?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ba6473",
        cancelButtonColor: "#227250",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newProdList = productList.filter(
            (prodItem: any) => prodItem.id !== item.id
          );
          setProductList(newProdList);

          const newShoppList = list.filter((itemToDelete: any) => {
            return itemToDelete.product_id !== item.id;
          });
          setList(newShoppList);

          const { data, error }: any = await supabase
            .from("products_list")
            .delete()
            .eq("id", item.id);

          const { data: shopppingData, error: shopppingError }: any =
            await supabase
              .from("shopping_lists")
              .delete()
              .eq("product_id", item.id);
        } else {
          return;
        }
      });
    }
    if (!checkShoppingList) {
      const newList = productList.filter(
        (prodItem: any) => prodItem.id !== item.id
      );

      setProductList(newList);

      const { data, error }: any = await supabase
        .from("products_list")
        .delete()
        .eq("id", item.id);
    }
  };

  return (
    <>
      <div className={css.container}>
        {productList.length === 0 || Object.keys(userAuth).length === 0 ? (
          <div className={css.emptyListContainer}>
            <img
              className={css.emptyListImage}
              alt="Shopping Cart image"
              src="src/assets/empty_product.webp"
            ></img>
            <p className={css.emptyListMessage}>Your product list is empty.</p>
          </div>
        ) : (
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
          </div>
        )}
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
