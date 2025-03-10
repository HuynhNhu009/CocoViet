import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../page/Dashboard";
import ProductList from "../components/Product/ProductList";
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
         <ProductList />
        ),
      },
     
    ],
  },
  
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
