import axios from 'axios';


// The axios client is created with a base URL and an interceptor to add or remove the token from the request headers.
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default axiosClient;