import React from "react";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProductListPage from "./pages/ProductListPage";
import Regis from "./pages/Regis";
// import ProductList from "./components/ProductList";

function App() {
  const location = useLocation();
  return (
    <>
      <div
        className={
          location.pathname !== "/login" && location.pathname !== "/register"
            ? "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
            : ""
        }
      >
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regis />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
