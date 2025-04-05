import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Toaster } from "vue-sonner";

const app = createApp(App);
const queryClient = new QueryClient();
const pinia = createPinia();
app.component("Toaster", Toaster);

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, {
  queryClient,
});

app.mount("#app");
