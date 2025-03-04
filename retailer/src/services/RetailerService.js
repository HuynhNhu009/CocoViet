import api from "./Api";

export const retailerApi = {
  register: async (formData) => {
    const response = await api.post("/retailers/register", formData);
    return response.data;
  },

  login: async (formData) => {
    const response = await api.post("/retailers/login", formData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/retailers/logout");
    return response.data;
  },

  checkAuth: async () => {
    const response = await api.get("/retailers/check", {
      withCredentials: true,
    });
    return response.data;
  },
};
