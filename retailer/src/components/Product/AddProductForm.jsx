// import React, { useState } from "react";
// import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
// import UploadImage from "../UpLoadImage";
// import { productApi } from "../../services/productService";


// const AddProductForm = ({
//   onAddProduct,
//   initialCategories = [],
//   initialUnits = [],
//   retailerId,
// }) => {
//   const [newProduct, setNewProduct] = useState({
//     productName: "",
//     productDesc: "",
//     retailerId: retailerId || "",
//     productImage: "",
//     productOrigin: "",
//     variants: [],
//     categoryId: [],
//   });

//   const categories = initialCategories.length > 0 ? initialCategories : [];

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [isAddingVariantInline, setIsAddingVariantInline] = useState(false);
//   const [newVariant, setNewVariant] = useState({
//     unitId: "",
//     value: "",
//     price: "",
//     initStock: "",
//   });
//   const [file, setFile] = useState(null);
//   const [variantErrors, setVariantErrors] = useState("");

//   const handleImageUpload = (selectedFile) => {
//     setFile(selectedFile);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCategoryToggle = (categoryId) => {
//     setNewProduct((prev) => {
//       const updatedCategories = prev.categoryId.includes(categoryId)
//         ? prev.categoryId.filter((cat) => cat !== categoryId)
//         : [...prev.categoryId, categoryId];
//       return {
//         ...prev,
//         categoryId: updatedCategories,
//       };
//     });
//   };

//   const handleVariantChange = (e) => {
//     const { name, value } = e.target;
//     setNewVariant((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateVariant = () => {
//     if (
//       !newVariant.unitId ||
//       !newVariant.value ||
//       !newVariant.price ||
//       !newVariant.initStock
//     ) {
//       setVariantErrors("Tất cả các trường phải được điền.");
//       return false;
//     }
//     const value = parseInt(newVariant.value);
//     const price = parseInt(newVariant.price);
//     const initStock = parseInt(newVariant.initStock);
//     if (
//       isNaN(value) ||
//       value <= 0 ||
//       isNaN(price) ||
//       price <= 0 ||
//       isNaN(initStock) ||
//       initStock < 0
//     ) {
//       setVariantErrors("Số lượng, giá phải > 0, tồn kho phải >= 0.");
//       return false;
//     }
//     return true;
//   };

//   const handleAddVariant = () => {
//     if (!validateVariant()) return;

//     const unit = initialUnits.find((u) => u.unitId === newVariant.unitId);
//     const variant = {
//       unitId: newVariant.unitId,
//       value: parseInt(newVariant.value),
//       price: parseInt(newVariant.price),
//       initStock: parseInt(newVariant.initStock),
//       unit: unit ? unit.unitName : "",
//     };

//     setNewProduct((prev) => ({
//       ...prev,
//       variants: [...prev.variants, variant],
//     }));
//     setNewVariant({ unitId: "", value: "", price: "", initStock: "" });
//     setVariantErrors("");
//     setIsAddingVariantInline(false);
//   };

//   const handleDeleteVariant = (index) => {
//     setNewProduct((prev) => ({
//       ...prev,
//       variants: prev.variants.filter((_, i) => i !== index),
//     }));
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     if (newProduct.categoryId.length === 0) {
//       setMessage("Vui lòng chọn ít nhất một danh mục.");
//       return;
//     }
//     if (newProduct.variants.length === 0) {
//       setMessage("Vui lòng thêm ít nhất một loại sản phẩm.");
//       return;
//     }
//     setLoading(true);
//     setMessage(null);
  
//     const productToAdd = {
//       productName: newProduct.productName,
//       productDesc: newProduct.productDesc,
//       retailerId: newProduct.retailerId,
//       productOrigin: newProduct.productOrigin,
//       categoryId: newProduct.categoryId,
//       productVariants: newProduct.variants.map((v) => ({
//         unitId: v.unitId,
//         value: v.value,
//         price: v.price,
//         initStock: v.initStock,
//       })),
//     };
  
//     try {
//       const response = await productApi.addProduct(productToAdd, file);
      
//       await onAddProduct();
  
//       setNewProduct({
//         productName: "",
//         productDesc: "",
//         retailerId: retailerId || "",
//         productImage: "",
//         productOrigin: "",
//         variants: [],
//         categoryId: [],
//       });
//       setFile(null);
//       setMessage("Thêm sản phẩm thành công!");
//     } catch (error) {
//       if (error.response) {
//         const httpStatus = error.response.status;
//         const responseStatus = error.response.data.status;
//         const errorMsg = error.response.data.msg || "Lỗi không xác định";
  
//         if (httpStatus === 400 && responseStatus === "PRODUCT_ALREADY_EXISTS") {
//           setMessage("Tên sản phẩm đã tồn tại, vui lòng chọn tên khác!");
//         } else if (httpStatus === 400 && responseStatus === "INVALID_INPUT") {
//           setMessage(`Dữ liệu không hợp lệ: ${errorMsg}`);
//         } else if (httpStatus === 400) {
//           setMessage(`Thêm sản phẩm thất bại: ${errorMsg}`);
//         } else if (httpStatus === 500) {
//           setMessage(`Lỗi server: ${errorMsg}`);
//         } else {
//           setMessage(`Thêm sản phẩm thất bại: ${errorMsg}`);
//         }
//       } else {
//         setMessage("Thêm sản phẩm thất bại: Lỗi kết nối server hoặc dữ liệu không hợp lệ!");
//       }
//       console.error("Error adding product:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {message && (
//         <div
//           className={`p-2 mb-4 text-center rounded-md ${
//             message.includes("thành công")
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//       <form
//         onSubmit={handleAddProduct}
//         className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0"
//       >
//         {/* Cột 1: Thông tin sản phẩm */}
//         <div className="space-y-6">
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700">
//               Tên sản phẩm
//             </label>
//             <input
//               type="text"
//               name="productName"
//               value={newProduct.productName}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700">
//               Mô tả sản phẩm
//             </label>
//             <textarea
//               name="productDesc"
//               value={newProduct.productDesc}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               rows="3"
//               disabled={loading}
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700">
//               Nguồn gốc
//             </label>
//             <input
//               type="text"
//               name="productOrigin"
//               value={newProduct.productOrigin}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               disabled={loading}
//             />
//           </div>
//           <div className="relative">
//             <UploadImage onImageChange={handleImageUpload} disabled={loading} />
//           </div>
//         </div>

//         {/* Cột 2: Danh mục và Loại */}
//         <div className="space-y-6">
//           {/* Chọn danh mục */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Danh mục sản phẩm
//             </label>
//             <div className="min-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
//               {categories.length === 0 ? (
//                 <p className="text-gray-500 text-sm">Chưa có danh mục nào.</p>
//               ) : (
//                 categories.map((cat) => (
//                   <div
//                     key={cat.categoryId}
//                     className="flex items-center gap-2 py-1 "
//                   >
//                     <input
//                       type="checkbox"
//                       checked={newProduct.categoryId.includes(cat.categoryId)}
//                       onChange={() => handleCategoryToggle(cat.categoryId)}
//                       disabled={loading}
//                       className=" w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                     />
//                     <span className="text-gray-700">{cat.categoryName}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Quản lý loại */}
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <label className="block text-sm font-medium text-gray-700">
//                 Loại sản phẩm
//               </label>
//               <button
//                 type="button"
//                 onClick={() => setIsAddingVariantInline(true)}
//                 className={`${isAddingVariantInline ? "hidden" :""} p-2 bg-gray-100 rounded-md hover:bg-gray-200`}
//                 disabled={loading}
//                 aria-label="Thêm loại mới"
//               >
//                 <PlusIcon className="size-5 text-gray-600" />
//               </button>
//             </div>
//             {/* Form inline thêm variant */}
//             {isAddingVariantInline && (
//               <div className="grid grid-cols-4 gap-2 mt-2">
//                 <input
//                   type="number"
//                   name="value"
//                   value={newVariant.value}
//                   onChange={handleVariantChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Số lượng"
//                   disabled={loading}
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={newVariant.price}
//                   onChange={handleVariantChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Giá"
//                   disabled={loading}
//                 />
//                 <select
//                   name="unitId"
//                   value={newVariant.unitId}
//                   onChange={handleVariantChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   disabled={loading || initialUnits.length === 0}
//                 >
//                   <option value="">Chọn đơn vị</option>
//                   {initialUnits.map((unit) => (
//                     <option key={unit.unitId} value={unit.unitId}>
//                       {unit.unitName}
//                     </option>
//                   ))}
//                 </select>
                
//                 <input
//                   type="number"
//                   name="initStock"
//                   value={newVariant.initStock}
//                   onChange={handleVariantChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Kho"
//                   disabled={loading}
//                 />
//                 <div className="col-span-4 flex items-center justify-between">
//                   {variantErrors && (
//                     <p className="text-red-600 text-sm">{variantErrors}</p>
//                   )}
//                   <div className="flex gap-2 ml-auto">
//                     <button
//                       type="button"
//                       onClick={handleAddVariant}
//                       className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                       disabled={loading}
//                     >
//                       Thêm
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsAddingVariantInline(false)}
//                       className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
//                       disabled={loading}
//                     >
//                       <XMarkIcon className="size-5 text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* Danh sách variant */}
//             <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
//               {newProduct.variants.length === 0 ? (
//                 <p className="text-gray-500 text-sm">Chưa có loại nào được thêm.</p>
//               ) : (
//                 newProduct.variants.map((variant, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between py-1 pl-4"
//                   >
//                     <span className="text-gray-700">
//                       {variant.value} {variant.unit} - {variant.price}đ (Kho:{" "}
//                       {variant.initStock})
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteVariant(index)}
//                       className="p-1 text-red-600 hover:text-red-800"
//                       disabled={loading}
//                     >
//                       <TrashIcon className="size-4" />
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Nút submit */}
//         <div className="lg:col-span-2">
//           <button
//             type="submit"
//             className={`w-full py-2 px-4 rounded-md text-white ${
//               loading
//                 ? "bg-green-400 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             } transition-colors`}
//             disabled={loading}
//           >
//             {loading ? "Đang thêm..." : "Thêm sản phẩm"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProductForm;

