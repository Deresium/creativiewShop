import {RouteRecordRaw} from "vue-router";
import CsHome from "../components/routes/CsHome.vue";
import CsAdmin from "../components/routes/CsAdmin.vue";
import CsAdminProduct from "../components/routes/CsAdminProduct.vue";
import CsAdminDeliveryOption from "../components/routes/CsAdminDeliveryOption.vue";
import CsPasswordRequest from "../components/routes/CsPasswordRequest.vue";
import CsNewPassword from "../components/routes/CsNewPassword.vue";
import CsStoreProduct from "../components/routes/CsStoreProduct.vue";
import CsBasket from "../components/routes/CsBasket.vue";
import CsStore from "../components/routes/CsStore.vue";
import CsBasketOrderSuccess from "../components/routes/CsBasketOrderSuccess.vue";

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
    },
    {
        path: '/store/:productOptionId',
        name: 'productOptionStore',
        component: CsStoreProduct
    },
    {
        path: '/basket',
        name: 'basket',
        component: CsBasket
    },
    {
        path: '/store',
        name: 'store',
        component: CsStore
    },
    {
        path: '/basketOrderSuccess',
        name: 'basketOrderSuccess',
        component: CsBasketOrderSuccess
    }
];