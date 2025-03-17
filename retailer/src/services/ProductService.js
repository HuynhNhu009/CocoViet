import api from "./Api";

export const productApi = {
  getProductByRetailerId: async (retialerID) => {
    const response = await api.get(`/products/retailer/${retialerID}`);
    return response.data;
  },

  addProduct: async (productData, imageFile) => {
    const formData = new FormData();

    formData.append("product", JSON.stringify(productData));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await api.post("/products/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updateProduct: async (productId, productData, imageFile) => {
    const formData = new FormData();
    formData.append("product", JSON.stringify(productData));

    if (imageFile) {
      formData.append("image", imageFile);
    }
    const response = await api.patch(`/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteVariantProduct: async (productId, variantId) => {
    const response = await api.delete(`/products/${productId}/${variantId}`);
    console.log(response.data);
    return response.data;
  },

  getProductById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    console.log("get product by Id", response);
    return response.data;
  },
  deleteProductById: async (productId) => {
    const response = await api.delete(`/products?productId=${productId}`);
    console.log("Delete product => data", response.data);
    return response.data;
  },

  setStatusProduct: async (productId, statusName) => {
    const response = await api.post(
      `/products/set-status?productId=${productId}&status=${statusName}`
    );
    console.log("Set status product => ", response.data);
    return response.data;
  },
};