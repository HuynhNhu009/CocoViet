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

  updateProduct: async (productData, imageFile) => {
    const formData = new FormData()
    

    return 
  }
};
