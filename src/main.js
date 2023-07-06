import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import "@/config/vee-validate/rules";
import instantiatePusher from "./helpers/instantiatePusher";

const app = createApp(App);
instantiatePusher();

app.use(createPinia());
app.use(router);

app.mount("#app");
