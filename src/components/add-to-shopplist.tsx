import addProd from "./add-to-shopplist.module.css";
import { supabase } from "../utils/supabase";
import { FormEvent, useState } from "react";
import { useContext, useEffect, createContext } from "react";
import { userDataContext } from "../utils/userAuth";
import { ReactComponent as AddButton } from "../assets/plus-icon.svg";
import Button from "./button";

export const newAddedItem = createContext({});

export default function AddToShopplist({ setAddedItem }: any) {
  const [product_name, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isOpen, setIsOpen] = useState(false);

  const [formError, setFormError] = useState("");
  const [itemList, setItemList] = useState([]);
  const [fetchProdError, setFetchProdError] = useState("");

  const userAuth: any = useContext(userDataContext);
  const user_id = userAuth.id;

  const clearField = () => {
    setQuantity("");
    setProduct("");
  };

  //Fetching product list from user DB
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error }: any = await supabase
        .from("products_list")
        .select();

      if (error) {
        setFetchProdError("Could not fetch the product list");
        setItemList([]);
      }
      if (data) {
        setItemList(data);
        setFetchProdError("");
      }
    };
    fetchProducts();
  }, []);

  // Adding new item into the list

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product_name || !quantity) {
      setFormError("Please fill in all the fields");
      return;
    }

    const { data, error }: any = await supabase
      .from("shopping_lists")
      .insert([{ product_name, quantity, user_id }])
      .select();

    if (error) {
      setFormError(error);
    }
    if (data) {
      setAddedItem(data);
    }
    clearField();
  };

  return (
    <div className={addProd.container}>
      <AddButton
        className={isOpen ? addProd.svgClose : addProd.svgAdd}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <label className={addProd.title} htmlFor="product">
            Product Name:
          </label>

          <input
            type="text"
            list="product"
            className={addProd.field}
            name="product"
            value={product_name}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
          <datalist id="product">
            {itemList.map((product: any) => {
              return (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              );
            })}
          </datalist>

          <label className={addProd.title} htmlFor="quantity">
            Quantity
          </label>

          <input
            type="text"
            list="quantity"
            className={addProd.field}
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <datalist id="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </datalist>

          <Button title="Add" onClick={handleSubmit} />
        </form>
      ) : null}
      {formError && <p>{formError}</p>}
    </div>
  );
}
