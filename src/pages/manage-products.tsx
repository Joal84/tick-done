import { useContext, useState, useEffect, ChangeEvent } from "react";
import { userDataContext } from "../utils/userAuth";
import css from "./manage-products.module.css";
import AddToProduct from "../components/add-to-product";
import DisplayProducts from "../components/display-products";
import Modal from "../components/modal";
import Button from "../components/button";
import Search from "../components/filtered-search";
import CategoryFilter from "../components/category-filter";
import { ProductListContext } from "../App";

export default function ManageProducts() {
  const [addOverlayOpen, setAddOverlayOpen] = useState(false);
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [inputCategoryFilter, setinputCategoryFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([{}]);
  const [productList]: any = useContext(ProductListContext);
  const userAuth: any = useContext(userDataContext);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearch(searchFieldString);
  };

  const onCategoryFilter = (event: string): void => {
    const categoryFieldValue = event;
    setinputCategoryFilter(categoryFieldValue);
  };

  useEffect(() => {
    if (search) {
      const newFilteredProducts = productList.filter((product: any) => {
        return product.name.toLocaleLowerCase().includes(search);
      });
      setFilteredProducts(newFilteredProducts);
    }
  }, [productList, search]);

  useEffect(() => {
    const categoryFilteredProducts = productList.filter((product: any) => {
      if (inputCategoryFilter === "all") {
        return product;
      }
      if (inputCategoryFilter) {
        return product.category.includes(inputCategoryFilter);
      }
    });
    setFilteredProducts(categoryFilteredProducts);
  }, [productList, inputCategoryFilter]);

  return (
    <div className={css.background}>
      {Object.keys(userAuth).length === 0 ? (
        <p>Login to manage your products</p>
      ) : (
        <>
          <div className={css.filterContainer}>
            <div className={css.search}>
              <Search onChangeHandler={onSearchChange} />
            </div>
            <div className={css.categorySearch}>
              <CategoryFilter onChangeHandler={onCategoryFilter} />
            </div>
          </div>
          <div className={css.addButton}>
            <Button
              title="Add Product"
              onClick={() => setAddOverlayOpen(true)}
            />
          </div>
          {search || inputCategoryFilter ? (
            <DisplayProducts
              filteredProducts={filteredProducts}
              setAddOverlayOpen={setAddOverlayOpen}
              addOverlayOpen={addOverlayOpen}
              setEditOverlayOpen={setEditOverlayOpen}
              editOverlayOpen={editOverlayOpen}
            />
          ) : (
            <DisplayProducts
              filteredProducts={productList}
              setAddOverlayOpen={setAddOverlayOpen}
              addOverlayOpen={addOverlayOpen}
              setEditOverlayOpen={setEditOverlayOpen}
              editOverlayOpen={editOverlayOpen}
            />
          )}
        </>
      )}
      {addOverlayOpen && (
        <>
          <Modal
            setAddOverlayOpen={setAddOverlayOpen}
            AddToProduct={
              <AddToProduct setAddOverlayOpen={setAddOverlayOpen} />
            }
          ></Modal>
        </>
      )}
    </div>
  );
}
