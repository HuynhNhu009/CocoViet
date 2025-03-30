import { useEffect, useState } from "react";
import { adminAPI } from "../services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setLogin } from "../redux/adminSlice";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { p } from "framer-motion/client";

export const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.AdminStore.isLogin);
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();
  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await adminAPI.introspect();
        if (response.status === "OK") {
          dispatch(setAdmin(response.data));
          dispatch(setLogin(true));          
        } else {
          dispatch(setLogin(false));
        }
      } catch (error) {
        console.error("Error verifying auth in ProtectedRoute:", error);
        dispatch(setLogin(false));
      } finally {
        setIsLoading(false); 
      }
    };

    authenticate();
  }, [dispatch]);

  useEffect (()=>{
    if(location.path == '/') Navigate("/login")
  }, [location])

  // While checking auth, show nothing or a loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // After auth check, redirect to login if not authenticated, otherwise render Outlet
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};