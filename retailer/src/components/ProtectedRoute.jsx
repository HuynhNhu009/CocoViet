// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLogin, logout } from "../redux/retailerSlice"; // Import actions
import { retailerApi } from "../services/RetailerService";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isRetailerLogin = useSelector(
    (state) => state.RetailerStore.isRetailerLogin
  );
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await retailerApi.checkAuth();
        console.log("ProtectedRoute response:", response);
        if (response.status === "OK") {
          dispatch(setLogin(response.data)); // Lưu vào Redux
        } else {
          dispatch(logout()); // Reset Redux state
        }
      } catch (error) {
        console.error("Error verifying auth in ProtectedRoute:", error);
        dispatch(logout());
      } finally {
        setAuthChecked(true);
      }
    };
    if (!authChecked) {
      verifyAuth();
    }
  }, [dispatch, authChecked]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return isRetailerLogin ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isRetailerLogin = useSelector(
    (state) => state.RetailerStore.isRetailerLogin
  );
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await retailerApi.checkAuth();
        console.log("PublicRoute response:", response);
        if (response.status === "OK") {
          dispatch(setLogin(response.data)); // Lưu vào Redux
        } else {
          dispatch(logout()); // Reset Redux state
        }
      } catch (error) {
        console.error("Error verifying auth in PublicRoute:", error);
        dispatch(logout());
      } finally {
        setAuthChecked(true);
      }
    };
    if (!authChecked) {
      verifyAuth();
    }
  }, [dispatch, authChecked]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return isRetailerLogin ? <Navigate to="/dashboard" replace /> : children;
};

export { ProtectedRoute, PublicRoute };
