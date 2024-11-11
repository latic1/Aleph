import axios from 'axios';
import { useAuthStore } from './stores/auth';
import router from './router'; 

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  // withCredentials: true,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    if (error.response && error.response.status === 401) {
      authStore.authUser.user = null; // Reset the user in the store
      authStore.authUser.token = null; // Clear the token as well
      sessionStorage.removeItem('TOKEN'); // Remove token from session storage
      await router.push({ name: 'login' }); // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
