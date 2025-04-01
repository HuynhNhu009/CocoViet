import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const UploadImage = ({
  className,
  onImageChange,
  disabled,
  initialImage = "",
}) => {
  const [preview, setPreview] = useState(initialImage);

  useEffect(() => {
    setPreview(initialImage); // Đồng bộ với initialImage từ parent
  }, [initialImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(""); // Xóa preview để hiển thị input
    onImageChange(null); // Báo parent xóa file
  };

  return (
    <div className={`${className} relative w-full mx-auto`}>
      <div className="flex flex-col items-center gap-4">
        {!preview ? (
          <>
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
              className={`
                flex flex-col items-center justify-center
                w-full h-48
                border-2 border-dashed border-gray-300
                rounded-lg
                bg-gray-50
                hover:bg-gray-100
                cursor-pointer
                transition-colors duration-200
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <PlusIcon className="w-12 h-12 text-gray-400 hover:text-gray-500" />
              <span className="mt-2 text-sm text-gray-600">
                {disabled ? "Upload disabled" : "Click to upload image"}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                (JPG, PNG, max 5MB)
              </span>
            </label>
          </>
        ) : (
          <div className="relative group w-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-130 object-cover rounded-lg border border-gray-200 shadow-sm"
              onError={() => console.error("Error loading image:", preview)}
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all duration-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            {/* <div className="absolute inset-0 bg-gray-900/90 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;