import React, { useState } from "react";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../UpLoadImage";
import { productApi } from "../../services/productService";
import {  toast } from 'react-toastify';
import {
  setNewProduct,
  setNewVariant,
  addVariant,
  deleteVariant,
  resetProductAdd,
} from "../../redux/retailerSlice";

const AddProductForm = ({
  onAddProduct,
  initialCategories = [],
  initialUnits = [],
  retailerId,
}) => {
  const dispatch = useDispatch();
  const { newProduct, newVariant } = useSelector((state) => state.RetailerStore.productAdd); // Giả sử key là 'retailer'

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isAddingVariantInline, setIsAddingVariantInline] = useState(false);
  const [file, setFile] = useState(null);
  const [variantErrors, setVariantErrors] = useState("");

  // Cập nhật retailerId khi prop thay đổi
  React.useEffect(() => {
    dispatch(setNewProduct({ retailerId: retailerId || "" }));
  }, [retailerId, dispatch]);

  const handleImageUpload = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewProduct({ [name]: value }));
  };

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = newProduct.categoryId.includes(categoryId)
      ? newProduct.categoryId.filter((cat) => cat !== categoryId)
      : [...newProduct.categoryId, categoryId];
    dispatch(setNewProduct({ categoryId: updatedCategories }));
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewVariant({ [name]: value }));
  };

  const validateVariant = () => {
    if (
      !newVariant.unitId ||
      !newVariant.value ||
      !newVariant.price ||
      !newVariant.initStock
    ) {
      setVariantErrors("Tất cả các trường phải được điền.");
      return false;
    }
    const value = parseInt(newVariant.value);
    const price = parseInt(newVariant.price);
    const initStock = parseInt(newVariant.initStock);
    if (
      isNaN(value) ||
      value <= 0 ||
      isNaN(price) ||
      price <= 0 ||
      isNaN(initStock) ||
      initStock < 0
    ) {
      setVariantErrors("Số lượng, giá phải > 0, tồn kho phải >= 0.");
      return false;
    }
    return true;
  };

  const handleAddVariant = () => {
    if (!validateVariant()) return;

    const unit = initialUnits.find((u) => u.unitId === newVariant.unitId);
    const variant = {
      unitId: newVariant.unitId,
      value: parseInt(newVariant.value),
      price: parseInt(newVariant.price),
      initStock: parseInt(newVariant.initStock),
      unit: unit ? unit.unitName : "",
    };

    dispatch(addVariant(variant));
    setVariantErrors("");
    setIsAddingVariantInline(false);
  };

  const handleDeleteVariant = (index) => {
    dispatch(deleteVariant(index));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (newProduct.categoryId.length === 0) {
      setMessage("Vui lòng chọn ít nhất một danh mục.");
      return;
    }
    if (newProduct.variants.length === 0) {
      setMessage("Vui lòng thêm ít nhất một loại sản phẩm.");
      return;
    }
    if (!file) {
      setMessage("Vui lòng chọn ảnh sản phẩm!");
      return;
    }

    setLoading(true);
    setMessage(null);

    const productToAdd = {
      productName: newProduct.productName,
      productDesc: newProduct.productDesc,
      retailerId: newProduct.retailerId,
      productOrigin: newProduct.productOrigin,
      categoryId: newProduct.categoryId,
      productVariants: newProduct.variants.map((v) => ({
        unitId: v.unitId,
        value: v.value,
        price: v.price,
        initStock: v.initStock,
      })),
    };

    try {
      const response = await productApi.addProduct(productToAdd, file);

      await onAddProduct();
      toast.success("Thêm sản phẩm vào giỏ thành công!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false, 
        theme: "light",
      });
      // Reset form sau khi thêm thành công
      dispatch(resetProductAdd());
      setFile(null);
      setMessage("Thêm sản phẩm thành công!");
    } catch (error) {
      if (error.response) {
        const httpStatus = error.response.status;
        const responseStatus = error.response.data.status;
        const errorMsg = error.response.data.msg || "Lỗi không xác định";

        if (httpStatus === 400 && responseStatus === "PRODUCT_ALREADY_EXISTS") {
          setMessage("Tên sản phẩm đã tồn tại, vui lòng chọn tên khác!");
        } else if (httpStatus === 400 && responseStatus === "INVALID_INPUT") {
          setMessage(`Dữ liệu không hợp lệ: ${errorMsg}`);
        } else if (httpStatus === 400) {
          setMessage(`Thêm sản phẩm thất bại: ${errorMsg}`);
        } else if (httpStatus === 500) {
          setMessage(`Lỗi server: ${errorMsg}`);
        } else {
          setMessage(`Thêm sản phẩm thất bại: ${errorMsg}`);
        }
      } else {
        setMessage("Thêm sản phẩm thất bại: Lỗi kết nối server hoặc dữ liệu không hợp lệ!");
      }
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <div
          className={`p-2 mb-4 text-center rounded-md ${
            message.includes("thành công")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <form
        onSubmit={handleAddProduct}
        className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0"
      >
        {/* Cột 1: Thông tin sản phẩm */}
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="productName"
              value={newProduct.productName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả sản phẩm
            </label>
            <textarea
              name="productDesc"
              value={newProduct.productDesc}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows="3"
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Nguồn gốc
            </label>
            <input
              type="text"
              name="productOrigin"
              value={newProduct.productOrigin}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <div className="relative">
            <UploadImage onImageChange={handleImageUpload} disabled={loading} />
          </div>
        </div>

        {/* Cột 2: Danh mục và Loại */}
        <div className="space-y-6">
          {/* Chọn danh mục */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Danh mục sản phẩm
            </label>
            <div className="min-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {initialCategories.length === 0 ? (
                <p className="text-gray-500 text-sm">Chưa có danh mục nào.</p>
              ) : (
                initialCategories.map((cat) => (
                  <div
                    key={cat.categoryId}
                    className="flex items-center gap-2 py-1 "
                  >
                    <input
                      type="checkbox"
                      checked={newProduct.categoryId.includes(cat.categoryId)}
                      onChange={() => handleCategoryToggle(cat.categoryId)}
                      disabled={loading}
                      className=" w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-700">{cat.categoryName}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quản lý loại */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Loại sản phẩm
              </label>
              <button
                type="button"
                onClick={() => setIsAddingVariantInline(true)}
                className={`${isAddingVariantInline ? "hidden" : ""} p-2 bg-gray-100 rounded-md hover:bg-gray-200`}
                disabled={loading}
                aria-label="Thêm loại mới"
              >
                <PlusIcon className="size-5 text-gray-600" />
              </button>
            </div>
            {/* Form inline thêm variant */}
            {isAddingVariantInline && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                <input
                  type="number"
                  name="value"
                  value={newVariant.value}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Số lượng"
                  disabled={loading}
                />
                <input
                  type="number"
                  name="price"
                  value={newVariant.price}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Giá"
                  disabled={loading}
                />
                <select
                  name="unitId"
                  value={newVariant.unitId}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading || initialUnits.length === 0}
                >
                  <option value="">Chọn đơn vị</option>
                  {initialUnits.map((unit) => (
                    <option key={unit.unitId} value={unit.unitId}>
                      {unit.unitName}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="initStock"
                  value={newVariant.initStock}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Kho"
                  disabled={loading}
                />
                <div className="col-span-4 flex items-center justify-between">
                  {variantErrors && (
                    <p className="text-red-600 text-sm">{variantErrors}</p>
                  )}
                  <div className="flex gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      disabled={loading}
                    >
                      Thêm
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingVariantInline(false)}
                      className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      disabled={loading}
                    >
                      <XMarkIcon className="size-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Danh sách variant */}
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {newProduct.variants.length === 0 ? (
                <p className="text-gray-500 text-sm">Chưa có loại nào được thêm.</p>
              ) : (
                newProduct.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1 pl-4"
                  >
                    <span className="text-gray-700">
                      {variant.value} {variant.unit} - {variant.price}đ (Kho:{" "}
                      {variant.initStock})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteVariant(index)}
                      className="p-1 text-red-600 hover:text-red-800"
                      disabled={loading}
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Nút submit */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
            disabled={loading}
          >
            {loading ? "Đang thêm..." : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;