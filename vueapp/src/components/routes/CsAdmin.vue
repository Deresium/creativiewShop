<template>
    <div v-if="isAdminStore" class="adminZone">
        <h1>{{ t('adminZone') }}</h1>
        <div>
            <v-tabs v-model="tab" :bg-color="firstColor" grow>
                <v-tab value="product">{{ t('product') }}</v-tab>
                <v-tab value="category">{{ t('category') }}</v-tab>
                <v-tab value="manufacturer">{{ t('manufacturer') }}</v-tab>
            </v-tabs>
            <v-window v-model="tab" class="window">
                <v-window-item value="product">
                    <ProductTab/>
                </v-window-item>
                <v-window-item value="category">
                    <CategoryTab/>
                </v-window-item>
                <v-window-item value="manufacturer">
                    <CsManufacturerTab/>
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