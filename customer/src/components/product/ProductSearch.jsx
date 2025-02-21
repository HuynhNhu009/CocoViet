import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductSearch, setActive } from "./../../redux/productSlice";
import { useNavigate } from "react-router-dom";
const ProductSearch = () => {
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.ProductStore.productStore);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(productStore);
  }, [productStore]);

  const removeDiacritics = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };


  const handleSubmit = () => {
    if (!searchTerm.trim()) {
      setProducts(productStore); 
      return;
    }

    const searchNormalized = removeDiacritics(searchTerm);

    const filteredProducts = productStore.filter(
      (item) =>
        removeDiacritics(item.productDesc).includes(searchNormalized) ||
        removeDiacritics(item.productName).includes(searchNormalized)
    );
    // navigate("/products");
    setProducts(filteredProducts); 
    dispatch(setProductSearch(filteredProducts)); 
  };

  const handleBlur = () => {
    setTimeout(() => setSearchTerm(""), 1000); // Đợi 200ms trước khi xóa
  };
  

  return (
    <div className="mb-10">
      <div className="flex w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => dispatch(setActive(null))} 
          onBlur={handleBlur}
          placeholder="Search for..."
          className="border-green-600 border-3 shadow-md focus:outline-none rounded-tl-3xl flex-grow px-4 py-2"
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="bg-green-600 shadow-md rounded-br-3xl p-2 px-8 cursor-pointer text-white"
          onClick={handleSubmit}
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-white-500" />
        </button>
      </div>
    </div>
  );
};

export default ProductSearch;
