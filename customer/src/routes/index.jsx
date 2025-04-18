import Products from "../pages/Product/Products";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import LoginForm from "../pages/Login";
import Register from "../pages/Register";
import ProductDetail from "../pages/Product/ProductDetail";
import CustomerProfile from "../pages/CustomerProfile";
import RetailerProfile from "../pages/RetailerProfile";
import About from "../pages/About";
import Order from "../pages/Order";
import Posts from "../pages/Posts";
import PostDetail from "../components/Post/PostDetail";

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
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />,
      },

      {
        path: "order",
        element: <Order />,
      },
      {
        path: "profile/:profileId",
        element: <CustomerProfile />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:postId",
        element: <PostDetail />,
      },
      {
        path: "retailer/:retailerId",
        element: <RetailerProfile />,
      },
    ],
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
    path: "*",
    element: <Navigate to="/" />,
  },
];
