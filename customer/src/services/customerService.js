import api from "./api/api";
import { setLogin } from "../redux/customerSlice";

export const customerApi = {
  loginUser: (formData) => async (dispatch) => {
    try {
      const response = await api.post("/customers/login", formData, {
        withCredentials: true,
      });
      // console.log("1",response.data);
      // console.log("2",response.data.data);
      dispatch(setLogin(response.data.data)); // Lưu vào Redux

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  checkAuth: async () => {
    const response = await api.get("/customers/check", {
      withCredentials: true,
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/customers/logout", {
      withCredentials: true,
    });
    return response.data; // { msg: "Logged out successfully", status: "OK" }
  },

  register: async (formData) => {
    const response = await api.post("/customers/register", formData);
    return response.data;
  },

  getAllCustomers: async () => {
    const response = await api.get("/customers/get-all");
    return response.data;
  },

  updateProfile: async (customerId, formData) => {
    const response = await api.patch(`/customers/update-profile/${customerId}`,formData);
    return response.data;
  },
};
