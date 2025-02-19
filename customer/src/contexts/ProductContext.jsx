// import React, { createContext, useEffect, useState } from "react";
// import { productService } from "../services/productService";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       const { products, error } = await productService.getProducts();
//       console.log("Products in context:", products);

//       setProducts(products);
//       setError(error);
//       setLoading(false);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider value={{ products, loading, error }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };
