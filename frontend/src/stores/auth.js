import { defineStore } from "pinia";
import axios from "axios";
// import axiosInstance from "../services/axiosservice";
import axiosInstance from "../services/axiosService1";
export const useAuth = defineStore("auth", {
  state: () => ({
    loading: false,
    user: {},

    // errors: {},
  }),
  persist: {
    paths: ["user"],
  },
  actions: {
    async login(formData) {
      // console.log(formData);
      try {
        // const res = await axios.post(
        //   import.meta.env.VITE_API_URL + "/api/v1/user/login",
        //   formData
        // );
        const res = await axiosInstance.post("/user/login", formData);
        // console.log(res);
        if (res.status === 200) {
          this.user = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
        // if (res.status === 200) {
        //   return res.data;
        // }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },
    async register(formData) {
      try {
        const res = await axiosInstance.post("/user/register", formData);
        if (res.status === 201) {
          // this.user = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },
    async logout() {
      this.loading = true;
      try {
        const res = await axiosInstance.post("/user/logout");
        console.log(res);
        if (res.status == 200) {
          this.user = {};
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
});
