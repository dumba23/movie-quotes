import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import instantiatePusher from "./helpers/instantiatePusher";
import i18n from "@/plugins/i18";

const app = createApp(App);
instantiatePusher();

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
