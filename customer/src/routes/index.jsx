import Products from "../pages/Product/Products";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginRegister/Login";
import Register from "../components/LoginRegister/Register";
import ProductDetail from "../pages/Product/ProductDetail";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Order from "../pages/Order";
import Blog from "../pages/Blog";

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
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
      },

      {
        path: "order",
        element: <Order />,
      },
      {
        path: "profile/:profileId",
        element: <Profile />,
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "blog",
        element: <Blog/>
      }
    ],
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/" />,
  // },
];
