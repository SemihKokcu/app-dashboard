import client from "./client"

const UserService = () => ({

    async createUser(user) {  
        try {
          const response = await client.post(`api/users/add`, user,{headers: {'Content-Type':'multipart/form-data'}});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllUsers(pageNumber, pageSize) {
        try {
            const response = await client.get(`api/users/getAllPaginated?page=${pageNumber}&limit=${pageSize}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteUser(userId) {
        try {
            const response = await client.delete(`api/users/delete/${userId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getUser(userId) {
        try {
            const response = await client.get(`api/users/get/${userId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateUser(userId,user) {
        try {
            const response = await client.put(`api/users/update/${userId}`,user,{headers: {'Content-Type':'multipart/form-data'}});
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const userService = UserService()