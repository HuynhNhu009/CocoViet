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

  addOrder: async (orderRequest) => {
    const response = await api.post("/orders/create", orderRequest);
    return response.data;
  },

  updateOrder: async (orderId,orderRequest) => {
    const response = await api.patch(`/orders/update/${orderId}`, orderRequest);
    return response.data;
  },

};
