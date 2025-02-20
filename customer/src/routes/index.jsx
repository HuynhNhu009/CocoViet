import Products from "../pages/Product/Products";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";

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
        element: <Auth />,
      },
      {
        path: "register",
        element: <Auth />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
