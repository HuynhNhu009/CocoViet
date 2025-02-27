import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import { useDispatch } from "react-redux";
import { customerApi } from "./services/customerService";
import { setLogin, logout } from "./redux/customerSlice";
import { setProductStore } from "./redux/productSlice";
import { setStatus } from "./redux/orderSlice";
import { productAPI } from "./services/productService";
import { statusAPI } from "./services/statusService";
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
          window.location.href = "/login";
        }
      } catch (error) {}
    };

    const status = async() =>{
      try {
        const response = await statusAPI.getAllStatus();
        if(response.data){
          dispatch(setStatus(response.data))
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    }
    status();

        
    const fetchData = async () => {
      try {
        const productResponse = await productAPI.getAllProducts();
        if (productResponse && productResponse.data) {
          // setProducts(productResponse.data);
          dispatch(setProductStore(productResponse.data));
        }
      } catch (error) {
        console.log(error);
        
      }
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
