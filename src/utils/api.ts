import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
    'accept': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      console.log('api error', error)
      window.location.href = "/401";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;