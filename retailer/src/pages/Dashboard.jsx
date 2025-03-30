import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductForm from "../components/Product/AddProductForm";
import Navbar from "../components/Navbar";
import OrderList from "../components/Order/OrderList";
import ProductList from "../components/Product/ProductList";
import Profit from "../components/Profit/Profit";
import Sidebar from "../components/SideBar";
import UnitManager from "../components/UnitManager";
import CreatePost from "../components/Post/CreatePost";
import PostList from "../components/Post/PostList";
import {
  setLoadOrder,
  setOrder,
  setProducts,
  setStatus,
  setCategory,
  setUnits,
  setRevenue,
  setLoading,
  setPosts,
} from "../redux/retailerSlice";
import { categoryApi } from "../services/categoryService";
import { orderAPI } from "../services/orderService";
import { productApi } from "../services/productService";
import { statusAPI } from "../services/statusService";
import { unitApi } from "../services/unitService";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { postApi } from "../services/PostService";

const Dashboard = () => {
  const dispatch = useDispatch();

  const retailer = useSelector((state) => state.RetailerStore.retailer);
  const products = useSelector((state) => state.RetailerStore.products);
  const loadingRedux = useSelector((state) => state.RetailerStore.loading);
  const statusStore = useSelector((state) => state.RetailerStore.statusStore);
  const loadOrder = useSelector((state) => state.RetailerStore.loadOrder);
  const orderStatus = useSelector((state) => state.RetailerStore.orderStatus);
  const categoryStore = useSelector((state) => state.RetailerStore.category);
  const units = useSelector((state) => state.RetailerStore.units);
  const posts = useSelector((state) => state.RetailerStore.posts);

  const [activeTab, setActiveTab] = useState("orders");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [label, setLabel] = useState("Đơn hàng");
  const [getOrderStatus, setGetOrderStatus] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchCategory = async () => {
    try {
      const responseData = await categoryApi.getAllCategory();
      console.log("Categories from API:", responseData);
      dispatch(setCategory(responseData.data));
      return responseData.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh mục (category):", error);
      dispatch(setCategory([]));
      return [];
    }
  };

  const fetchUnits = async () => {
    try {
      const responseData = await unitApi.getAllUnitsRetailerId(
        retailer.retailerId
      );
      console.log("Units from API:", responseData);
      dispatch(setUnits(responseData.data));
    } catch (error) {
      console.error("Lỗi khi lấy đơn vị:", error);
      dispatch(setUnits([]));
    }
  };

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

  const fetchProducts = async (categories = categoryStore) => {
    try {
      const responseData = await productApi.getProductByRetailerId(
        retailer.retailerId
      );
      console.log("Products===========:", responseData);
      const productData = Array.isArray(responseData.data)
        ? responseData.data
        : [];
      const formattedProducts = productData.map((product) => ({
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
                return matchedCategory?.categoryId &&
                  matchedCategory?.categoryName
                  ? {
                      categoryId: matchedCategory.categoryId,
                      categoryName: matchedCategory.categoryName,
                    }
                  : { categoryId: "default", categoryName: "Default" };
              })
            : [{ categoryId: "default", categoryName: "Default" }],
        variants: product.variants.map((v) => ({
          ...v,
          unitName: v.unitName || "Default",
        })),
        retailerName: product.retailerName,
        status: product.status,
        createdAt: product.createdAt,
      }));
      dispatch(setProducts(formattedProducts));
      // console.log("Products FFFF:", formattedProducts);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      dispatch(setProducts([]));
    }
  };

  const fetchOrder = async () => {
    try {
      const responseData = await orderAPI.getAllOrdersByRetailerId(
        retailer.retailerId
      );
      dispatch(setOrder(responseData.data));
    } catch (error) {
      console.error("Lỗi khi lấy Order:", error);
      dispatch(setOrder([]));
    }
  };

  const fetchPosts = async () => {
    try {
      const responseData = await postApi.getPostByRetailerId(
        retailer.retailerId
      );
      dispatch(setPosts(responseData.data));
      // console.log("Post===========", responseData.data, retailer.retailerId);
    } catch (error) {
      console.error("Lỗi khi lấy Posts:", error);
      dispatch(setPosts([]));
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(() => {
      fetchOrder();
      fetchProducts();
    }, 5000);
    return () => clearInterval(interval);
  }, [loadOrder]);

  const fetchRevenue = async () => {
    try {
      const responseData = await orderAPI.getRevenue(retailer.retailerId);
      dispatch(setRevenue(responseData.data));

      console.log("-----", responseData.data);
    } catch (error) {
      console.log("Lỗi khi lấy Order:", error);
      dispatch(setOrder([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (retailer?.retailerId && statusStore) {
      fetchRevenue();
    }
  }, [retailer, statusStore, activeTab]);

  useEffect(() => {
    const loadAllData = async () => {
      if (!retailer?.retailerId) {
        setIsDataLoaded(true);
        return;
      }

      try {    
        const categories = await fetchCategory();
        await fetchUnits();
        await fetchStatus();
        await fetchProducts(categories); // Truyền categories mới nhất
        await fetchOrder();
        await fetchPosts();
      } catch (error) {
        console.error("Error loading all data:", error);
      } finally {
        setIsDataLoaded(true);
      }
    };

    loadAllData();
  }, [retailer, dispatch]);

  useEffect(() => {
    if (orderStatus.length > 0) {
      setGetOrderStatus(orderStatus);
    } else {
      setGetOrderStatus([]);
    }
    dispatch(setLoadOrder(false));
  }, [orderStatus, dispatch]);

  const addProduct = async () => {
    try {
      await fetchProducts(); // Tải lại sản phẩm sau khi thêm
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
    products: (
      <ProductList
        products={products}
        categories={categoryStore}
        fetchProducts={fetchProducts}
      />
    ),
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
    post: (
      <PostList retailer={retailer} posts={posts} fetchPosts={fetchPosts} />
    ),
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-white min-h-[85vh] flex flex-col sm:px-4 lg:flex-row sm:gap-6">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          label={label}
          setLabel={setLabel}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 sm:mt-8">
          <div className="bg-white px-4 pb-10 mb-10 sm:px-6 sm:rounded-lg sm:shadow-md">
            <div className="flex items-center pt-4 pb-2">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="sm:hidden"
              >
                <Bars3Icon className="size-6 text-gray-700" />
              </button>
            </div>
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
