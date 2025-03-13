import api from "./Api";

export const postApi = {
//   getAllPostsByRetailer: async (retailerId) => {
//     const response = await api.get(`/orders/by/${retailerId}`);
//     return response.data;
//   },

  createPosts: async (postData, imagePost) => {
    const formData = new FormData();

    formData.append("post", JSON.stringify(postData));
    console.log(JSON.stringify(postData));
    if (imagePost) {
      formData.append("image", imagePost);
    }

    const response = await api.post(`/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getPostByRetailerId: async(retailerId) => {
    const response = await api.get(`/posts?retailerId=${retailerId}`)
    return response.data
  },

  updatePostById: async(postId, postData, file) =>{
    const formData = new FormData();
    formData.append("post", JSON.stringify(postData));

    if(file) formData.append("image", file);
    const response = await api.patch(`/posts?postId=${postId}`, formData, {
      headers:{
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data;
  },

  deletePostById: async (postId) => {
    const response = await api.delete(`/posts?postId=${postId}`);
    return response.data;
  }
};
