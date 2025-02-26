import React, { useState } from "react";

const UploadImage = ({ onImageChange, disabled }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
  
        onImageChange(file);
      }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">
        Hình ảnh sản phẩm
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="upload-image"
        disabled={disabled}
      />
      <label
        htmlFor="upload-image"
        className="block w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md text-center bg-gray-100 hover:bg-gray-200"
      >
        Chọn ảnh
      </label>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover border rounded-md"
        />
      )}
    </div>
  );
};

export default UploadImage;
