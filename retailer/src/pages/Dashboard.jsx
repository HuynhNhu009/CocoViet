import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { setProducts } from "../redux/retailerSlice";
import Title from "../components/Title";
import Sidebar from "../components/SideBar";
import OrderList from "../components/OrderList";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import CategoryManager from "../components/CategoryManager";
import { productApi } from "../services/ProductService";
import { categoryApi } from "../services/categoryService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  const products = useSelector((state) => state.RetailerStore.products);
  const loadingRedux = useSelector((state) => state.RetailerStore.loading);

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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
          categoryId: product.categoryName, // categoryName từ backend là mảng chuỗi
          variantsByCategory: {
            [product.categoryName[0] || "Default"]: product.variants,
          },
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

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const responseData = await categoryApi.getAllCategory();
        console.log("Categories:", responseData);

        const formattedCategories = responseData.data.map((cat) => ({
          categoryId: cat.categoryId,
          categoryName: cat.categoryName,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    if (retailer?.retailerId) {
      fetchProducts();
    }
    fetchCategories();
  }, [retailer, dispatch]);

  const addProduct = (newProduct) => {
    // Chuyển categoryId từ tên (categoryName) sang categoryId thực tế nếu khớp với backend
    const matchedCategoryIds = newProduct.categoryId.map((catName) => {
      const matchedCat = categories.find((c) => c.categoryName === catName);
      return matchedCat ? matchedCat.categoryId : catName; // Nếu không khớp, giữ nguyên tên (cho trường hợp danh mục mới)
    });

    const formattedProduct = {
      ...newProduct,
      id: newProduct.id || Date.now(),
      productId: newProduct.id || Date.now().toString(),
      categoryName: newProduct.categoryId,
      variants: Object.values(newProduct.variantsByCategory).flat(),
    };
    dispatch(setProducts([...products, formattedProduct]));
    
    //postProductt
    const { productImage, ...productData } = formattedProduct;

    console.log("productData", productData);
    
    productApi.addProduct(productData, productImage);

    console.log("fort-image", productImage);
    //end-post


    newProduct.categoryId.forEach((catName) => {
      if (!categories.some((c) => c.categoryName === catName)) {
        setCategories((prev) => [
          ...prev,
          { categoryId: crypto.randomUUID(), categoryName: catName }, // Tạo categoryId tạm
        ]);
      }
    });
    setActiveTab("products");
    setIsSidebarOpen(false);
  };

  const updateCategories = (updatedCategories) => {
    // to object
    const newCategories = updatedCategories.map((catName) => {
      const existingCat = categories.find((c) => c.categoryName === catName);
      return (
        existingCat || {
          categoryId: crypto.randomUUID(),
          categoryName: catName,
        }
      );
    });
    setCategories(newCategories);

    // Cập nhật products
    const updatedProducts = products.map((product) => ({
      ...product,
      categoryId: product.categoryId.filter((catName) =>
        newCategories.some((c) => c.categoryName === catName)
      ),
      variantsByCategory: Object.fromEntries(
        Object.entries(product.variantsByCategory).filter(([cat]) =>
          newCategories.some((c) => c.categoryName === cat)
        )
      ),
    }));
    dispatch(setProducts(updatedProducts));
  };

  const tabContent = {
    orders: <OrderList orders={orders} />,
    products: <ProductList />,
    "add-product": (
      <AddProductForm
        onAddProduct={addProduct}
        initialCategories={categories.map((c) => c.categoryName)}
      />
    ),
    "category-manager": (
      <CategoryManager
        categories={categories.map((c) => c.categoryName)}
        onUpdateCategories={updateCategories}
      />
    ),
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
