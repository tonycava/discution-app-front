import axios, { type AxiosRequestConfig } from "axios";

let id: number | undefined;

export const axiosInterceptor = (token = "") => {
  if (id !== undefined) axios.interceptors.request.eject(id);
  id = axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.headers) config.headers = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    config.baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    return config;
  }, (error) => {
    return Promise.reject(error);
  }, {
  
  });
};