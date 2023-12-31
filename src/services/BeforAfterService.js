import client from "./client"

const BeforeAfterService = () => ({

    async createBeforAfter(beforeafter) {  
        try {
          const response = await client.post(`api/beforeafter/add`, beforeafter,{headers: {'Content-Type':'multipart/form-data'}});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllBeforAfters(pageNumber, pageSize) {
        try {
            const response = await client.get(`api/beforeafter/getAll`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteBeforAfter(beforeafterId) {
        try {
            const response = await client.delete(`api/beforeafter/delete/${beforeafterId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getBeforAfter(beforeafterId) {
        try {
            const response = await client.get(`api/beforeafter/get/${beforeafterId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateBeforAfter(beforeafterId,beforeafter) {
        try {
            const response = await client.put(`api/beforeafter/update/${beforeafterId}`,beforeafter,{headers: {'Content-Type':'multipart/form-data'}});
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const beforeAfterService = BeforeAfterService()