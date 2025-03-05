import api from "./Api";

export const orderAPI = {
  getAllOrdersByRetailerId: async (retailerId) => {    
    const response = await api.get(`/orders/by/${retailerId}`)
    return response.data;
  },


  
};
