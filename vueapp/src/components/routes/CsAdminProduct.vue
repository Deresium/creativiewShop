<template>
    <div v-if="isAdminStore" class="adminZone">
        <h1>{{ t('adminZone') }}</h1>
        <CsProductForm/>
        <div>
            <!--            <v-tabs v-model="tab" :bg-color="firstColor" grow>
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
                        </v-window>-->
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {useI18n} from "vue-i18n";
import CsProductForm from "../admin/product/CsProductForm.vue";

const {isAdminStore} = useUserStore();
const {t} = useI18n({useScope: 'global'});
//const {firstColor} = useCustomer();

//const tab = ref('productInfo');

</script>

<style scoped>
.adminZone {
    padding: 10px;
}

.window {
    padding-bottom: 10px;
}

</style>