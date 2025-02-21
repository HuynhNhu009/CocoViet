import Products from "../pages/Product/Products";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginRegister/Login";
import Register from "../components/LoginRegister/Register";
import ProductDetail from "../pages/Product/ProductDetail";
import { path } from "framer-motion/client";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "products",
        element: <Products />,
        // children:[
        //   {
        //     path: "product-details",
        //     element: <ProductDetail/>,
        //   },
        // ]
      },
      {
<<<<<<< HEAD
        path: "productss/product-details/:productId",
        element: <ProductDetail />,
=======
        path: "products/product-details/:productId",
        element: <ProductDetail/>,
>>>>>>> 906907595db41e4b1935080de90a8c9c27eb2831
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
