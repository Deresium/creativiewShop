<template>
    <div class="basket">
        <v-skeleton-loader v-if="!loaded" type="card"></v-skeleton-loader>
        <div v-if="loaded" class="basketLoaded">
            <v-data-table
                :headers="basketHeaders"
                :items="basket.getProductOptionStores()"
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
                        {{ item.getTitle() }}
                        <span v-if="item.hasMultipleOptions()">
                            ({{ item.getTitleOption() }})
                        </span>
                    </router-link>
                    <p v-if="item.getPreorder()" class="preorder">
                        {{ t('preorder') }}
                    </p>
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

                <template #item.price="{ item }">
                    {{ item.getPrice() }}{{ currencySymbol }}
                </template>

                <template #item.total="{ item }">
                    {{ item.getTotal() }}{{ currencySymbol }}
                </template>

                <template #item.actions="{ item }">
                    <v-btn color="red" icon="mdi-delete-empty" size="25px"
                           @click="askDeleteConfirmProductOptionBasket(item.getProductOptionId())"/>
                </template>
            </v-data-table>

            <CsBasketAddress
                v-if="!basketErrorReport.hasProductOptionErrors()"
                :billing-address-id="basket.getBillingAddressId()"
                :delivery-address-id="basket.getDeliveryAddressId()"
                @delivery-country-changed="refreshBasket"
                @billing-address-changed="refreshBasketErrorReport"
            />


            <CsBasketDeliveryOption
                v-if="basket.getDeliveryAddressCountryId() && !basketErrorReport.hasProductOptionErrors()"
                :delivery-country-id="basket.getDeliveryAddressCountryId()"
                :delivery-option-id="basket.getDeliveryOptionId()"
                @delivery-option-changed="refreshBasket"/>


            <CsBasketPaymentMethod
                v-if="!basketErrorReport.hasProductOptionErrors() && currencyCode && basket.getTotal()"
                :currency-code="currencyCode"
                :paymentMethod="basket.getPaymentMethod()"
                :total="basket.getTotal()"
                @payment-method-changed="refreshBasketErrorReport"
            />

            <v-alert v-if="basket.getHasPreorderItems()" class="infoPreorder"
                     type="warning">
                <p>{{ t('preorder.info.title') }}</p>
                <p>{{ t('preorder.info.1') }}</p>
                <p>{{ t('preorder.info.2') }}</p>
                <p>{{ t('preorder.info.3') }}</p>
            </v-alert>


            <div class="basketTotal">
                <p>{{ t('total') }}: {{ basket.getTotal() }}{{ currencySymbol }}</p>
            </div>

            <div class="validate">
                <v-btn v-if="!basketErrorReport.hasErrors()" :disabled="loadingValidationBasket"
                       :loading="loadingValidationBasket" @click="validateBasket">{{ t('validateBasket') }}
                </v-btn>
            </div>


            <v-alert v-if="basketErrorReport.hasProductOptionErrors()" type="error">
                <p v-for="error in basketErrorReport.getProductOptionErrors()" :key="error.getId()">
                    {{ t(error.getReason(), {productName: error.getLabel()}) }}</p>
            </v-alert>


            <v-alert v-if="!basketErrorReport.hasProductOptionErrors() && basketErrorReport.hasBasketErrors()"
                     type="error">
                <p v-for="error in basketErrorReport.getBasketErrors()" :key="error.getId()">
                    {{ t(error.getReason()) }}</p>
            </v-alert>
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
import {computed, Ref, ref, watch} from "vue";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";
import CsBasketQuantity from "../store/CsBasketQuantity.vue";
import BasketVM from "../../viewmodels/BasketVM";
import BasketErrorReportVM from "../../viewmodels/BasketErrorReportVM.ts";
import BasketErrorReportRequester from "../../requesters/BasketErrorReportRequester.ts";
import router from "../../router/router.ts";
import BasketRequester from "../../requesters/BasketRequester.ts";
import CsBasketDeliveryOption from "../store/CsBasketDeliveryOption.vue";
import CsBasketAddress from "../store/CsBasketAddress.vue";
import CsBasketPaymentMethod from "../store/CsBasketPaymentMethod.vue";

const {t} = useI18n({useScope: "global"});

const storeStore = useStoreStore();
const currencySymbol = computed(() => storeStore.getCurrencySymbol);
const currencyCode = computed(() => storeStore.getCurrencyCode);

const basketHeaders = computed(() => [
    {title: t('picture'), value: 'picture'},
    {title: t('name'), value: 'title'},
    {title: t('quantity'), value: 'quantity'},
    {title: t('price'), value: 'price'},
    {title: t('total'), value: 'total'},
    {title: t('action'), value: 'actions'}
]);

const loaded = ref(false);
const loadingValidationBasket = ref(false);
const basket: Ref<BasketVM> = ref(null);
const basketErrorReport: Ref<BasketErrorReportVM> = ref(null);
const askConfirmDelete = ref(false);
const tempProductOptionId = ref(null);
const loadingDelete = ref(false);
const showSnackbar = ref(false);
const txtSnackbar = ref(null);

const refreshBasket = async () => {
    loaded.value = false;
    basket.value = await BasketRequester.requestBasket(currencyCode.value);
    basketErrorReport.value = await BasketErrorReportRequester.requestBasketErrorReport();
    loaded.value = true;
};

const refreshBasketErrorReport = async () => {
    basketErrorReport.value = await BasketErrorReportRequester.requestBasketErrorReport();
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
    await axiosServer.delete(`/basket/productOption/${tempProductOptionId.value}`);
    await refreshBasket();
    await storeStore.refreshNbItemsInStore();
    askConfirmDelete.value = false;
    tempProductOptionId.value = null;
    loadingDelete.value = false;
};

const handleRefuse = () => {
    askConfirmDelete.value = false;
    tempProductOptionId.value = null;
};

const handleQuantityUpdated = async () => {
    await storeStore.refreshNbItemsInStore();
    await refreshBasket();
    showSnackbar.value = true;
    txtSnackbar.value = t('updateProductOptionBasket.success');
};

const handleErrorQuantity = (errorMessage: string) => {
    showSnackbar.value = true;
    txtSnackbar.value = t(errorMessage);
};

const validateBasket = async () => {
    try {
        loadingValidationBasket.value = true;
        await axiosServer.post('/basket/basketToOrder', {}, {
            params: {
                currency: currencyCode.value
            }
        });
        await storeStore.refreshNbItemsInStore();
        await router.push({name: 'basketOrderSuccess'});
        loadingValidationBasket.value = false;
    } catch (error) {
        await refreshBasket();
    }
};

const imageSrc = (productId: string, productOptionId: string, productPictureId: string) => {
    if (!productId || !productOptionId || !productPictureId) {
        return null;
    }
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productId}/productOption/${productOptionId}/image/${productPictureId}`;
};

refreshBasket();

watch(currencyCode, async () => {
    await refreshBasket();
});

</script>

<style scoped>
.basket {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 30px;
}

.basketTotal {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: x-large;
}

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

.preorder {
    color: dodgerblue;
}

.infoPreorder {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>