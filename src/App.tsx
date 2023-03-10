import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login-page";
import Footer from "./components/Footer/footer";
import DisplayShopplist from "./pages/display-shopplist";
import UserAuth from "./utils/userAuth";
import ManageProducts from "./pages/manage-products";
import "./App.css";

import SignIn from "./components/Login/sign-in";
import SignUp from "./components/Login/sign-up";
import Navigation from "./components/navigation";

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
            <div className="App"></div>
            <Routes>
              <Route
                path="/"
                element={
                  <DisplayShopplist
                    nav={<Navigation setUserLogged={setUserLogged} />}
                    footer={<Footer />}
                  />
                }
              />
              <Route path="/login" element={<Login signIn={<SignIn />} />} />
              <Route path="/sign-up" element={<Login signUp={<SignUp />} />} />
              <Route
                path="/manage-products"
                element={
                  <ManageProducts
                    nav={<Navigation setUserLogged={setUserLogged} />}
                    footer={<Footer />}
                  />
                }
              />
            </Routes>
          </ProductListContext.Provider>
        </ShoppingListContext.Provider>
      </UserAuth>
    </BrowserRouter>
  );
}

export default App;
