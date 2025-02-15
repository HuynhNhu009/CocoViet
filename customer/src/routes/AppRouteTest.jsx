import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "../views/ProductListViewTest";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Trang chủ</h1>} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
