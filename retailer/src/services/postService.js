import api from "./Api";

export const postApi = {
  getAllPostsByRetailer: async (retailerId) => {
    const response = await api.get(`/orders/by/${retailerId}`);
    return response.data;
  },

//   updateOrder: async (orderId, orderRequest) => {
//     const response = await api.patch(`/orders/update/${orderId}`, orderRequest);
//     return response.data;
//   },

//   getRevenue: async (retailerId, statusCode) => {
//     const response = await api.get("/orders/revenue", {
//       params: {
//         retailerId: retailerId,
//         statusCode: statusCode,
//       },
//     });
//     return response.data;
//   },

    createPosts: async (postData, imagePost)=>{

        const formData = new FormData();

        formData.append("post", JSON.stringify(postData));
        console.log(JSON.stringify(postData));
        if(imagePost){
            formData.append("image", imagePost);
        }

        const response = await api.post(`/posts`, formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })

        return response.data;
    }
};
