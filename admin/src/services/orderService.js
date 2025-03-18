import api from "./api/api";

export const orderAPI = {
  getAllOrders: async () => {
    const response = await api.get("/orders/get-all", {
      withCredentials: true,
    });
    return response.data;
  },

  getOrderByCustomerId: async (customerId, statusCode) => {
    const response = await api.get("/orders/", {
        params: { 
            customerId: customerId, 
            statusCode: statusCode 
        }
    });
    return response.data;
},


  addOrder: async (orderRequest) => {
    const response = await api.post("/orders/create", orderRequest);
    return response.data;
  },

  updateOrder: async (orderId,orderRequest) => {
    const response = await api.patch(`/orders/update/${orderId}`, orderRequest);
    return response.data;
  },

  deleteProductInOrder: async (orderId, receiptDetailId) => {
    const response = await api.delete(`/orders/${orderId}/receipt/${receiptDetailId}`);
    return response.data;
  },
  deleteOrder: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },

  getRevenue: async (retailerId) => {
    const response = await api.get("/orders/revenue", {
      params: {
        retailerId: retailerId      },
    });
    return response.data;
  },

  getAllRevenue: async () => {
    const response = await api.get("/orders/all-revenue", {
      params: {
        statusCode: "DELIVERED",
      },
    });
    return response.data;
  },
  getAllOrdersByRetailerId: async (retailerId) => {
    const response = await api.get(`/orders/by/${retailerId}`);
    return response.data;
  },

};
