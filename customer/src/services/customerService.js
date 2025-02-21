import api from "./api/api";

export const customerApi = {
  login: async (formData) => {
    const response = await api.post("/customers/login", formData);
    return response.data;
  },

  register: async (formData) => {
    const response = await api.post("/customers/register", formData);
    return response.data;
  },

  getAllCustomers: async () => {
    const response = await api.get("/customers/get-all");
    return response.data;
  },
};
