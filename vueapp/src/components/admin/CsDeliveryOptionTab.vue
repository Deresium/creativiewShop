<template>
    <h2>{{ t('deliveryOptions') }}</h2>
    <v-btn @click="addDeliveryOption">{{ t('addDeliveryOption') }}</v-btn>
    <CsDeliveryOptionList :key="counterRefresh" @delete-success="handleDeleteSuccess"/>
    <v-snackbar v-model="showSnackbar">
        {{ textSnackbar }}
        <template v-slot:actions>
            <v-btn
                color="green"
                variant="text"
                @click="showSnackbar = false"
            >
                {{ t('close') }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts" setup>

import {useI18n} from "vue-i18n";
import {ref} from "vue";
import axiosServer from "../../axios/axiosServer.ts";
import router from "../../router/router.ts";
import CsDeliveryOptionList from "./CsDeliveryOptionList.vue";

const {t} = useI18n({useScope: 'global'});
const counterRefresh = ref(0);
const showSnackbar = ref(false);
const textSnackbar = ref();

const addDeliveryOption = async () => {
    const response = await axiosServer.post('/deliveryOption');
    const deliveryOptionId = response.data;
    await router.push({name: 'adminDeliveryOption', params: {deliveryOptionId: deliveryOptionId}});
};

const handleDeleteSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    textSnackbar.value = t('deleteDeliveryOption.success');
};

</script>

<style scoped>

</style>