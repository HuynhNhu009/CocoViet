import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Gửi token lên server để xác thực nếu cần (tuỳ backend)
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        dispatch(setLogin(userData));
      }
    }
  }, [dispatch]);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
