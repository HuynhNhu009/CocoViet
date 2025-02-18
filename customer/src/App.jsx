import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
// import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      Customer
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListPage />} />
      </Routes>
    </div>
  );
}

export default App;
