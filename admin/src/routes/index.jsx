import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../page/Dashboard";
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
     
    ],
  },
  
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
