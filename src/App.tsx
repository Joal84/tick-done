import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login-page";

import DisplayShopplist from "./components/display-shopplist";
import Navigation from "./components/navigation";
import UserAuth from "./utils/userAuth";
import { newAddedProduct } from "./components/add-to-shopplist";
import AddToShopplist from "./components/add-to-shopplist";

import "./App.css";

function App() {
  const [addedProduct, setAddedProduct] = useState([]);
  const [userLogged, setUserLogged] = useState({});

  return (
    <BrowserRouter>
      <UserAuth>
        <newAddedProduct.Provider value={addedProduct}>
          <div className="App">
            <Navigation setUserLogged={setUserLogged} />
            {Object.keys(userLogged).length !== 0 && (
              <AddToShopplist setAddedProduct={setAddedProduct} />
            )}
          </div>
          <Routes>
            <Route
              path="/"
              element={<DisplayShopplist setAddedProduct={setAddedProduct} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </newAddedProduct.Provider>
      </UserAuth>
    </BrowserRouter>
  );
}

export default App;
