<template>
    <v-switch v-model="viewByOption" :label="t('changeView')"/>
    <v-text-field v-model="search" :label="t('search')" class="searchField"/>
    <v-data-table
        v-if="!viewByOption"
        :headers="headers"
        :items="products"
        :search="search"
        item-key="productId"
        items-per-page="10"
    >
        <!--        <template v-slot:item.productOptions="{ item }">
                    <v-data-table
                        :headers="headersOption"
                        :items="item.getProductOptions()"
                        :items-per-page="-1"
                        item-key="productOptionId"
                    >
                        <template #bottom></template>
                        <template #item.active="{ item }">
                            <v-icon :color="getColorBoolean(item.getActive())" icon="mdi-circle"/>
                        </template>
                    </v-data-table>
                </template>-->

        <template v-slot:item.actions="{ item }">
            <v-btn color="white" icon="mdi-pencil" size="25px" @click="goToEdit(item.getProductId())"/>
            <v-btn color="red" icon="mdi-delete-empty" size="25px" @click="deleteItemConfirm(item.getProductId())"/>
        </template>
    </v-data-table>

    <v-data-table
        v-if="viewByOption"
        :headers="headersFlatOptions"
        :items="productOptionsFlat"
        :search="search"
        item-key="productOptionId"
        items-per-page="10"
    >
        <template #item.actions="{ item }">
            <v-btn color="white" icon="mdi-pencil" size="25px" @click="goToEdit(item.getProductId())"/>
        </template>
        <template #item.active="{ item }">
            <v-icon :color="getColorBoolean(item.getActive())" icon="mdi-circle"/>
        </template>
        <template #item.price="{ item }">
            <template v-if="item.getPrice()">{{ `${item.getPrice()}${currencySymbol}` }}</template>
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
import {computed, ref} from "vue";
import ProductRequester from "../../requesters/ProductRequester.ts";
import router from "../../router/router.ts";
import axiosServer from "../../axios/axiosServer.ts";
import ProductListAdminVM from "../../viewmodels/ProductListAdminVM.ts";
import ProductOptionListAdminFlatVM from "../../viewmodels/ProductOptionListAdminFlatVM.ts";
import ProductParser from "../../parsers/ProductParser.ts";
import useCustomer from "../../compositionfunctions/customer.ts";

const {t} = useI18n({useScope: "global"});

const emit = defineEmits(['deleteSuccess']);

const headers = computed(() => [
    {title: t('code'), value: 'code'},
    {title: t('nameFr'), value: 'nameFr'},
    {title: t('nameEn'), value: 'nameEn'},
    {title: t('manufacturer'), value: 'manufacturerName'},
    /*{title: t('productOption'), value: 'productOptions'},*/
    {title: t('action'), value: 'actions'}
]);

/*const headersOption = computed(() => [
    {title: t('nameFr'), value: 'nameFr'},
    {title: t('active'), value: 'active'},
    {title: t('stock'), value: 'stock'},
    {title: t('price'), value: 'price'},
]);*/

const headersFlatOptions = computed(() => [
    {title: t('codeProduct'), value: 'codeProduct'},
    {title: t('manufacturer'), value: 'manufacturerName'},
    {title: t('nameFrProduct'), value: 'nameFrProduct'},
    {title: t('nameFrProductOption'), value: 'nameFrProductOption'},
    {title: t('active'), value: 'active'},
    {title: t('stock'), value: 'stock'},
    {title: t('price'), value: 'price'},
    {title: t('action'), value: 'actions'}
]);

const {currencySymbol} = useCustomer();

const askConfirmDelete = ref(false);
const tempProductId = ref();
const loading = ref(false);
const search = ref();
const viewByOption = ref(false);

const products = ref(new Array<ProductListAdminVM>());
const productOptionsFlat = ref(new Array<ProductOptionListAdminFlatVM>);

ProductRequester.requestProductsAdminList().then(response => {
    products.value = ProductParser.parseProductsAdminList(response);
    productOptionsFlat.value = ProductParser.parseProductsAdminListToFlatOptions(response);
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

const getColorBoolean = (bool: boolean) => {
    if (bool) {
        return 'green';
    }
    return 'red';
};

</script>

<style scoped>
.searchField {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 50%;
}
</style>