import api from "./Api";

export const orderAPI = {
  getAllOrdersByRetailerId: async (retailerId) => {
    const response = await api.get(`/orders/by/${retailerId}`);
    return response.data;
  },

  updateOrder: async (orderId, orderRequest) => {
    const response = await api.patch(`/orders/update/${orderId}`, orderRequest);
    return response.data;
  },

  getRevenue: async (retailerId, statusCode) => {
    const response = await api.get("/orders/revenue", {
      params: {
        retailerId: retailerId,
        statusCode: statusCode,
      },
    });
    return response.data;
  },
};
