import {
  BuildingStorefrontIcon,
  CircleStackIcon,
  CubeIcon,
  DocumentTextIcon,
  TagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setcategory,
  setCategoryActive,
  setCustomer,
  setLoadingAPI,
  setOrder,
  setOrderByRetailer,
  setOrderChart,
  setPost,
  setPostFilter,
  setPostRetailerActive,
  setProduct,
  setProductStatusActive,
  setRetailer,
  setRetailerActive,
  setRetailerProduct,
  setRevenueList,
  setStatus,
  setUpdate,
} from "../../redux/adminSlice";
import { productAPI } from "../../services/productService";
import { customerApi } from "../../services/customerService";
import { retailerAPI } from "../../services/retailerService";
import { postApi } from "../../services/postService";
import { orderAPI } from "../../services/orderService";
import { statusAPI } from "../../services/statusService";
import { categoryAPI } from "../../services/categoryService";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sideBarActive, setsideBarActive] = useState();
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const orderStore = useSelector((state) => state.AdminStore.orderStore);
  const statusStore = useSelector((state) => state.AdminStore.statusStore);
  const revenueRetailerActive = useSelector((state) => state.AdminStore.revenueRetailerActive);
  const update = useSelector((state) => state.AdminStore.update);
  const loadingAPI = useSelector((state) => state.AdminStore.loadingAPI);

  const navItems = [
    {
      label: "Sản phẩm",
      icon: <CubeIcon className="size-5" />,
      path: "/products",
    },
    {
      label: "Bài viết",
      icon: <DocumentTextIcon className="size-5" />,
      path: "/posts",
    },
    {
      label: "Khách hàng",
      icon: <UsersIcon className="size-5" />,
      path: "/customers",
    },
    {
      label: "Cửa hàng",
      icon: <BuildingStorefrontIcon className="size-5" />,
      path: "/retailers",
    },
    {
      label: "Thống kê",
      icon: <CircleStackIcon className="size-5" />,
      path: "/statistic",
    },
    {
      label: "Danh mục sản phẩm",
      icon: <TagIcon className="size-5" />,
      path: "/categories",
    },
  ];

  const customers = async () => {
    try {
      const response = await customerApi.getAllCustomers();
      if (response.data) {
        dispatch(setCustomer(response.data));
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };
  const products = async () => {
    try {
      const response = await productAPI.getAllProducts();
      if (response.data) {
        dispatch(setProduct(response.data));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const retailers = async () => {
    try {
      const response = await retailerAPI.getAllRetailer();
      if (response.data) {
        dispatch(setRetailer(response.data));
      }
    } catch (error) {
      console.error("Error fetching retailer:", error);
    }
  };

  const posts = async () => {
    try {
      const response = await postApi.getAllPosts();
      if (response.data) {
        dispatch(setPost(response.data));
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const orders = async () => {
    try {
      const response = await orderAPI.getAllOrders();
      if (response.data) {
        dispatch(setOrder(response.data));
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const status = async () => {
    try {
      const response = await statusAPI.getAllStatus();
      if (response.data) {
        dispatch(setStatus(response.data));
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const getAllRevenue = async () => {
    try {
      const response = await orderAPI.getAllRevenue();
      if (response.data) {
        dispatch(setRevenueList(response.data[0]));
        
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      if (response.data) {
        dispatch(setcategory(response.data));
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  //fetch
  useEffect(() => {
    orders();
    status();
    getAllRevenue();
    posts();
    products();
    customers();
    retailers();
    dispatch(setLoadingAPI(false));
  }, [dispatch, sideBarActive, loadingAPI ]);

  useEffect(() => {
    getAllCategories();    
    dispatch(setUpdate(true));
  }, [dispatch, sideBarActive,update ]);

  const handleNavigate = (path) => {
    if (path === "/products" || path === "/posts") {
      dispatch(setCategoryActive("allProduct"));
      dispatch(setProductStatusActive("allProduct"));
      dispatch(setRetailerActive("allProduct"));
      dispatch(setPostRetailerActive("allPost"));
    }
    navigate(path);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/products");
    }
  }, [location, navigate]);

  //filter product, order by retailerId
  useEffect(() => {
    const fetchProducts = async () => {
      if (productStore.length < 0) {
        console.log("Product not found");
        return;
      }

      if (retailerStore.length < 0) {
        console.log("retailer not found");
        return;
      }
      if (orderStore.length < 0) {
        console.log("Order not found");
        return;
      }

      try {
        const productPromises = retailerStore.map((retailer) =>
          productAPI
            .getProductByRetailerId(retailer.retailerId)
            .then((response) => ({
              retailerId: retailer.retailerId,
              products: response.data,
            }))
        );

        const productsByRetailer = await Promise.all(productPromises);
        dispatch(setRetailerProduct(productsByRetailer));
        
        //order
        const orderPromises = retailerStore.map((retailer) =>
          orderAPI
            .getAllOrdersByRetailerId(retailer.retailerId)
            .then((response) => ({
              retailerId: retailer.retailerId,
              orders: response.data
                .flatMap((order) =>
                  order.receiptDetails
                    ?.filter((detail) => detail.statusName === "Đã Giao")
                    .map(() => ({
                      orderDate: order.orderDate,
                      totalQuantity: order.receiptDetails.reduce(
                        (sum, detail) => sum + (detail.totalQuantity || 0),
                        0
                      ),
                    }))
                ),
            }))
        );

        const OrderByRetailer = await Promise.all(orderPromises);
        dispatch(setOrderByRetailer(OrderByRetailer));

      } catch (error) {
        console.error("Error fetching products by retailers:", error);
      }
    };
    fetchProducts();    
  }, [retailerStore, revenueRetailerActive]);
  

  //chart in StatisticPage
  useEffect(() => {
    if (!orderStore || !statusStore) return;
  
    const getStatus = statusStore.find(
      (item) => item.statusCode === "DELIVERED"
    );
  
    if (!getStatus) return; 
  
    const filteredResults = orderStore.filter((item) =>
      item.receiptDetails?.some(
        (detail) => detail.statusName === getStatus.statusName
      )
    );
  
    const ordersChart = filteredResults.map((order) => ({
      orderDate: order.orderDate,
      totalQuantity: order.receiptDetails?.reduce(
        (sum, detail) => sum + (detail.totalQuantity || 0),
        0
      ),
    }));
  
    dispatch(setOrderChart(ordersChart));
  }, [orderStore, statusStore]);
  

  return (
    <>
      {/* Sidebar cho mobile */}
      {/* <div className="fixed z-20 inset-y-0 left-0 w-64 bg-white p-5 shadow-lg lg:hidden">
        <div className="flex justify-between items-center pt-20 mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Menu</h3>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-md">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div> */}

      {/* Sidebar cho desktop */}
      <div className="sticky ml-3 h-[680px] hidden lg:block lg:w-64 flex-shrink-0 bg-white p-5 rounded-lg shadow-md">
        <nav className="flex flex-col gap-3 flex-grow">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                handleNavigate(item.path), setsideBarActive(item.label);
              }}
              className={`flex items-center gap-2 py-3 px-4 bg-gray-100 
                rounded-md cursor-pointer ${
                  sideBarActive === item.label ? "bg-gray-950 text-white" : ""
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="text-gray-500 text-xs text-center py-2 border-t mt-60">
          Phiên bản: <span className="font-semibold">1.0.3</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
