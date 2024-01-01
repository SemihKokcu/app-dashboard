import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const isLoginRequest = (url) => {
//   return url.includes("/api/auth/login");
// };

// client.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token && !isLoginRequest(config.url)) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 422) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (error.response && error.response.status === 401) {
      toast.error("Giriş Yap yada Kayıt Ol");
      setTimeout(()=>{
        window.location.href="/#/auth/login"
      },2000)
    }
    return Promise.reject(error);
  }
);

export default client;
