import css from "./add-to-shopplist.module.css";
import { supabase } from "../../utils/supabase";
import { useRef, useState } from "react";
import { useContext } from "react";
import { userDataContext } from "../data-fecthing/userAuth";
import { ReactComponent as AddSVG } from "../../assets/plus-icon.svg";
import { ShoppingListContext } from "../data-fecthing/shoppinglist-contex";
import { ProductListContext } from "../data-fecthing/productlist-context";
import TagField from "./tagfield";

export default function AddToShopplist() {
  const tagifyRef1: any = useRef();

  const [list, setList]: any = useContext(ShoppingListContext);
  const [productList, setProductList]: any = useContext(ProductListContext);
  const userAuth: any = useContext(userDataContext);
  const [productName, setProductName] = useState([]);
  const user_id = userAuth.id;

  const handleKeyAdd = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  // Capture products from input field
  const handleChange = async (e: any) => {
    setProductName(e.detail.tagify.value.map((item: any) => item.value));
  };

  //Clear Add field
  const clearAll = (tagifyRef: any) => {
    tagifyRef.current && tagifyRef.current.removeAllTags();
  };

  // Filter input for products that are not in the product list yet
  const newProductListValue = productName.filter(
    (o1: any) =>
      !productList.some(
        (o2: any) => o1?.toLowerCase() === o2.name?.toLowerCase()
      )
  );

  // Filter input for peoducts that are in the product List already
  const findNewProdInProductList = productList.filter((o1: any) =>
    productName.some((o2: any) => o1.name?.toLowerCase() === o2?.toLowerCase())
  );

  // Filter for products that are in the product list but not in the shopping list
  const uniqueItemInTheList = findNewProdInProductList.filter(
    (item1: any) =>
      !list.some(
        (item2: any) => item1.name?.toLowerCase() === item2.name?.toLowerCase()
      )
  );

  const handleSubmit = () => {
    if (!productName) {
      return;
    }

    // Adding products into shopping list that already exists in Product list
    if (findNewProdInProductList.length > 0) {
      uniqueItemInTheList.map(async (item: any) => {
        setList((prevList: any) => [
          ...prevList,
          {
            completed: false,
            order: prevList.length,
            name: item.name,
            quantity: 1,
            products_list: {
              name: item.name,
              last_purchased: item.last_purchased,
              category: item.category,
              avg_price: item.avg_price,
              total_bought: item.total_bought,
            },
            totalPrice: (1 * (item.avg_price || 0.0)).toFixed(2),
            product_id: item.id,
            user_id,
          },
        ]);

        const { data, error }: any = await supabase
          .from("shopping_lists")
          .insert([
            {
              name: item.name,
              product_id: item.id,
              user_id,
            },
          ]);
      });
    }

    // Adding products into product list that do not exists in Product list
    newProductListValue.map(async (item) => {
      const { data, error }: any = await supabase
        .from("products_list")
        .insert([{ name: item, category: "None", avg_price: 0, user_id }])
        .select();
      if (data) {
        setProductList((prevProdList: any) => [...prevProdList, ...data]);
      }
      // Check if new item also does not exist in the shopping list
      const uniqueShoppingItem = data.filter(
        (item1: any) =>
          !list.some(
            (item2: any) =>
              item1.name.toLowerCase() === item2.name.toLowerCase()
          )
      );

      // Add new and unique item in the shopping list
      uniqueShoppingItem.map(async (newItem: any) => {
        const { data: shopping_data, error: shopping_error } = await supabase
          .from("shopping_lists")
          .insert([
            {
              name: newItem.name,
              product_id: newItem.id,
              user_id,
            },
          ]);

        setList((prevList: any) => [
          ...prevList,
          {
            completed: false,
            name: newItem.name,
            order: prevList.length,
            quantity: 1,
            products_list: {
              name: newItem.name,
              last_purchased: newItem.last_purchased,
              category: newItem.category,
              avg_price: newItem.avg_price,
              total_bought: newItem.total_bought,
            },
            totalPrice: (1 * (newItem.avg_price || 0.0)).toFixed(2),
            product_id: newItem.id,
            user_id,
          },
        ]);
      });
    });

    clearAll(tagifyRef1);
  };
  //saving order value in supabase
  const orderSupabase = () => {
    return list.map(async (item) => {
      const { data, error } = await supabase
        .from("shopping_lists")
        .update([
          {
            order: item.order,
          },
        ])
        .eq("product_id", item.product_id);
    });
  };
  orderSupabase();
  return (
    <div className={css.container}>
      <div className={css.labelAndTag}>
        <label className={css.label} htmlFor="add">
          Add into your shopping list
        </label>

        <TagField id="add" handleChange={handleChange} tagifyRef={tagifyRef1} />
      </div>
      <AddSVG
        tabIndex={0}
        className={css.addButton}
        onClick={handleSubmit}
        onKeyDown={(e) => handleKeyAdd(e)}
      />
    </div>
  );
}
