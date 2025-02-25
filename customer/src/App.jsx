import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import { useDispatch } from "react-redux";
import { customerApi } from "./services/customerService";
import { setLogin, logout } from "./redux/customerSlice";
import { setProductStore } from "./redux/productSlice";
import { productAPI } from "./services/productService";
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
      } catch (error) {}
    };

    const fetchData = async () => {
      try {
        const productResponse = await productAPI.getAllProducts();
        if (productResponse && productResponse.data) {
          // setProducts(productResponse.data);
          dispatch(setProductStore(productResponse.data));
        }
      } catch (error) {}
    };
    fetchData();

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
