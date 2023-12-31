import client from "./client"

const CommentService = () => ({

    async createComment(data) {
        try {
          const response = await client.post(`api/comments/add`,data);
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllComments(pageNumber=0, pageSize=0) {
        try {
            const response = await client.get(`api/comments/getAll?currentPage=${pageNumber}&perPage=${pageSize}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteComment(commentsId) {
        try {
            const response = await client.delete(`api/comments/delete/${commentsId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getComment(commentsId) {
        try {
            const response = await client.get(`api/comments/get/${commentsId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateComment(comments,id) {
        try {
            const response = await client.put(`api/comments/update/${id}`,comments);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const commentsService = CommentService()