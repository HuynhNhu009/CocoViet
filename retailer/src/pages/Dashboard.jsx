import { Bars3Icon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductForm from "../components/Product/AddProductForm";
import Navbar from "../components/Navbar";
import OrderList from "../components/Order/OrderList";
import ProductList from "../components/Product/ProductList";
import Profit from "../components/Profit/Profit";
import Sidebar from "../components/SideBar";
import UnitManager from "../components/UnitManager";
<<<<<<< HEAD
import {
  setLoadOrder,
  setOrder,
  setProducts,
  setStatus,
  setCategory,
  setUnits,
} from "../redux/retailerSlice";
=======
import { setLoadOrder, setOrder, setProducts, setRevenue, setStatus } from "../redux/retailerSlice";
>>>>>>> 9291f2d39170f70ce6ea8dc59088563191e799de
import { categoryApi } from "../services/categoryService";
import { orderAPI } from "../services/orderService";
import { productApi } from "../services/productService";
import { statusAPI } from "../services/statusService";
import { unitApi } from "../services/unitService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  const products = useSelector((state) => state.RetailerStore.products);
  const loadingRedux = useSelector((state) => state.RetailerStore.loading);
<<<<<<< HEAD
=======
  const statusStore = useSelector((state) => state.RetailerStore.statusStore);
>>>>>>> 9291f2d39170f70ce6ea8dc59088563191e799de
  const loadOrder = useSelector((state) => state.RetailerStore.loadOrder);
  const orderStatus = useSelector((state) => state.RetailerStore.orderStatus);
  const categoryStore = useSelector((state) => state.RetailerStore.category);
  const units = useSelector((state) => state.RetailerStore.units);

  const [activeTab, setActiveTab] = useState("orders");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [label, setLable] = useState("Đơn hàng");
  const [getOrderStatus, setGetOrderStatus] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchCategory = async () => {
    try {
      const responseData = await categoryApi.getAllCategory();
      console.log("Categories from API:", responseData);
      dispatch(setCategory(responseData.data));
      return responseData.data; // Return categories directly
    } catch (error) {
      console.error("Lỗi khi lấy danh mục (category):", error);
      dispatch(setCategory([]));
      return []; // Return empty array on error
    }
  };

  const fetchUnits = async () => {
    try {
      const responseData = await unitApi.getAllUnitsRetailerId(retailer.retailerId);
      console.log("Units from API:", responseData);
      dispatch(setUnits(responseData.data));
    } catch (error) {
      console.error("Lỗi khi lấy đơn vị:", error);
      dispatch(setUnits([]));
    }
  };

<<<<<<< HEAD
=======
  // order-delivered
  const fetchRevenue = async () => {
    try {
      const responseData = await orderAPI.getRevenue(retailer.retailerId, "DELIVERED");
      dispatch(setRevenue(responseData.data))      
    } catch (error) {
      console.log("Lỗi khi lấy Order:", error);
      dispatch(setOrder([]))
    } 
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (retailer?.retailerId && statusStore) {
      fetchRevenue();
    }

  }, [retailer, statusStore, loadOrder]);

  
  //status
