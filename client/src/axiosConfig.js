import axios from "axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "./tokenStorage";
import { useNavigate } from "react-router-dom";


// Utility function to get a cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("Request Headers: ", config.headers)
    return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const navigate = useNavigate();
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = getCookie('refreshToken');
            const { data } = await axios.post('/refresh', { refresh_token: refreshToken });
            setAccessToken(data.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            //If the refresh token is invalid or has expired, remove the access token and redirect to the login page
            removeAccessToken();
            navigate('/login');
          
            return Promise.reject(refreshError);
        }   
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;