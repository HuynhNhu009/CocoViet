import api from "./Api";

export const productApi = {
  getProductByRetailerId: async (retialerID) => {
    const response = await api.get(`/products/retailer/${retialerID}`);
    return response.data;
  },


  addProduct: async (productData, imageFile) => {
    try {
      const formData = new FormData();
      
      formData.append("product", JSON.stringify(productData));
  
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      const response = await api.post("/products/add");
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Add product failed:", error);
    }
  }
  
  
};
