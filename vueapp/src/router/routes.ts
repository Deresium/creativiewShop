import {RouteRecordRaw} from "vue-router";
import CsHome from "../components/routes/CsHome.vue";
import CsAdmin from "../components/routes/CsAdmin.vue";
import CsAdminProduct from "../components/routes/CsAdminProduct.vue";
import CsAdminDeliveryOption from "../components/routes/CsAdminDeliveryOption.vue";
import CsPasswordRequest from "../components/global/CsPasswordRequest.vue";
import CsNewPassword from "../components/global/CsNewPassword.vue";

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
    },
    {
        path: '/admin/product/:productId',
        name: 'adminProduct',
        component: CsAdminProduct,
        meta: {title: 'Admin'}
    },
    {
        path: '/admin/deliveryOption/:deliveryOptionId',
        name: 'adminDeliveryOption',
        component: CsAdminDeliveryOption,
        meta: {title: 'Admin'}
    },
    {
        path: '/passwordRequest',
        name: 'passwordRequest',
        component: CsPasswordRequest
    },
    {
        path: '/newPassword',
        name: 'newPassword',
        component: CsNewPassword
    }
];