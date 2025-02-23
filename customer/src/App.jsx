import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import { useDispatch } from "react-redux";
import { customerApi } from "./services/customerService";
import { setLogin, logout } from "./redux/customerSlice";
import { data } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await customerApi.checkAuth();
        if (response.status === "OK") {
          dispatch(setLogin(response.data));
        } else if (response.data.status === "UNAUTHORIZED") {
          dispatch(logout());
          window.location.href = "/login"; // Điều hướng tới login
        }
      } catch (error) {
        // console.log(
        //   "Check auth failed:",
        //   error.response?.data || error.message
        // );
        // dispatch(logout());
        // window.location.href = "/login"; // Điều hướng nếu lỗi
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
