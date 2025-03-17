import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AllRoute from "./components/AllRoute";
import { logout, setLogin } from "./redux/customerSlice";
import {
  setCartCount,
  setCreateOrder,
  setPayment,
  setStatus,
  setStatusActive
} from "./redux/orderSlice";
import { setPost } from "./redux/postSlice";
import { setProductStore } from "./redux/productSlice";
import { customerApi } from "./services/customerService";
import { orderAPI } from "./services/orderService";
import { paymentAPI } from "./services/paymentService";
import { postApi } from "./services/postService";
import { productAPI } from "./services/productService";
import { statusAPI } from "./services/statusService";

function App() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.CustomerStore.customer);
  const isLogin = useSelector((state) => state.CustomerStore.isLogin);
  const createOrder = useSelector((state) => state.OrderStore.createOrder);
  const location = useLocation();
  // const posts = useSelector((state)=> state.PostStore.post)
  

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

    const status = async () => {
      try {
        const response = await statusAPI.getAllStatus();
        if (response.data) {
          dispatch(setStatus(response.data));
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    status();

    const payment = async () => {
      try {
        const response = await paymentAPI.getAllPayment();
        if (response.data) {
          dispatch(setPayment(response.data));
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    payment();


    const fetchData = async () => {
      try {
        const productResponse = await productAPI.getAllProductEnable();
        if (productResponse && productResponse.data) {
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
          const response = await orderAPI.getOrderByCustomerId(
            customer.customerId, "CART"
          );
          
          const filteredResults = response.data;
          let cartCount = 0;

            if (filteredResults.length > 0) {
              const lastCartOrder = filteredResults[filteredResults.length - 1];

              if (lastCartOrder.receiptDetails) {
                cartCount = lastCartOrder.receiptDetails.length;
              }
            }
            
            dispatch(setCartCount(cartCount));  
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();

    dispatch(setCreateOrder(false));
  }, [isLogin, customer, dispatch, createOrder]);

  useEffect(()=>{
    const post = async () => {
      try {
        const response = await postApi.getAllPosts();
        if (response.data) {
         dispatch(setPost(response.data));
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    post();
  },[dispatch]);

  useEffect(() => {
    if (location.pathname != "/order") {
      dispatch(setStatusActive(null));
    }
  }, [location.pathname]);

  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
