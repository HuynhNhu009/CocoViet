import api from "./api/api";

export const orderAPI = {
  getAllOrders: async () => {
    const response = await api.get("/orders/get-all", {
      withCredentials: true,
    });
    return response.data;
  },

  getOrderByCustomerId: async (customerId) => {
    const response = await api.get(`/orders/${customerId}`)
    return response.data;
  },
};
