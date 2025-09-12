// src/api/index.js
import axios from "axios";
import {API_BASE_URL} from "../constants/index.js";

// Create Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor to handle 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if(token) {
        const res = await axios.get(`${API_BASE_URL}/api/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res.data;
    }
    else return null;
};


export default api;
