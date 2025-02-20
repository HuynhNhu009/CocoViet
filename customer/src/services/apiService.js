const API_BASE_URL = "http://localhost:8082/api";

export const apiService = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error call API");
    }
    return response.json();
  },


};
