import React from "react";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Regis from "./pages/Regis";
import Products from "./pages/Product/Products";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regis />} />
          <Route path="/products" element={<Products />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
