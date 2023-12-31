import client from "./client"

const PropertyService = () => ({

    async createProperty(services) {  
        try {
          const response = await client.post(`api/services/add`, services,{headers: {'Content-Type':'multipart/form-data'}});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllPropertys(pageNumber, pageSize) {
        try {
            const response = await client.get(`api/services/getAll?currentPage=${pageNumber}&perPage=${pageSize}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteProperty(servicesId) {
        try {
            const response = await client.delete(`api/services/delete/${servicesId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getProperty(servicesId) {
        try {
            const response = await client.get(`api/services/get/${servicesId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateProperty(servicesId,services) {
        try {
            const response = await client.put(`api/services/update/${servicesId}`,services,{headers: {'Content-Type':'multipart/form-data'}});
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const propertyService = PropertyService()