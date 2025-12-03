import axios from 'axios';
import { getCookie } from './cookies';

export const backendUrl = () => {
  // For development, you might want to use the remote server
  // to avoid having to run the backend locally
  let localhostUrl = "http://localhost:8000/lovemeet";
  let remoteUrl = "https://love-meet.onrender.com/lovemeet";

  // Force using remote URL even on localhost for easier development
  // Comment out the next line if you want to use local backend



  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  
  const _api = isLocalhost ? localhostUrl : remoteUrl;
  return remoteUrl;

};

const api = axios.create({
  baseURL: backendUrl(),
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error?.response?.data);
  }
);

export default api;
