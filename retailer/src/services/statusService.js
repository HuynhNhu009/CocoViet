import api from "./Api";

export const statusAPI = {
  getAllStatus: async () => {
    const response = await api.get("/status/get-all");
    return response.data;
  },

};
