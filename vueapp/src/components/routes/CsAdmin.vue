<template>
    <div v-if="isAdminStore" class="adminZone">
        <h1>{{ t('adminZone') }}</h1>
        <div>
            <v-tabs v-model="tab" :bg-color="firstColor" grow>
                <v-tab value="product">{{ t('products') }}</v-tab>
                <v-tab value="order">{{ t('orders') }}</v-tab>
                <v-tab value="newsletter">{{ t('newsletter') }}</v-tab>
                <v-tab value="category">{{ t('category') }}</v-tab>
                <v-tab value="manufacturer">{{ t('manufacturer') }}</v-tab>
                <v-tab value="currency">{{ t('currencies') }}</v-tab>
                <v-tab value="deliveryOption">{{ t('deliveryOptions') }}</v-tab>
                <v-tab value="user">{{ t('users') }}</v-tab>
                <v-tab value="userGroup">{{ t('userGroups') }}</v-tab>
            </v-tabs>
            <v-window v-model="tab" :touch="false" class="window">
                <v-window-item value="product">
                    <ProductTab/>
                </v-window-item>
                <v-window-item value="order">
                    <CsOrdersTab/>
                </v-window-item>
                <v-window-item value="newsletter">
                    <CsNewsletterTab/>
                </v-window-item>
                <v-window-item value="category">
                    <CategoryTab/>
                </v-window-item>
                <v-window-item value="manufacturer">
                    <CsManufacturerTab/>
                </v-window-item>
                <v-window-item value="currency">
                    <CsCurrencyTab/>
                </v-window-item>
                <v-window-item value="deliveryOption">
                    <CsDeliveryOptionTab/>
                </v-window-item>
                <v-window-item value="user">
                    <CsUserTab/>
                </v-window-item>
                <v-window-item value="userGroup">
                    <CsUserGroupTab/>
                </v-window-item>
            </v-window>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import useCustomer from "../../compositionfunctions/customer.ts";
import ProductTab from "../admin/CsProductTab.vue";
import CategoryTab from "../admin/CsCategoryTab.vue";
import {useUserStore} from "../../pinia/user/UserStore.ts";
import CsManufacturerTab from "../admin/CsManufacturerTab.vue";
import CsCurrencyTab from "../admin/CsCurrencyTab.vue";
import CsDeliveryOptionTab from "../admin/CsDeliveryOptionTab.vue";
import CsUserTab from "../admin/CsUserTab.vue";
import CsUserGroupTab from "../admin/CsUserGroupTab.vue";
import CsOrdersTab from "../admin/CsOrdersTab.vue";
import CsNewsletterTab from "../admin/CsNewsletterTab.vue";

const {t} = useI18n({useScope: 'global'});
const {firstColor} = useCustomer();
const {isAdminStore} = useUserStore();

const tab = ref('product');

</script>

<style scoped>
.adminZone {
    padding: 10px;
}

.window {
    padding-bottom: 10px;
}
</style>