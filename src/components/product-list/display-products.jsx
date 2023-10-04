import css from "./display-products.module.css";
import { useState, useContext } from "react";
import { supabase } from "../../utils/supabase";
import { ProductListContext } from "../data-fecthing/productlist-context";
import { ShoppingListContext } from "../data-fecthing/shoppinglist-contex";
import { handleEdit } from "../product-list/edit-product";
import Modal from "../modal/modal";
import EditProduct from "./edit-product";
import ProductItem from "./product-item";
import Swal from "sweetalert2";
import emptyProduct from "../../assets/empty_product.webp";

export default function DisplayProducts({ filteredProducts }) {
  const [productList, setProductList] = useContext(ProductListContext);
  const [list, setList] = useContext(ShoppingListContext);
  const [editModal, setEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleDelete = async (item) => {
    const checkShoppingList = list.some(
      (listItem) => listItem.product_id === item.id
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
          const newProdList = productList?.filter(
            (prodItem) => prodItem.id !== item.id
          );
          setProductList(newProdList);

          const newShoppList = list?.filter((itemToDelete) => {
            return itemToDelete.product_id !== item.id;
          });
          setList(newShoppList);

          const { data, error } = await supabase
            .from("products_list")
            .delete()
            .eq("id", item.id);

          const { data: shopppingData, error: shopppingError } = await supabase
            .from("shopping_lists")
            .delete()
            .eq("product_id", item.id);
        } else {
          return;
        }
      });
    }
    if (!checkShoppingList) {
      const newList = productList?.filter(
        (prodItem) => prodItem.id !== item.id
      );

      setProductList(newList);

      const { data, error } = await supabase
        .from("products_list")
        .delete()
        .eq("id", item.id);
    }
  };
  return (
    <>
      <div className={css.container}>
        {productList === null || productList?.length === 0 ? (
          <div className={css.emptyListContainer}>
            <img
              className={css.emptyListImage}
              alt="Empty Cart image"
              src={emptyProduct}
            ></img>
            <p className={css.emptyListMessage}>Your product list is empty.</p>
          </div>
        ) : (
          <div className={css.gridContainer}>
            {filteredProducts?.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  product={product}
                  handleEdit={(e) =>
                    handleEdit(product, setProductToEdit, setEditModal)
                  }
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
              name={productToEdit.name}
              category={productToEdit.category}
              description={productToEdit.description}
              id={productToEdit.id}
              avgPrice={productToEdit.avgPrice}
            />
          </Modal>
        )}
      </div>
    </>
  );
}
