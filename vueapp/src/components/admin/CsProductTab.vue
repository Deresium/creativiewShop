<template>
    <h2>{{ t('products') }}</h2>
    <v-btn @click="addProduct">{{ t('addProduct') }}</v-btn>
    <CsProductList :key="counterRefresh" @delete-success="handleDeleteSuccess"/>
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
import axiosServer from "../../axios/axiosServer.ts";
import router from "../../router/router.ts";
import CsProductList from "./CsProductList.vue";
import {ref} from "vue";

const {t} = useI18n({useScope: 'global'});
const counterRefresh = ref(0);
const showSnackbar = ref(false);
const textSnackbar = ref();

const addProduct = async () => {
    const response = await axiosServer.post('/product');
    const productId = response.data;
    await router.push({name: 'adminProduct', params: {productId: productId}});
};

const handleDeleteSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    textSnackbar.value = t('deleteProduct.success');
};

</script>

<style scoped>

</style>