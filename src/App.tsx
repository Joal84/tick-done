import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import Login from "./pages/login/login-page";
import Footer from "./components/footer/footer";
import DisplayShopplist from "./pages/shopping-list/display-shopplist";
import UserAuth from "./components/data-fecthing/userAuth";
import ManageProducts from "./pages/manage-products/manage-products";
import Settings from "./pages/settings/settings";
import SignIn from "./components/login/sign-in";
import SignUp from "./components/login/sign-up";
import ResetPass from "./components/login/reset-pass";
import Navigation from "./components/navigation/navigation";
import ShoppinglistFetch from "./components/data-fecthing/shoppinglist-contex";
import ProductListFetch from "./components/data-fecthing/productlist-context";
import SettingsFetch from "./components/data-fecthing/settings-contex";
import "./App.css";

function App() {
  const [user, setUser]: any = useState({});

  useEffect(() => {
    const getUserData = async () => {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data?.user);
        }
      });
    };
    getUserData();
  }, []);

  const RequireAuth = ({ children }) => {
    if (Object.keys(user).length === 0) {
      return <Login signUp={<SignIn />} />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <UserAuth>
        <SettingsFetch>
          <ProductListFetch>
            <ShoppinglistFetch>
              <Routes>
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <DisplayShopplist
                        nav={<Navigation />}
                        footer={<Footer />}
                      />
                    </RequireAuth>
                  }
                />

                <Route path="/login" element={<Login signIn={<SignIn />} />} />
                <Route
                  path="/sign-up"
                  element={<Login signUp={<SignUp />} />}
                />
                <Route
                  path="/password-reset"
                  element={<Login resetPass={<ResetPass />} />}
                />
                <Route
                  path="/settings"
                  element={
                    <RequireAuth>
                      <Settings nav={<Navigation />} footer={<Footer />} />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/manage-products"
                  element={
                    <RequireAuth>
                      <ManageProducts
                        nav={<Navigation />}
                        footer={<Footer />}
                      />
                    </RequireAuth>
                  }
                />
              </Routes>
            </ShoppinglistFetch>
          </ProductListFetch>
        </SettingsFetch>
      </UserAuth>
    </BrowserRouter>
  );
}

export default App;
