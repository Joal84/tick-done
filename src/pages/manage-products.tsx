import { useContext, useState, useEffect, ChangeEvent } from "react";
import { userDataContext } from "../utils/userAuth";
import css from "./manage-products.module.css";
import AddToProduct from "../components/add-to-product";
import DisplayProducts from "../components/display-products";
import Modal from "../components/modal";
import Button from "../components/Button/button";
import Search from "../components/filtered-search";
import CategoryFilter from "../components/category-filter";
import { ProductListContext } from "../App";
import Background from "../components/Background/background";

export default function ManageProducts({ nav, footer }) {
  const [addProdModal, setAddProdModal] = useState(false);
  const [search, setSearch] = useState("");
  const [inputCategoryFilter, setinputCategoryFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([{}]);
  const [productList]: any = useContext(ProductListContext);
  const userAuth: any = useContext(userDataContext);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearch(searchFieldString);
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

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "None", label: "None" },
    { value: "Food-and-Pantry", label: "Food-and-Pantry" },
    { value: "Health-and-Beauty", label: "Health-and-Beauty" },
    { value: "Household", label: "Household" },
  ];
  return (
    <>
      <div>
        {Object.keys(userAuth).length === 0 ? (
          <p>Login to manage your products</p>
        ) : (
          <>
            {nav}
            <div className={css.container}>
              <div className={css.filterContainer}>
                <div className={css.hiddenChild}></div>
                <div className={css.hiddenChild}></div>
                <div className={css.search}>
                  <Search onChangeHandler={onSearchChange} />
                </div>
                <div className={css.categorySearch}>
                  <CategoryFilter
                    selector={(e) => setinputCategoryFilter(e.value)}
                    placeholder="Filter Category"
                    options={filterOptions}
                  />
                </div>
                <div className={css.addButton}>
                  <Button className="add" onClick={() => setAddProdModal(true)}>
                    Add Product
                  </Button>
                </div>
              </div>
              <div className={css.dividerContainer}>
                <p className={css.title}>Manage Your Products</p>
                <div className={css.divider}></div>
              </div>
              {search || inputCategoryFilter ? (
                <DisplayProducts
                  onClose={() => setAddProdModal(false)}
                  filteredProducts={filteredProducts}
                />
              ) : (
                <DisplayProducts
                  onClose={() => setAddProdModal(false)}
                  filteredProducts={productList}
                />
              )}
            </div>
          </>
        )}
        {addProdModal && (
          <Modal onClose={() => setAddProdModal(false)}>
            <AddToProduct onClose={setAddProdModal} />
          </Modal>
        )}
      </div>
      {footer}
    </>
  );
}
