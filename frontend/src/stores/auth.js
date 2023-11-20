import { defineStore } from "pinia";
import axios from "axios";

export const useAuth = defineStore("auth", {
  state: () => ({
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
        const res = await axios.post(
          import.meta.env.VITE_API_URL + "/api/v1/user/login",
          formData
        );

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
  },
});
