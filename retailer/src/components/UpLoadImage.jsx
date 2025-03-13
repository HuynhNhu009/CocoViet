import React, { useState } from "react";

const UploadImage = ({ className, onImageChange, disabled, isDisplay = true, setImagePreview }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (setImagePreview) {
          setImagePreview(reader.result); // Update external preview state
        }
      };
      reader.readAsDataURL(file);
      onImageChange(file); // Pass the file to parent
    }
  };

  return (
    <div className={`${className} relative`}>
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
      {preview && isDisplay && (
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