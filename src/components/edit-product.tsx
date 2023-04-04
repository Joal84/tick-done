import { useEffect, useState, FormEvent, useContext } from "react";
import css from "./edit-product.module.css";
import { supabase } from "../utils/supabase";
import Button from "../components/Button/button";
import Title from "./title";
import SelectComponent from "./select-component";
import { ProductListContext } from "../components/Data-fecthing/productlist-context";
import { ShoppingListContext } from "../components/Data-fecthing/shoppinglist-contex";

export default function EditProduct(props: any) {
  const [newName, setNewName] = useState("");
  const [category, setCategory] = useState("None");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [avgPrice, setAvgPrice] = useState();
  const [productList, setProductList]: any = useContext(ProductListContext);
  const [list, setList]: any = useContext(ShoppingListContext);

  const editOptions = [
    { value: "None", label: "None" },
    { value: "Food-and-Pantry", label: "Food-and-Pantry" },
    { value: "Health-and-Beauty", label: "Health-and-Beauty" },
    { value: "Household", label: "Household" },
  ];
  useEffect(() => {
    setNewName(props.name);
    setCategory(props.category);
    setDescription(props.description);
    setId(props.id);
    setAvgPrice(props.avgPrice);
  }, []);

  //Description character counter
  const charCounter = (maxNumber: number) => {
    description ?? setDescription("");
    return maxNumber - description?.length;
  };

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newName || avgPrice === 0) {
      return;
    }
    const currentProductIndex = productList.findIndex(
      (item) => item.id === props.id
    );
    const updatedProduct = {
      ...productList[currentProductIndex],
      name: newName,
      description: description,
      category: category,
      avg_price: avgPrice,
      id: id,
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
        name: newName,
        totalPrice: (list[currentListIndex].quantity * avgPrice).toFixed(2),
        products_list: {
          ...list[currentListIndex].products_list,
          name: newName,
          category: category,
          avg_price: avgPrice,
        },
      };
      const newList = [...list];
      newList[currentListIndex] = updateShopplist;
      setList(newList);
    }

    setProductList(newProdList);
    console.log(list);
    const { data, error }: any = await supabase
      .from("products_list")
      .update({ name: newName, description, category, avg_price: avgPrice, id })
      .eq("id", id)
      .select();

    props.onClose(false);
  };
  console.log(list);
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
              className={css.field}
              type="text"
              name="product-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            ></input>
          </div>
          <div className={css.categoryContainer}>
            <label className={css.label} htmlFor="category">
              Category
            </label>
            <SelectComponent
              value={editOptions.find((option) => {
                return option.value === category;
              })}
              id="category"
              name="category"
              selector={(e) => setCategory(e.value)}
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
            value={avgPrice}
            onChange={(e) => setAvgPrice(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
