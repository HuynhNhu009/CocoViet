import { useEffect, useState } from "react";
import { adminAPI } from "../services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setLogin } from "../redux/adminSlice";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"; // Thêm useNavigate

export const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.AdminStore.isLogin);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // Khởi tạo useNavigate

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

  useEffect(() => {
    if (isLoading) return; 
    if (isLogin && location.pathname === "/") {
      navigate("/products"); 
    }
  }, [isLoading, isLogin, location, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};