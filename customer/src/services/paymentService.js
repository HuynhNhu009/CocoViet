import api from "./api/api";

export const paymentAPI = {
  getAllPayment: async () => {
    const response = await api.get("/payments/get-all", {
      withCredentials: true,
    });
    return response.data;
  },

};
