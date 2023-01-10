import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
import List from "./pages/listPage";
import Navigation from "./components/Navigation";
import UserAuth from "./utils/userAuth";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserAuth>
        <div className="App">
          <Navigation />
        </div>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserAuth>
    </BrowserRouter>
  );
}

export default App;
