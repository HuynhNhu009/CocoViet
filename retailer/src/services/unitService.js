import api from "./Api";

export const unitApi = {
  getAllUnits: async () => {
    const response = await api.get(`/units/get-all`);
    return response.data;
  },

  addUnit: async (formData) => {
    const response = await api.post(`/units/add`, formData);
    return response.data;
  },

  updateUnit: async (unitId, data) => {
    const response = await api.patch(`/units/update/${unitId}`, data);
    return response.data;
  },

  deleteUnit: async (unitId) => {
    const response = await api.delete(`/units/delete/${unitId}`);
    return response.data;
  },
};
