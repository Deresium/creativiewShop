<template>
    <div v-if="isAdminStore" class="adminZone">
        <h1>{{ t('adminZone') }}</h1>
        <div>
            <v-tabs v-model="tab" :bg-color="firstColor" grow>
                <v-tab value="deliveryOption">{{ t('deliveryOption') }}</v-tab>
                <v-tab value="country">{{ t('countries') }}</v-tab>
                <v-tab value="weight">{{ t('weight') }}</v-tab>
            </v-tabs>
            <v-window v-model="tab" :touch="false" class="window">
                <v-window-item value="deliveryOption">
                    <CsDeliveryOptionInfoTab/>
                </v-window-item>
                <v-window-item value="country">
                    <CsCountryTab/>
                </v-window-item>
                <v-window-item value="weight">
                    <CsWeightTab/>
                </v-window-item>
            </v-window>
        </div>
    </div>
</template>

<script lang="ts" setup>

import {useI18n} from "vue-i18n";
import useCustomer from "../../compositionfunctions/customer.ts";
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {ref} from "vue";
import CsDeliveryOptionInfoTab from "../admin/deliveryOption/CsDeliveryOptionInfoTab.vue";
import CsCountryTab from "../admin/deliveryOption/CsCountryTab.vue";
import CsWeightTab from "../admin/deliveryOption/CsWeightTab.vue";


const {t} = useI18n({useScope: 'global'});
const {firstColor} = useCustomer();
const {isAdminStore} = useUserStore();

const tab = ref('deliveryOption');
</script>

<style scoped>
.adminZone {
    padding: 10px;
}

.window {
    margin-top: 30px;
}
</style>