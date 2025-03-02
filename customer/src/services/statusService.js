import api from "./api/api";

export const statusAPI = {
  getAllStatus: async () => {
    const response = await api.get("/status/get-all");
    return response.data;
  },

};
