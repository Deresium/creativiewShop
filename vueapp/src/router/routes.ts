import {RouteRecordRaw} from "vue-router";
import CsHome from "../components/routes/CsHome.vue";
import CsAdmin from "../components/routes/CsAdmin.vue";
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: CsHome,
        meta: {title: 'Home'}
    },
    {
        path: '/admin',
        name: 'admin',
        component: CsAdmin,
        meta: {title: 'Admin'}
    }
];