import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./template.js";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
