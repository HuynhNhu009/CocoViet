import Products from "../pages/Product/Products";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import LoginForm from "../pages/Login";
import Register from "../pages/Register";
import ProductDetail from "../pages/Product/ProductDetail";
import Profile from "../pages/Profile";
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
        element: <Profile />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Posts />,
      },
      {
        path: "blog/:blogId",
        element: <PostDetail />,
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
