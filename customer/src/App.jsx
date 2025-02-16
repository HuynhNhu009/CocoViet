import React from "react";
import { ProductProvider } from "./contexts/ProductContext";
import ProductList from "./components/ProductList";

function App() {
  return (
    <ProductProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Danh sách sản phẩm
        </h1>
        <ProductList />
      </div>
    </ProductProvider>
  );
}

export default App;
