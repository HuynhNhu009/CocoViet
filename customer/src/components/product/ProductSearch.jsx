import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { productAPI } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { setProductStore } from "./../../redux/productSlice";

const ProductSearch = () => {
  const dispatch = useDispatch();

  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Lưu giá trị nhập vào input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await productAPI.getAllProducts();
        if (productResponse) {
          setOriginalProducts(productResponse.data);
          setProducts(productResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
    
  //fomart ("DUA", "   xo   dua  ")
  const removeDiacritics = (str) => {
    return str
      .normalize("NFD") //để tách dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu 
      .replace(/\s+/g, " ") // khoảng trắng
      .trim()
      .toLowerCase();
  };

  const handleSubmit = () => {
    if (!searchTerm.trim()) {
      dispatch(setProducts(originalProducts)); 
      return;
    }
    
    const searchNormalized = removeDiacritics(searchTerm);

    const filteredProducts = originalProducts.filter(
      (item) =>
        removeDiacritics(item.productDesc).includes(searchNormalized) ||
        removeDiacritics(item.productName).includes(searchNormalized)
    );

    dispatch(setProductStore(filteredProducts));
    setOriginalProducts(products);
    
  };

  

  return (
    <div className="mb-10">
      <div className="flex w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Chỉ cập nhật state, không lọc ngay
          placeholder="Search for..."
          className="border-green-600 border-3 shadow-md rounded-tl-3xl flex-grow px-4 py-2"
        />
        <button
          className="bg-green-600 shadow-md rounded-br-3xl p-2 px-8 cursor-pointer text-white"
          onClick={handleSubmit} // Khi bấm vào kính lúp, gọi hàm handleSubmit
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-white-500" />
        </button>
      </div>
    </div>
  );
};

export default ProductSearch;