>>>>>>> 9291f2d39170f70ce6ea8dc59088563191e799de
  const fetchStatus = async () => {
    try {
      const responseData = await statusAPI.getAllStatus();
      console.log("Status from API:", responseData.data);
      dispatch(setStatus(responseData.data));
    } catch (error) {
      console.error("Lỗi khi lấy status:", error);
      dispatch(setStatus([]));
    }
  };

  const fetchProducts = async (categories) => {
    try {
      const responseData = await productApi.getProductByRetailerId(retailer.retailerId);
      console.log("Products===========:", responseData);
      if (responseData.data !== null) {
        const formattedProducts = responseData.data.map((product) => ({
          id: product.productId,
          productName: product.productName,
          productDesc: product.productDesc,
          productOrigin: product.productOrigin,
          productImage: product.productImage,
          categories:
            product.categoryName && Array.isArray(product.categoryName)
              ? product.categoryName.map((name) => {
                  const matchedCategory = categories.find(
                    (cat) => cat.categoryId === name
                  );
                  console.log("fetchProduct:", matchedCategory);
                  return matchedCategory?.categoryId && matchedCategory?.categoryName
                    ? {
                        categoryId: matchedCategory.categoryId,
                        categoryName: matchedCategory.categoryName,
                      }
                    : "Default";
                })
              : ["Default"],
          variants: product.variants.map((v) => ({
            ...v,
            unitName: v.unitName || "Default",
          })),
          retailerName: product.retailerName,
          createdAt: product.createdAt,
        }));
        dispatch(setProducts(formattedProducts));
        console.log("Products FFFF:", formattedProducts);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      dispatch(setProducts([]));
    }
  };

  const fetchOrder = async () => {
    try {
      const responseData = await orderAPI.getAllOrdersByRetailerId(retailer.retailerId);
      dispatch(setOrder(responseData.data));
    } catch (error) {
      console.error("Lỗi khi lấy Order:", error);
      dispatch(setOrder([]));
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      if (!retailer?.retailerId) {
        setIsDataLoaded(true);
        return;
      }

      try {
        const categories = await fetchCategory(); // Get categories first
        await fetchUnits();                       // Then units
        await fetchStatus();                      // Then status
        await fetchProducts(categories);          // Pass categories to fetchProducts
        await fetchOrder();                       // Finally orders
      } catch (error) {
        console.error("Error loading all data:", error);
      } finally {
        setIsDataLoaded(true);
      }
    };

    loadAllData();
  }, [retailer, dispatch]);

  useEffect(() => {
    if (!isDataLoaded) return;

    fetchOrder();

<<<<<<< HEAD
    const interval = setInterval(() => {
      fetchOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadOrder, isDataLoaded]);

  useEffect(() => {
    if (orderStatus.length > 0) {
      setGetOrderStatus(orderStatus);
    } else {
      setGetOrderStatus([]);
    }
    dispatch(setLoadOrder(false));
  }, [orderStatus, dispatch]);
=======
     const interval = setInterval(() => {
       fetchOrder();
   }, 10000); 

   return () => clearInterval(interval);
  }, [loadOrder]);
>>>>>>> 9291f2d39170f70ce6ea8dc59088563191e799de

  const addProduct = async () => {
    try {
      await fetchProducts(categoryStore); // Use current categoryStore after add
      setActiveTab("products");
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Lỗi khi reload sản phẩm:", error);
    }
  };

  const updateUnits = () => {
    fetchUnits();
  };

  if (!isDataLoaded || loadingRedux) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  const tabContent = {
    orders: <OrderList orderStatus={getOrderStatus} />,
    products: <ProductList products={products} categories={categoryStore} />,
    "add-product": (
      <AddProductForm
        onAddProduct={addProduct}
        initialCategories={categoryStore}
        initialUnits={units}
        retailerId={retailer?.retailerId}
      />
    ),
    "unit-manager": (
      <UnitManager
        retailer={retailer}
        units={units}
        onUpdateUnits={updateUnits}
      />
    ),
    profit: <Profit />,
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-gray-200 min-h-[90vh] flex flex-col sm:px-4 lg:flex-row sm:gap-6">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          label={label}
          setLabel={setLable}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 sm:mt-8">
          <div className="bg-white px-4 sm:px-6 sm:rounded-lg sm:shadow-md">
            <div className="flex items-center pt-4 pb-2">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="sm:hidden"
              >
                <Bars3Icon className="size-6 text-gray-700" />
              </button>
              <h3 className="text-xl font-semibold uppercase ml-4 text-gray-700">
                {label}
                <hr className="mx-4 border-1" />
              </h3>
            </div>
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;