<template>
    <v-data-table
        :headers="headers"
        :items="productOptions"
        item-key="productOptionId"
        items-per-page="10"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn color="white" icon="mdi-pencil" size="25px" @click="goToEdit(item.getProductOptionId())"/>
            <v-btn color="red" icon="mdi-delete-empty" size="25px"
                   @click="deleteItemConfirm(item.getProductOptionId())"/>
        </template>
    </v-data-table>
    <v-dialog v-model="askConfirmDelete">
        <v-card :text="t('confirmDeleteProductOption.text')" :title="t('confirmDelete.title')">
            <template #actions>
                <v-btn :loading="loading" @click="handleConfirm">
                    {{ t('confirm') }}
                </v-btn>
                <v-btn @click="handleRefuse">
                    {{ t('refuse') }}
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import ProductOptionVM from "../../../viewmodels/ProductOptionVM.ts";
import ProductOptionRequester from "../../../requesters/ProductOptionRequester.ts";
import axiosServer from "../../../axios/axiosServer.ts";

const {t} = useI18n({useScope: "global"});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const emit = defineEmits(['deleteSuccess', 'editProductOption']);

const headers = computed(() => [
    {title: t('code'), value: 'code'},
    {title: t('nameFr'), value: 'nameFr'},
    {title: t('nameEn'), value: 'nameEn'},
    {title: t('stock'), value: 'stock'},
    {title: t('weight'), value: 'weight'},
    {title: t('active'), value: 'active'},
    {title: t('preorder'), value: 'preorder'},
    {title: t('action'), value: 'actions'}
]);

const askConfirmDelete = ref(false);
const tempProductOptionId = ref();
const loading = ref(false);

const productOptions = ref(new Array<ProductOptionVM>());
ProductOptionRequester.requestProductOptions(productIdString).then(response => {
    productOptions.value = response;
});

const deleteItemConfirm = (productId: string) => {
    askConfirmDelete.value = true;
    tempProductOptionId.value = productId;
};

const handleConfirm = async () => {
    loading.value = true;
    if (!tempProductOptionId.value) {
        return;
    }
    await axiosServer.delete(`/product/${productIdString}/productOption/${tempProductOptionId.value}`);
    askConfirmDelete.value = false;
    tempProductOptionId.value = null;
    loading.value = false;
    emit('deleteSuccess');
};

const handleRefuse = () => {
    askConfirmDelete.value = false;
    tempProductOptionId.value = null;
};

const goToEdit = async (productOptionId: string) => {
    emit('editProductOption', productOptionId);
};

</script>

<style scoped>

</style>