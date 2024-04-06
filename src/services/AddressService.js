import client from "./client"

const AddressService = () => ({

    async createAddress(data) {
        try {
          const response = await client.post(`api/address/add`,data);
          return response;
        } catch (error) {
          console.log(error);
        }
      },
    async getAllAddresssPaginated(pageNumber=0, pageSize=0) {
        try {
            const response = await client.get(`api/address/getAllPaginated?page=${pageNumber}&limit=${pageSize}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getAllAddresss() {
        try {
            const response = await client.get(`api/address/getAll`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteAddress(addressId) {
        try {
            const response = await client.delete(`api/address/delete/${addressId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getAddress(addressId) {
        try {
            const response = await client.get(`api/address/get/${addressId}`);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async updateAddress(address,id) {
        try {
            const response = await client.put(`api/address/update/${id}`,address);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})  

export const addressService = AddressService()