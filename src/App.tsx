import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login-page";
import Footer from "./components/Footer/footer";
import DisplayShopplist from "./pages/display-shopplist";
import UserAuth from "./utils/userAuth";
import ManageProducts from "./pages/manage-products";
import Settings from "./pages/settings";
import SignIn from "./components/Login/sign-in";
import SignUp from "./components/Login/sign-up";
import ResetPass from "./components/Login/reset-pass";
import Navigation from "./components/navigation";
import ShoppinglistFetch from "./components/Data-fecthing/shoppinglist-contex";
import ProductListFetch from "./components/Data-fecthing/productlist-context";
import SettingsFetch from "./components/Data-fecthing/settings-contex";
import "./App.css";

function App() {
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
                    <DisplayShopplist
                      nav={<Navigation />}
                      footer={<Footer />}
                    />
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
                    <Settings nav={<Navigation />} footer={<Footer />} />
                  }
                />
                <Route
                  path="/manage-products"
                  element={
                    <ManageProducts nav={<Navigation />} footer={<Footer />} />
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
