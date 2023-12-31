import client from "./client"

const AuthService = () => ({

    async register(user,errorCallback) {
        try {
            const response = await client.post(`/auth/register`,user)
            return response
        } catch (error) {
            // if (error.response.status===422) {
            //     errorCallback("email already exist");
            // }
            console.log(error)
        }
    },
    async login(email,password,errorCallback) {
        try {
            const response = await client.post(`api/auth/login`,{email:email,password:password});
            return response;
        } catch (error) {
            // if (error.response.status===401) {
            //     errorCallback("user could not be found");
            // }
            console.log(error)
        }
    },
    async isAuthenticated() {
        const token = localStorage.getItem("token");
        if (!token) {
          return false;
        }
        console.log(token);
      
        try {
          const response = await client.get('api/auth/check');
          if (response.status === 200) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          // İstek sırasında bir hata oluşursa da false dönüyoruz.
          console.error('Authentication request failed:', error);
          return false;
        }
      }
      
})  

export const authService = AuthService()