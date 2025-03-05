import api from "./api/api";

export const postApi = {
  getAllPosts: async () => {
    const response = await api.get("/posts/get-all-posts");
    console.log("POST===========", response.data)
    return response.data;
  },

};
