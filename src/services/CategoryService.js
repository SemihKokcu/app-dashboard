import client from "./client"

const CategoryService = () => ({

    async createCategory(category) {
        try {
          const response = await client.post(`api/category/add`, {name:category});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllCategories() {
        try {
            const response = await client.get(`api/categories/getAll`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteCategory(categoryId) {
        try {
            const response = await client.delete(`api/category/delete/${categoryId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getCategory(categoryId) {
        try {
            const response = await client.get(`api/category/get/${categoryId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateCategory(categoryId,category) {
        try {
            const response = await client.put(`api/category/update/${categoryId}`,category);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const categoryService = CategoryService()