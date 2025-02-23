import api from "./Api";

export const retailerApi = {
  register: async (formData) => {
    const response = await api.post("/retailers/register", formData);
    return response.data;
  },
};
