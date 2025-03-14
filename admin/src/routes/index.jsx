import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../page/Dashboard";
import Products from "../page/Products";
import Customers from "../page/Customers";
import Retailers from "../page/Retailers";
import Post from "../page/Post";
import Statistic from "../page/Statistic";
import Category from "../page/Category";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [

      {
        index: true,
        path:"products",
        element: (
         <Products />
        ),
      },
      {
        path:"customers",
        element: (
         <Customers />
        ),
      },
      {
        path:"retailers",
        element: (
         <Retailers />
        ),
      },
      {
        path:"posts",
        element: (
         <Post />
        ),
      },

      {
        path:"statistic",
        element: (
         <Statistic />
        ),
      },
      {
        path:"categories",
        element: (
         <Category />
        ),
      },
    ],
  },
  
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
