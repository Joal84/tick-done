import css from "./edit-product.module.css";
import { useEffect, useState, FormEvent, useContext } from "react";
import { supabase } from "../../utils/supabase";
import { ProductListContext } from "../data-fecthing/productlist-context";
import { ShoppingListContext } from "../data-fecthing/shoppinglist-contex";
import Button from "../button/button";
import Title from "../title/title";
import SelectComponent from "../select-component/select-component";

export const handleEdit = (product, setState, setModalTuggle) => {
  setModalTuggle(true);
  setState({
    name: product.name,
    category: product.category,
    description: product.description,
    id: product.id,
    avgPrice: product.avg_price,
  });
};

export default function EditProduct(props) {
  const [productList, setProductList] = useContext(ProductListContext);
  const [list, setList] = useContext(ShoppingListContext);
  const [editedProduct, setEditedProduct] = useState({
    newName: "",
    category: "None",
    description: "",
    id: "",
    avgPrice: 0,
  });

  useEffect(() => {
    setEditedProduct({
      newName: props.name,
      category: props.category,
      description: props.description,
      id: props.id,
      avgPrice: props.avgPrice,
    });
  }, [props.name, props.category, props.description, props.id, props.avgPrice]);

  const editOptions = [
    { value: "None", label: "None" },
    { value: "Food-and-Pantry", label: "Food-and-Pantry" },
    { value: "Health-and-Beauty", label: "Health-and-Beauty" },
    { value: "Household", label: "Household" },
  ];

  //Description character counter
  const charCounter = (maxNumber) => {
    editedProduct.description ??
      setEditedProduct({ ...editedProduct, description: "" });
    return maxNumber - editedProduct.description?.length;
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!editedProduct.newName || editedProduct.avgPrice === 0) {
      return;
    }
    const currentProductIndex = productList?.findIndex(
      (item) => item.id === props.id
    );
    const updatedProduct = {
      ...productList[currentProductIndex],
      name: editedProduct.newName,
      description: editedProduct.description,
      category: editedProduct.category,
      avg_price: editedProduct.avgPrice,
      id: editedProduct.id,
    };

    const newProdList = [...productList];
    newProdList[currentProductIndex] = updatedProduct;

    //check if edited product also exist in the shopping list

    const checkShoppingList = list.some(
      (listItem) => listItem.product_id === newProdList[currentProductIndex].id
    );
    if (checkShoppingList) {
      const currentListIndex = list.findIndex(
        (listItem) =>
          listItem.product_id === newProdList[currentProductIndex].id
      );
      const updateShopplist = {
        ...list[currentListIndex],
        name: editedProduct.newName,
        totalPrice: (
          list[currentListIndex].quantity * editedProduct.avgPrice
        ).toFixed(2),
        products_list: {
          ...list[currentListIndex].products_list,
          name: editedProduct.newName,
          category: editedProduct.category,
          avg_price: editedProduct.avgPrice,
        },
      };
      const newList = [...list];
      newList[currentListIndex] = updateShopplist;
      setList(newList);
    }

    setProductList(newProdList);

    const { data, error } = await supabase
      .from("products_list")
      .update({
        name: editedProduct.newName,
        description: editedProduct.description,
        category: editedProduct.category,
        avg_price: editedProduct.avgPrice,
        id: editedProduct.id,
      })
      .eq("id", editedProduct.id)
      .select();

    props.onClose(false);
  };

  return (
    <div>
      <Title>Edit Product</Title>
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <div className={css.nameAndCategoryContainer}>
          <div>
            <label className={css.label} htmlFor="product-name">
              Product Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="product-name"
              className={css.fieldName}
              type="text"
              name="product-name"
              value={editedProduct.newName}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, newName: e.target.value })
              }
              required
            ></input>
          </div>
          <div className={css.categoryContainer}>
            <label className={css.label} htmlFor="category">
              Category
            </label>
            <SelectComponent
              value={editOptions.find((option) => {
                return option.value === editedProduct.category;
              })}
              id="category"
              name="category"
              selector={(e) =>
                setEditedProduct({ ...editedProduct, category: e.value })
              }
              placeholder="None"
              options={editOptions}
            />
          </div>
        </div>

        <div className={css.priceContainer}>
          <label className={css.label} htmlFor="average-price">
            Price<span style={{ color: "red" }}> *</span>
          </label>
          <input
            id="average-price"
            min="0"
            className={css.field}
            type="number"
            name="average-price"
            value={editedProduct.avgPrice}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, avgPrice: e.target.value })
            }
            required
          ></input>
        </div>
        <div className={css.descriptionContainer}>
          <label className={css.label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={css.description}
            value={editedProduct.description}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                description: e.target.value,
              })
            }
            name="description"
            maxLength={100}
          ></textarea>
          <p className={css.maxChar}>{`${charCounter(
            100
          )} / 100 Characters`}</p>
        </div>
        <Button onClick={handleSubmit}>Save</Button>
      </form>
    </div>
  );
}
