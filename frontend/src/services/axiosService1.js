import axios from "axios";
import { useAuth } from "@/stores";
import { storeToRefs } from "pinia";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const authInfo = useAuth();
    const auth = authInfo.user.meta ? `Bearer ${authInfo.user.meta.token}` : "";
    config.headers.common["Authorization"] = auth;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // console.log(error);
      const authInfo = useAuth();
      authInfo.user = {};
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
