import client from "./client"

const RoleService = () => ({

    async createRole(user) {  
        try {
          const response = await client.post(`api/roles/add`, user);
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllRolesPaginated(pageNumber, pageSize) {
        try {
            const response = await client.get(`api/roles/getAllPaginated?page=${pageNumber}&limit=${pageSize}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getAllRoles() {
        try {
            const response = await client.get(`api/roles/getAll`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteRole(userId) {
        try {
            const response = await client.delete(`api/roles/delete/${userId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getRole(userId) {
        try {
            const response = await client.get(`api/roles/get/${userId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateRole(userId,user) {
        try {
            const response = await client.put(`api/roles/update/${userId}`,user);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const roleService = RoleService()