// import './assets/main.css'
import './style.css'
import "vue-toastification/dist/index.css";

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import Toast, { type PluginOptions } from "vue-toastification";


import App from './App.vue'
import router from './router'
import type { TYPE } from 'vue-toastification';

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
});

const app = createApp(App)

const options: PluginOptions = {
    // You can set your default options here
};

app.use(pinia)
app.use(router)
app.use(Toast, options);


app.mount('#app')
