<template>
    <div class="basket">
        <v-skeleton-loader v-if="!loaded" type="card"></v-skeleton-loader>
        <div v-if="loaded" class="basketLoaded">
            <v-data-table
                :headers="basketHeaders"
                :items="productOptionsStoreBasket"
                item-key="productOptionId"
                items-per-page="10"
            >
                <template #item.picture="{ item }">
                    <div v-if="item.getPictureId()" class="divImgProductOption">
                        <img
                            :src="imageSrc(item.getProductId(), item.getProductOptionId(), item.getPictureId())"
                            alt="product image"/>
                    </div>
                </template>

                <template #item.title="{ item }">
                    <router-link
                        :to="{name: 'productOptionStore', params: {productOptionId: item.getProductOptionId()}}">
                        {{ item.getTitle() }} <span v-if="item.hasMultipleOptions()">({{
                            item.getTitleOption()
                        }})</span>
                    </router-link>
                </template>

                <template #item.quantity="{ item }">
                    <div class="quantity">
                        <CsBasketQuantity
                            :product-option-id="item.getProductOptionId()"
                            :quantity="item.getQuantity()"
                            @quantity-updated="handleQuantityUpdated"
                            @error-quantity="handleErrorQuantity"

                        />
                    </div>
                </template>

                <template #item.actions="{ item }">
                    <v-btn color="red" icon="mdi-delete-empty" size="25px"
                           @click="askDeleteConfirmProductOptionBasket(item.getProductOptionId())"/>
                </template>
            </v-data-table>
        </div>
    </div>

    <v-dialog v-model="askConfirmDelete">
        <v-card :text="t('confirmDeleteProductOptionBasket.text')" :title="t('confirmDelete.title')">
            <template #actions>
                <v-btn :loading="loadingDelete" @click="handleConfirm">
                    {{ t('confirm') }}
                </v-btn>
                <v-btn @click="handleRefuse">
                    {{ t('refuse') }}
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="showSnackbar">
        {{ txtSnackbar }}
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
import {computed, ref} from "vue";
import BasketProductOptionRequester from "../../requesters/BasketProductOptionRequester.ts";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import ProductOptionStoreBasketVM from "../../viewmodels/ProductOptionStoreBasketVM.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";
import CsBasketQuantity from "../store/CsBasketQuantity.vue";

const {t} = useI18n({useScope: "global"});

const storeStore = useStoreStore();
const currencyCode = computed(() => storeStore.getCurrencyCode);

const basketHeaders = computed(() => [
    {title: t('picture'), value: 'picture'},
    {title: t('name'), value: 'title'},
    {title: t('quantity'), value: 'quantity'},
    {title: t('action'), value: 'actions'}
]);

const loaded = ref(false);
const productOptionsStoreBasket = ref(new Array<ProductOptionStoreBasketVM>());
const askConfirmDelete = ref(false);
const tempProductOptionId = ref(null);
const loadingDelete = ref(false);
const showSnackbar = ref(false);
const txtSnackbar = ref(null);

const refreshBasket = async () => {
    productOptionsStoreBasket.value = [];
    const basketProductOptions = await BasketProductOptionRequester.requestBasketProductOptions();
    for (const basketProductOption of basketProductOptions) {
        const productOptionStore = await ProductOptionStoreRequester.requestProductOptionStore(basketProductOption.getProductOptionId(), currencyCode.value);
        const productOptionStoreBasketVM = new ProductOptionStoreBasketVM(productOptionStore, basketProductOption.getQuantity());
        productOptionsStoreBasket.value.push(productOptionStoreBasketVM);
    }
    loaded.value = true;
};

const askDeleteConfirmProductOptionBasket = (productOptionId: string) => {
    askConfirmDelete.value = true;
    tempProductOptionId.value = productOptionId;
};

const handleConfirm = async () => {
    loadingDelete.value = true;
    if (!tempProductOptionId.value) {
        return;
    }
    await axiosServer.delete(`/basket/${tempProductOptionId.value}`);
    await refreshBasket();
    askConfirmDelete.value = false;
    tempProductOptionId.value = null;
    loadingDelete.value = false;
};

const handleRefuse = () => {
    askConfirmDelete.value = false;
    tempProductOptionId.value = null;
};

const handleQuantityUpdated = () => {
    showSnackbar.value = true;
    txtSnackbar.value = t('updateProductOptionBasket.success');
};

const handleErrorQuantity = (errorMessage: string) => {
    showSnackbar.value = true;
    txtSnackbar.value = t(errorMessage);
};

const imageSrc = (productId: string, productOptionId: string, productPictureId: string) => {
    if (!productId || !productOptionId || !productPictureId) {
        return null;
    }
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productId}/productOption/${productOptionId}/image/${productPictureId}`;
};

refreshBasket();
</script>

<style scoped>
.divImgProductOption {
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.divImgProductOption img {
    width: 100px;
}

.quantity {
    display: flex;
    align-items: center;
    width: 100px;
}
</style>