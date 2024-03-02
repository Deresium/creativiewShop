<template>
    <v-data-table
        :headers="headers"
        :items="products"
        item-key="productId"
        items-per-page="10"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn color="white" icon="mdi-pencil" size="25px" @click="goToEdit(item.getProductId())"/>
            <v-btn color="red" icon="mdi-delete-empty" size="25px" @click="deleteItemConfirm(item.getProductId())"/>
        </template>
    </v-data-table>
    <v-dialog v-model="askConfirmDelete">
        <v-card :text="t('confirmDeleteProduct.text')" :title="t('confirmDelete.title')">
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
import {ref} from "vue";
import ProductVM from "../../viewmodels/ProductVM.ts";
import ProductRequester from "../../requesters/ProductRequester.ts";
import router from "../../router/router.ts";
import axiosServer from "../../axios/axiosServer.ts";

const {t} = useI18n({useScope: "global"});

const emit = defineEmits(['deleteSuccess']);

const headers = ref([
    {title: t('code'), value: 'code'},
    {title: t('nameFr'), value: 'nameFr'},
    {title: t('nameEn'), value: 'nameEn'},
    {title: t('manufacturer'), value: 'manufacturerName'},
    {title: t('action'), value: 'actions'}
]);

const askConfirmDelete = ref(false);
const tempProductId = ref();
const loading = ref(false);

const products = ref(new Array<ProductVM>());
ProductRequester.requestProducts().then(response => {
    products.value = response;
});

const deleteItemConfirm = (productId: string) => {
    askConfirmDelete.value = true;
    tempProductId.value = productId;
};

const handleConfirm = async () => {
    loading.value = true;
    if (!tempProductId.value) {
        return;
    }
    await axiosServer.delete(`/product/${tempProductId.value}`);
    askConfirmDelete.value = false;
    tempProductId.value = null;
    loading.value = false;
    emit('deleteSuccess');
};

const handleRefuse = () => {
    askConfirmDelete.value = false;
    tempProductId.value = null;
};

const goToEdit = async (productId: string) => {
    await router.push({name: 'adminProduct', params: {productId: productId}});
};

</script>

<style scoped>

</style>