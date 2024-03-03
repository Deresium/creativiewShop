<template>
    <div v-if="isAdminStore" class="adminZone">
        <h1>{{ t('adminZone') }}</h1>
        <CsProductForm @update-success="handleUpdateProductSuccess"/>
        <h2>{{ t('productOptions') }}</h2>
        <v-btn @click="addProductOption">{{ t('addProductOption') }}</v-btn>
        <CsProductOptionList :key="counterRefresh" @delete-success="handleDeleteSuccessOption"
                             @edit-product-option="handleEditProductOption"/>
        <CsProductOptionTabs
            v-if="productOptionToEdit"
            :key="`${counterRefresh}${productOptionToEdit}`"
            :product-option-id="productOptionToEdit"
            @update-info-success="handleUpdateInfoSuccess"/>
    </div>

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
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {useI18n} from "vue-i18n";
import CsProductForm from "../admin/product/CsProductForm.vue";
import CsProductOptionList from "../admin/product/CsProductOptionList.vue";
import axiosServer from "../../axios/axiosServer.ts";
import {ref} from "vue";
import CsProductOptionTabs from "../admin/product/CsProductOptionTabs.vue";
import {useRoute} from "vue-router";

const {t} = useI18n({useScope: 'global'});

const {isAdminStore} = useUserStore();

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const counterRefresh = ref(0);
const showSnackbar = ref(false);
const textSnackbar = ref(null);

const productOptionToEdit = ref(null);

const handleUpdateProductSuccess = () => {
    textSnackbar.value = t('updateProduct.success');
    showSnackbar.value = true;
};


const addProductOption = async () => {
    const response = await axiosServer.post(`/product/${productIdString}/productOption`);
    productOptionToEdit.value = response.data;
    counterRefresh.value++;
};

const handleDeleteSuccessOption = async () => {
    textSnackbar.value = t('deleteProductOption.success');
    showSnackbar.value = true;
    counterRefresh.value++;
};

const handleEditProductOption = (productOptionId: string) => {
    productOptionToEdit.value = productOptionId
};

const handleUpdateInfoSuccess = () => {
    textSnackbar.value = t('updateInfoOption.success');
    showSnackbar.value = true;
    counterRefresh.value++;
}

</script>

<style scoped>
.adminZone {
    padding: 10px;
}

h2 {
    margin-top: 50px;
}

.window {
    padding-bottom: 10px;
}

</style>