import {createApp} from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from "./router/router.ts";
import i18n from "./i18n/i18n.ts";
import {createPinia} from "pinia";

const vuetify = createVuetify({
    components,
    directives,
});

createApp(App).use(vuetify).use(i18n).use(createPinia()).use(router).mount('#app');