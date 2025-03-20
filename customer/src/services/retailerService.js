import api from "./api/api";

export const retailerAPI = {
  getAllRetailer: async () => {
    const response = await api.get("/retailers/get-all");
    return response.data;
  },

  getByRetailerId: async (retailerId) => {
    const response = await api.get(`/retailers/${retailerId}`);
    return response.data;
  },
};
