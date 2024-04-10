import {createApp} from 'vue'
import App from './App.vue'

import router from "./router/router.ts";
import i18n from "./i18n/i18n.ts";
import {createPinia} from "pinia";
import vuetify from "./vuetify/vuetify.ts";

createApp(App).use(vuetify).use(i18n).use(createPinia()).use(router).mount('#app');