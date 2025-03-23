import api from "./api/api";

export const adminAPI = {
  login: async (formData) => {
    const response = await api.post("/admin/", formData);
    return response.data;
  },

  introspect: async () => {
    const response = await api.get("/admin/");
    return response.data;
  },

};
