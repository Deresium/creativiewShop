import {RouteRecordRaw} from "vue-router";
import CsHome from "../components/routes/CsHome.vue";
import CsLogin from "../components/routes/CsLogin.vue";
import CsCreateAccount from "../components/routes/CsCreateAccount.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: CsHome,
        meta: {title: 'Home'}
    },
    {
        path: '/login',
        name: 'login',
        component: CsLogin,
        meta: {title: 'Login'}
    },
    {
        path: '/createAccount',
        name: 'createAccount',
        component: CsCreateAccount,
        meta: {title: 'Create account'}
    }
];