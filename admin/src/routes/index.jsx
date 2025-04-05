import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Category from "../page/Category";
import Customers from "../page/Customers";
import Post from "../page/Post";
import Products from "../page/Products";
import Retailers from "../page/Retailers";
import Statistic from "../page/Statistic";
import Login from "../page/Login";
import { PrivateRoutes } from "../components/PrivateRoutes";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/", 
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "customers",
            element: <Customers />,
          },
          {
            path: "retailers",
            element: <Retailers />,
          },
          {
            path: "posts",
            element: <Post />,
          },
          {
            path: "statistic",
            element: <Statistic />,
          },
          {
            path: "categories",
            element: <Category />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];
