import { createContext, useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { ColorRing } from "react-loader-spinner";
import "./loading.css";

export const ProductListContext: any = createContext([{}]);

export default function ProductListFetch({ children }) {
  const [productList, setProductList]: any = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLProdList = async () => {
    setIsLoading(true);
    const { data, error }: any = await supabase.from("products_list").select();

    if (error) {
      setIsLoading(false);
    }
    if (data) {
      setProductList(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLProdList();
  }, []);

  return (
    <ProductListContext.Provider value={[productList, setProductList]}>
      {children}{" "}
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
    </ProductListContext.Provider>
  );
}
