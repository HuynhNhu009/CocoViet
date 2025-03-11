import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../page/Dashboard";
import Products from "../page/Products";
import Customers from "../page/Customers";
import Retailers from "../page/Retailers";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
         <Dashboard />
        ),
      },
      {
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
     
    ],
  },
  
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
