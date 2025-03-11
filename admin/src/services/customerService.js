import api from "./api/api";

export const customerApi = {
  getAllCustomers: async () => {
    const response = await api.get("/customers/get-all");
    return response.data;
  },

};
