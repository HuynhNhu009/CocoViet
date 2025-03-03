import api from "./Api";

export const unitApi = {
  getAllUnitsRetailerId: async (retailerId) => {
    console.log("In unit Service", retailerId);
    
    const response = await api.get(`/retailers/${retailerId}/units`);
    return response.data;
  },

  addUnit: async (retailerId, formData) => {
    const response = await api.post(`/units?retailerId=${retailerId}`, formData);
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
