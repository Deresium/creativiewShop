<template>
    <div>
        <v-skeleton-loader v-if="!loaded" type="card"></v-skeleton-loader>
        <article v-if="loaded" class="productOption">
            <router-link :to="{name: 'productOptionStore', params: {productOptionId: props.productOptionId}}">
                <img :alt="productOptionStore.getTitle()" :src="firstImageSrc" class="imgThumbnail"/>
            </router-link>
            <div class="info">
                <p class="title">{{ productOptionStore.getTitle() }}</p>
                <p v-if="productOptionStore.getHasStock()" class="inStock">{{ t('inStock') }}</p>
                <p v-if="!productOptionStore.getHasStock()" class="outStock">{{ t('outStock') }}</p>
                <p v-if="productOptionStore.getPreorder()" class="preorder">{{ t('preorder') }}</p>
                <p :class="basePriceClass" class="basePrice">{{ productOptionStore.getBasePrice() }}{{
                        currencySymbol
                    }}</p>
                <div v-if="productOptionStore.getDiscountPrice()">
                    <div class="discount">
                        <p>{{ productOptionStore.getDiscountPrice() }}{{ currencySymbol }}</p>
                        <p>-{{ productOptionStore.getPercent() }} %</p>
                    </div>
                    <p>{{ nbDays }}{{ t('date.d') }} {{ nbHours }}{{ t('date.h') }} {{ nbMinutes }}{{ t('date.m') }}</p>
                </div>
            </div>
            <v-btn :color="firstColor" class="btnConsult" variant="flat" @click="clickOnAddBasket">
                {{ t('addToBasket') }}
            </v-btn>
        </article>
        <v-snackbar v-model="showAddBasketSuccess">
            {{ t('addBasket.success') }}
            <template v-slot:actions>
                <v-btn
                    color="green"
                    variant="text"
                    @click="showAddBasketSuccess = false"
                >
                    {{ t('close') }}
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts" setup>
import {computed, Ref, ref, watch} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import ProductOptionStoreVM from "../../viewmodels/ProductOptionStoreVM.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import useCountdown from "../../compositionfunctions/countdown.ts";
import {useI18n} from "vue-i18n";
import useCustomer from "../../compositionfunctions/customer.ts";
import axiosServer from "../../axios/axiosServer.ts";


const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const {t} = useI18n({useScope: 'global'});

const storeStore = useStoreStore();

const loaded = ref(false);
const productOptionStore: Ref<ProductOptionStoreVM> = ref();
const currencySymbol = computed(() => storeStore.getCurrencySymbol);
const currencyCode = computed(() => storeStore.getCurrencyCode);
const {nbDays, nbHours, nbMinutes, endOfDiscount, startCountdown} = useCountdown();
const {firstColor} = useCustomer();

const showAddBasketSuccess = ref(false);


const firstImageSrc = computed(() => {
    const firstPictureId = productOptionStore.value.getPictures()[0];
    if (firstPictureId) {
        return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productOptionStore.value.getProductId()}/productOption/${props.productOptionId}/image/${firstPictureId}`;
    }
});

const basePriceClass = computed(() => {
    return {
        'lineThrough': productOptionStore.value.getDiscountPrice()
    }
});


const refreshProductOptionStore = async () => {
    loaded.value = false;
    productOptionStore.value = await ProductOptionStoreRequester.requestProductOptionStore(props.productOptionId, currencyCode.value);
    if (productOptionStore.value.getEndDateDiscount()) {
        startCountdown(productOptionStore.value.getEndDateDiscount());
    }
    loaded.value = true;
};

watch(endOfDiscount, async () => {
    if (endOfDiscount.value) {
        await refreshProductOptionStore();
    }
});

refreshProductOptionStore();

watch(currencyCode, () => {
    refreshProductOptionStore();
});

const clickOnAddBasket = async () => {
    await axiosServer.post(`/basket/productOption/${props.productOptionId}`, {
        quantity: 1
    });
    showAddBasketSuccess.value = true;
    await storeStore.refreshNbItemsInStore();
};


</script>

<style scoped>
.productOption {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}

.imgThumbnail {
    width: 100%;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.basePrice {
    margin-top: 5px;
    font-weight: bold;
}

.lineThrough {
    text-decoration: line-through;
    text-decoration-color: #cc0000;
    text-decoration-thickness: 2px;
}

.info {
    width: 100%;
}

.title {
    margin-top: 10px;
    font-size: small;
}

.discount {
    display: flex;
    gap: 10px;
    font-weight: bold;
    color: #cc0000;
}

.btnConsult {
    margin-top: auto;
    width: 100%;
}

.inStock {
    color: darkgreen;
}

.outStock {
    color: #cc0000;
}

.preorder {
    color: dodgerblue;
}
</style>