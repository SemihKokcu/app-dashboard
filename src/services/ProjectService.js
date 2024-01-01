import client from "./client"

const ProjectService = () => ({

    async createProject(content) {  
        try {
          const response = await client.post(`api/projects/add`, content,{headers: {'Content-Type':'multipart/form-data'}});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllProjects(pageNumber, pageSize) {
        try {
            const response = await client.get(`api/projects/getAllPaginated?page=${pageNumber}&limit=${pageSize}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteProject(contentId) {
        try {
            const response = await client.delete(`api/projects/delete/${contentId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getProject(contentId) {
        try {
            const response = await client.get(`api/projects/get/${contentId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateProject(contentId,content) {
        try {
            const response = await client.put(`api/projects/update/${contentId}`,content,{headers: {'Content-Type':'multipart/form-data'}});
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const projectService = ProjectService()