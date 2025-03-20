import api from "./api/api";

export const postApi = {
  getAllPosts: async () => {
    const response = await api.get("/posts/get-all-posts");
    return response.data;
  },

  getByPostId: async (postId) => {
    const response = await api.get(`/posts/${postId}`, {
      withCredentials: true,
    });
    return response.data;
  },


};
