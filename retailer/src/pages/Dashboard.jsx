import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { setProducts } from "../redux/retailerSlice";

//------ components ------//
import Title from "../components/Title";
import Sidebar from "../components/SideBar";
import OrderList from "../components/OrderList";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import UnitManager from "../components/UnitManager";

//------ Api ------//
import { productApi } from "../services/productService";
import { unitApi } from "../services/unitService";

//------ Dashboard ------//
const Dashboard = () => {
  //------ redux ------//
  const dispatch = useDispatch();
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  const products = useSelector((state) => state.RetailerStore.products);
  const loadingRedux = useSelector((state) => state.RetailerStore.loading);

  //------ state ------//
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //------ fetch unit ------//
  const fetchUnits = async () => {
    try {
      setLoading(true);
      const responseData = await unitApi.getAllUnits();
      console.log("Units from API:", responseData);
      setUnits(responseData.data); // Lưu mảng object { unitId, unitName }
    } catch (error) {
      console.error("Lỗi khi lấy đơn vị:", error);
      setUnits([]);
    } finally {
      setLoading(false);
    }
  };

  //------ useEffect ------//
  useEffect(() => {
    //------ fetch product ------//
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const responseData = await productApi.getProductByRetailerId(
          retailer.retailerId
        );
        console.log("Products:", responseData);

        const formattedProducts = responseData.data.map((product) => ({
          id: product.productId,
          productName: product.productName,
          productDesc: product.productDesc,
          productOrigin: product.productOrigin,
          productImage: product.productImage,
          categoryId: product.categoryName,
          variants: product.variants.map((v) => ({
            ...v,
            unit: v.unit || "Default",
          })),
          retailerName: product.retailerName,
          createdAt: product.createdAt,
        }));

        dispatch(setProducts(formattedProducts));
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    if (retailer?.retailerId) {
      fetchProducts();
    }
    fetchUnits();
  }, [retailer, dispatch]);

  //------ add product ------//
  const addProduct = async (newProduct) => {
    const formattedProduct = {
      ...newProduct,
      id: newProduct.id || Date.now(),
      productId: newProduct.id || Date.now().toString(),
      categoryName: newProduct.categoryId,
      variants: Object.values(newProduct.variantsByCategory).flat(),
    };
    dispatch(setProducts([...products, formattedProduct]));

    const { productImage, ...productData } = formattedProduct;

    console.log("productData", productData);

    productApi.addProduct(productData, productImage);

    console.log("fort-image", productImage);

    // Kiểm tra và thêm đơn vị mới nếu chưa có
    const allVariantUnits = formattedProduct.variants.map((v) => v.unit);
    for (const unitName of allVariantUnits) {
      if (!units.some((u) => u.unitName === unitName)) {
        try {
          await unitApi.addUnit({ unitName });
          console.log(`Added new unit: ${unitName}`);
          await fetchUnits(); // Làm mới danh sách units sau khi thêm
        } catch (error) {
          console.error(`Lỗi khi thêm đơn vị ${unitName}:`, error);
        }
      }
    }

    setActiveTab("products");
    setIsSidebarOpen(false);
  };

  //------ update unit ------//
  const updateUnits = () => {
    fetchUnits(); // Làm mới danh sách units từ API
  };

  const tabContent = {
    orders: <OrderList orders={orders} />,
    products: <ProductList />,
    "add-product": (
      <AddProductForm
        onAddProduct={addProduct}
        initialCategories={products
          .flatMap((p) => p.categoryId)
          .filter((v, i, a) => a.indexOf(v) === i)}
        initialUnits={units.map((u) => u.unitName)} // Truyền mảng unitName
      />
    ),
    "unit-manager": <UnitManager units={units} onUpdateUnits={updateUnits} />,
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
