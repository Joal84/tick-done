import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login-page";

import DisplayShopplist from "./pages/display-shopplist";
import Navigation from "./components/navigation";
import UserAuth from "./utils/userAuth";

import ManageProducts from "./pages/manage-products";
import "./App.css";

function App() {
  const [addedItem, setAddedItem] = useState([]);
  const [addedProduct, setAddedProduct] = useState([]);
  const [userLogged, setUserLogged] = useState({});

  return (
    <BrowserRouter>
      <UserAuth>
        <div className="App">
          <Navigation setUserLogged={setUserLogged} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <DisplayShopplist
                setAddedItem={setAddedItem}
                addedItem={addedItem}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/manage-products"
            element={
              <ManageProducts
                setAddedProduct={setAddedProduct}
                addedProduct={addedProduct}
              />
            }
          />
        </Routes>
      </UserAuth>
    </BrowserRouter>
  );
}

export default App;
