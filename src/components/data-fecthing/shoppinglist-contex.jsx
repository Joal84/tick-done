import "./loading.css";
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../../utils/supabase";
import { ColorRing } from "react-loader-spinner";
import { userDataContext } from "./userAuth";

export const ShoppingListContext = createContext([{}]);

export default function ShoppinglistFetch({ children }) {
  const [list, setList] = useState(null);
  const [userAuth, setUser] = useContext(userDataContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchList = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("shopping_lists")
      .select(
        "*, products_list(name, avg_price, last_purchased, total_bought, category, description, id)"
      )
      .order("order");

    if (error) {
      setIsLoading(false);
    }

    if (data) {
      setList(
        data.map((item) => {
          return (item = {
            ...item,
            totalPrice: (
              item.quantity * (item.products_list?.avg_price ?? 0.0)
            ).toFixed(2),
          });
        })
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [userAuth]);

  return (
    <ShoppingListContext.Provider value={[list, setList]}>
      {children}
      {isLoading && (
        <div className="loading">
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
    </ShoppingListContext.Provider>
  );
}
