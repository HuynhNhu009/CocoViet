import React, { useState, useEffect } from "react";
import {
  ArchiveBoxArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UploadImage from "../UpLoadImage";
import { postApi } from "../../services/PostService";

const PostEdit = ({ post, onSave, onCancel, products = [] }) => {
  const [postData, setPostData] = useState({
    postTitle: post.postTitle || "",
    postContent: post.postContent || "",
    retailerId: post.retailerId || "",
  });
  const [image, setImage] = useState(null); // Lưu file mới
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState(post.productIds || []);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, (match) => (match === "đ" ? "d" : "D"));
  };

  useEffect(() => {
    setPostData({
      postTitle: post.postTitle || "",
      postContent: post.postContent || "",
      retailerId: post.retailerId || "",
    });
    setSelectedProductIds(post.productIds || []);
  }, [post]);

  const handleEditPost = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (selectedFile) => {
    setImage(selectedFile); // Cập nhật file mới để gửi API
  };

  const handleProductSelect = (productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term || !products || products.length === 0) {
      setSearchResults([]);
      return;
    }
    const searchTermNoTones = removeVietnameseTones(term);
    const filtered = products
      .filter((product) => product.status === "ENABLE")
      .filter((product) => !selectedProductIds.includes(product.id))
      .filter((product) => {
        const productNameNoTones = removeVietnameseTones(product.productName);
        return productNameNoTones.toLowerCase().includes(searchTermNoTones.toLowerCase());
      });
    setSearchResults(filtered);
  };

  const submitEditPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedPostData = {
        ...postData,
        products: selectedProductIds,
      };
      const response = await postApi.updatePostById(post.postId, updatedPostData, image);
      onSave(response.data);
    } catch (error) {
      console.error("Error updating post:", error);
      onSave(post);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100px] mt-10 pb-10 rounded-sm justify-center">
      <form onSubmit={submitEditPost} className="space-y-4">
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            <XMarkIcon className="size-5 mr-2 inline" />
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white hover:text-black rounded-md hover:bg-green-500 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              "Đang lưu..."
            ) : (
              <>
                <ArchiveBoxArrowDownIcon className="size-5 mr-2 inline" />
                Lưu
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Tiêu đề:</h3>
              <input
                type="text"
                name="postTitle"
                value={postData.postTitle}
                onChange={handleEditPost}
                placeholder="Tiêu đề bài đăng"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
                disabled={isLoading}
              />
              <h3 className="text-lg font-semibold">Nội dung:</h3>
              <textarea
                name="postContent"
                value={postData.postContent}
                onChange={handleEditPost}
                placeholder="Nội dung"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
                rows="5"
                disabled={isLoading}
              />
            </div>
            <UploadImage
              className="w-full"
              onImageChange={handleImageUpload}
              initialImage={post.postImageUrl}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Chọn sản phẩm:</h3>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
                disabled={isLoading || !products || products.length === 0}
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleProductSelect(product.id)}
                    >
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                      <span className="text-sm">{product.productName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-md font-medium">Sản phẩm đã chọn:</h4>
              {selectedProductIds.length > 0 && products && products.length > 0 ? (
                <div className="bg-amber-100 min-h-10 overflow-y-auto rounded-md p-2">
                  {selectedProductIds.map((id) => {
                    const product = products.find((p) => p.id === id);
                    return product ? (
                      <div
                        key={id}
                        className="flex items-center mb-3 bg-white rounded-lg shadow-sm border border-gray-200 p-2"
                      >
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-16 h-16 object-cover rounded mr-3"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{product.productName}</p>
                          <p className="text-xs text-gray-600">
                            {product.productDesc || "Chưa có mô tả"}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleProductSelect(product.id);
                          }}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          Xóa
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Chưa có sản phẩm nào được chọn</p>
              )}
            </div>
          </div>
        </div>
      </form>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100/80">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <svg
              className="animate-spin h-16 w-16 text-green-600"
              viewBox="0 0 32 32"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="opacity-25"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="44 88"
                strokeDashoffset="0"
                fill="none"
                className="opacity-75"
              />
            </svg>
            <p className="text-lg text-gray-800">Đang xử lý...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEdit;