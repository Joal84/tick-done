import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login-page";
import Footer from "./components/Footer/footer";

import DisplayShopplist from "./pages/display-shopplist";
import Navigation from "./components/navigation";
import UserAuth from "./utils/userAuth";

import ManageProducts from "./pages/manage-products";
import "./App.css";
import { supabase } from "./utils/supabase";

export const ShoppingListContext: any = createContext([{}]);
export const ProductListContext: any = createContext([{}]);

function App() {
  const [userLogged, setUserLogged] = useState({});
  const [list, setList] = useState([{}]);
  const [productList, setProductList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <UserAuth>
        <ShoppingListContext.Provider value={[list, setList]}>
          <ProductListContext.Provider value={[productList, setProductList]}>
            <div className="App">
              {/* <Navigation setUserLogged={setUserLogged} /> */}
            </div>
            <Routes>
              <Route
                path="/"
                element={<DisplayShopplist footer={<Footer />} />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/manage-products"
                element={<ManageProducts footer={<Footer />} />}
              />
            </Routes>
          </ProductListContext.Provider>
        </ShoppingListContext.Provider>
      </UserAuth>
    </BrowserRouter>
  );
}

export default App;
