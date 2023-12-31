import client from "./client"

const HeaderService = () => ({

    async createHeader(header) {  
        try {
          const response = await client.post(`api/header/add`, header,{headers: {'Content-Type':'multipart/form-data'}});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllHeaders(pageNumber, pageSize) {
        try {
            const response = await client.get(`api/header/getAll?currentPage=${pageNumber}&perPage=${pageSize}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteHeader(headerId) {
        try {
            const response = await client.delete(`api/header/delete/${headerId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getHeader(headerId) {
        try {
            const response = await client.get(`api/header/get/${headerId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateHeader(headerId,header) {
        try {
            const response = await client.put(`api/header/update/${headerId}`,header,{headers: {'Content-Type':'multipart/form-data'}});
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const headerService = HeaderService()