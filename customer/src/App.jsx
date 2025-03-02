import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import { useDispatch } from "react-redux";
import { customerApi } from "./services/customerService";
import { setLogin, logout } from "./redux/customerSlice";
import { setProductStore } from "./redux/productSlice";
import { setCreateOrder, setOrderList, setOrderStatus, setStatus, setStatusActive } from "./redux/orderSlice";
import { productAPI } from "./services/productService";
import { statusAPI } from "./services/statusService";
import { useSelector } from "react-redux";
import { orderAPI } from "./services/orderService";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch(); 
  const customer = useSelector((state) => state.CustomerStore.customer);
  const isLogin = useSelector((state) => state.CustomerStore.isLogin);
  const statusStore = useSelector((state) => state.OrderStore.status);    
  const orderList = useSelector((state) => state.OrderStore.orderList);    
  const statusActive = useSelector((state) => state.OrderStore.statusActive);    
  const createOrder = useSelector((state) => state.OrderStore.createOrder);    
  const location = useLocation();

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

  useEffect(() => {
    const fetchOrders = async () => {
      if (isLogin && customer) { 
        try {
          const response = await orderAPI.getOrderByCustomerId(customer.customerId);
          if (response.data) {
            dispatch(setOrderList(response.data));
            console.log("order",response.data);
            
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();

    dispatch(setCreateOrder(false));

    
  }, [isLogin, customer, dispatch, createOrder]);

  // 
  useEffect(() => {

      if(location.pathname != "/order"){
        dispatch(setStatusActive(null))
        console.log(location.pathname);
        console.log("statusActive". statusActive);
      }
  }, [location.pathname]);

  


  
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
