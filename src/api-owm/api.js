import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org',
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params, appid: (
        typeof process !== "undefined" ? process.env.VITE_API_KEY
          : import.meta.env.VITE_API_KEY)
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;