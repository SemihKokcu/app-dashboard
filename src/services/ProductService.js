import client from "./client"

const ProductService = () => ({

    async createProduct(product) {
        try {
          const response = await client.post(`api/product/add`, product,{headers: {'Content-Type':'multipart/form-data'}});
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllProductPaginated(page, limit) {
        try {
            const response = await client.get(`api/products/getAllPaginated?page=${page}&limit=${limit}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteProduct(productId) {
        try {
            const response = await client.delete(`api/product/delete/${productId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getProductsLength() {
        try {
            const response = await client.get(`api/product/getProductsLength`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getProduct(productId) {
        try {
            const response = await client.get(`api/product/get/${productId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateProduct(productId,product) {
        try {
            const response = await client.put(`api/product/update/${productId}`,product,{headers: {'Content-Type':'multipart/form-data'}});
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const productService = ProductService()