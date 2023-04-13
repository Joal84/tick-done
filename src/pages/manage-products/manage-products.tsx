import css from "./manage-products.module.css";
import { useContext, useState, useEffect, ChangeEvent } from "react";
import { userDataContext } from "../../components/data-fecthing/userAuth";
import { ProductListContext } from "../../components/data-fecthing/productlist-context";
import AddToProduct from "../../components/product-list/add-to-product";
import DisplayProducts from "../../components/product-list/display-products";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/button";
import Search from "../../components/product-list/filtered-search";
import SelectComponent from "../../components/select-component/select-component";
import Title from "../../components/title/title";

export default function ManageProducts({ nav, footer }: any) {
  const [addProdModal, setAddProdModal] = useState(false);
  const [search, setSearch] = useState("");
  const [inputCategoryFilter, setinputCategoryFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([{}]);
  const [productList]: any = useContext(ProductListContext);
  const [userAuth, setUser]: any = useContext(userDataContext);

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
    <div className={css.wrapperContainer}>
      {nav}
      <div className={css.container}>
        <div className={css.filterContainer}>
          <div className={css.hiddenChild}></div>
          <div className={css.hiddenChild}></div>
          <div className={css.search}>
            <Search onChangeHandler={onSearchChange} />
          </div>
          <div className={css.categorySearch}>
            <label className={css.label}>
              Filter
              <SelectComponent
                selector={(e: any) => setinputCategoryFilter(e.value)}
                placeholder="Category"
                options={filterOptions}
              />
            </label>
          </div>
          <div className={css.addButton}>
            <Button className="add" onClick={() => setAddProdModal(true)}>
              Add Product
            </Button>
          </div>
        </div>
        <div className={css.dividerContainer}>
          <Title type="secondTitle">Manage Your Products</Title>
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

      {addProdModal && (
        <Modal onClose={() => setAddProdModal(false)}>
          <AddToProduct onClose={setAddProdModal} />
        </Modal>
      )}
      {footer}
    </div>
  );
}
