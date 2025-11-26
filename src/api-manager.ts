import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

const AxiosRequestInterceptorsConfig = async (
    config: InternalAxiosRequestConfig
) => {
    // todo to take token from store and use it here.
    const token = 'hello';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const AxiosRequestInterceptorsErrorHandler = (error: unknown) => {
    return Promise.reject(error);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AxiosResponseInterceptorsErrorHandler = (error: any) => {
    if (error.response && error.response.status === 401) {
        // todo: Handle 401 error
    }
    return Promise.reject(error.response);
};

// Request interceptor
axiosInstance.interceptors.request.use(
    AxiosRequestInterceptorsConfig,
    AxiosRequestInterceptorsErrorHandler
);

// Response interceptor
axiosInstance.interceptors.response.use((response) => {
    return response.data;
}, AxiosResponseInterceptorsErrorHandler);

export default axiosInstance;

