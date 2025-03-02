import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { setProducts } from "../redux/retailerSlice";
import Title from "../components/Title";
import Sidebar from "../components/SideBar";
import OrderList from "../components/OrderList";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import UnitManager from "../components/UnitManager";
import { categoryApi } from "../services/categoryService";
import { productApi } from "../services/productService";
import { unitApi } from "../services/unitService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  const products = useSelector((state) => state.RetailerStore.products);
  const loadingRedux = useSelector((state) => state.RetailerStore.loading);

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const responseData = await unitApi.getAllUnitsRetailerId(retailer.retailerId);
      console.log("Units from API:", responseData);
      setUnits(responseData.data);
    } catch (error) {
      console.error("Lỗi khi lấy đơn vị:", error);
      setUnits([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const responseData = await categoryApi.getAllCategory();
      console.log("Categories from API:", responseData);
      setCategories(responseData.data); // [{categoryId, categoryName}]
    } catch (error) {
      console.log("Lỗi khi lấy danh mục (category):", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const responseData = await productApi.getProductByRetailerId(
        retailer.retailerId
      );
      console.log("Products:", responseData);
      if (responseData.data !== null) {
        const formattedProducts = responseData.data.map((product) => ({
          id: product.productId,
          productName: product.productName,
          productDesc: product.productDesc,
          productOrigin: product.productOrigin,
          productImage: product.productImage,
          categoryId: Array.isArray(product.categoryName)
            ? product.categoryName
            : [product.categoryName],
          variants: product.variants.map((v) => ({
            ...v,
            unit: v.unit || "Default",
          })),
          retailerName: product.retailerName,
          createdAt: product.createdAt,
        }));
        dispatch(setProducts(formattedProducts));
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (retailer?.retailerId) {
      fetchProducts();
    }
    fetchCategory();
    fetchUnits();
  }, [retailer, dispatch]);

  const addProduct = async () => {
    try {
      // Gọi lại API để lấy danh sách sản phẩm mới nhất
      await fetchProducts();
      setActiveTab("products");
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Lỗi khi reload sản phẩm:", error);
    }
  };

  const updateUnits = () => {
    fetchUnits();
  };

  const tabContent = {
    orders: <OrderList orders={orders} />,
    products: <ProductList />,
    "add-product": (
      <AddProductForm
        onAddProduct={addProduct}
        initialCategories={categories}
        initialUnits={units}
        retailerId={retailer?.retailerId} // Truyền retailerId từ Redux store
      />
    ),
    "unit-manager": <UnitManager retailer={retailer} units={units} onUpdateUnits={updateUnits} />,
  };

  if (loading || loadingRedux) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-200 pt-10 px-4 flex flex-col lg:flex-row gap-6">
      <div className="lg:hidden flex justify-between items-center mb-4">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Bars3Icon className="size-6 text-gray-700" />
        </button>
        <Title
          text1={"DASHBOARD"}
          text2={retailer?.retailerName || "Retailer"}
        />
        <BellIcon className="size-6 text-gray-700" />
      </div>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1">
        <div className="hidden lg:flex justify-between items-center mb-6">
          <Title
            text1={"DASHBOARD"}
            text2={retailer?.retailerName || "Retailer"}
          />
          <BellIcon className="size-7 text-gray-700" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
