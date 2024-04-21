<template>
    <div class="content">
        <v-skeleton-loader v-if="!loaded" type="card"></v-skeleton-loader>
        <article v-if="loaded">
            <div class="carousel">
                <v-carousel height="300px" show-arrows="hover">
                    <v-carousel-item
                        v-for="productPictureId in productOptionStore.getPictures()"
                        :key="productPictureId"
                        @click="clickOnCarouselItem(productPictureId)"
                    >
                        <div class="contentCarousel">
                            <img
                                :src="imageSrc(productPictureId)"
                                alt="product image"
                                class="imgCarousel">
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div class="allPictures">
                <img
                    v-for="productPictureId in productOptionStore.getPictures()"
                    :key="productPictureId"
                    :src="imageSrc(productPictureId)"
                    alt="product image"
                    class="imgAllImage"
                    @click="clickOnCarouselItem(productPictureId)"
                />
            </div>

            <div class="info">
                <p class="title">{{ productOptionStore.getTitle() }}</p>
                <p v-if="productOptionStore.getHasStock()" class="inStock">{{ t('inStock') }}</p>
                <p v-if="!productOptionStore.getHasStock()" class="outStock">{{ t('outStock') }}</p>
                <p v-if="productOptionStore.getManufacturer()">
                    {{ t('manufacturer') }}:
                    <router-link
                        :to="{name: 'store', query: {manufacturerIds: productOptionStore.getManufacturerId() }}">
                        {{ productOptionStore.getManufacturer() }}
                    </router-link>
                </p>
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

                <div v-if="productOptionStore.getAllOptions().length > 1" class="option">
                    <v-select v-model="selectedOption" :items="productOptionStore.getAllOptions()"/>
                </div>

                <v-btn :color="firstColor" class="btnAddBasket" variant="flat" @click="clickOnAddBasket">
                    {{ t('addToBasket') }}
                </v-btn>

                <p class="description">{{ productOptionStore.getDescription() }}</p>
            </div>
        </article>
    </div>

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

    <v-overlay v-if="showOverlayImg" v-model="showOverlayImg" class="overlay" opacity="95%">
        <img :src="imageSrc(pictureIdOverlay)" alt="image product" class="imgOverlay"/>
    </v-overlay>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import {computed, Ref, ref, watch} from "vue";
import ProductOptionStoreVM from "../../viewmodels/ProductOptionStoreVM.ts";
import useCountdown from "../../compositionfunctions/countdown.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import {useRoute} from "vue-router";
import router from "../../router/router.ts";
import useCustomer from "../../compositionfunctions/customer.ts";
import axiosServer from "../../axios/axiosServer.ts";


const {t} = useI18n({useScope: 'global'});

const {params: {productOptionId}} = useRoute();
const productOptionIdString = String(productOptionId);

const storeStore = useStoreStore();
const {firstColor} = useCustomer();

const loaded = ref(false);
const showOverlayImg = ref(false);
const pictureIdOverlay = ref(null);
const productOptionStore: Ref<ProductOptionStoreVM> = ref();
const currencySymbol = computed(() => storeStore.getCurrencySymbol);
const currencyCode = computed(() => storeStore.getCurrencyCode);
const {nbDays, nbHours, nbMinutes, endOfDiscount, startCountdown} = useCountdown();
const selectedOption = ref(null);
const showAddBasketSuccess = ref(false);

const refreshProductOptionStore = async () => {
    loaded.value = false;
    productOptionStore.value = await ProductOptionStoreRequester.requestProductOptionStore(productOptionIdString, currencyCode.value);
    selectedOption.value = productOptionStore.value.getProductOptionId();
    if (productOptionStore.value.getEndDateDiscount()) {
        startCountdown(productOptionStore.value.getEndDateDiscount());
    }
    loaded.value = true;
};

refreshProductOptionStore();

const basePriceClass = computed(() => {
    return {
        'lineThrough': productOptionStore.value.getDiscountPrice()
    }
});

watch(endOfDiscount, async () => {
    if (endOfDiscount.value) {
        await refreshProductOptionStore();
    }
});

watch(selectedOption, async () => {
    await router.push({name: 'productOptionStore', params: {productOptionId: selectedOption.value}});
});

const clickOnCarouselItem = (productPictureId: string) => {
    pictureIdOverlay.value = productPictureId;
    showOverlayImg.value = true;
};

const clickOnAddBasket = async () => {
    await axiosServer.post(`/basket/productOption/${productOptionIdString}`, {
        quantity: 1
    });
    showAddBasketSuccess.value = true;
    await storeStore.refreshNbItemsInStore();
};
const imageSrc = (productPictureId: string) => {
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productOptionStore.value.getProductId()}/productOption/${productOptionIdString}/image/${productPictureId}`;
}
</script>

<style scoped>
.content {
    padding: 10px;
}

.basePrice {
    margin-top: 5px;
    font-weight: bold;
}

.title {
    margin-top: 10px;
}

.lineThrough {
    text-decoration: line-through;
    text-decoration-color: #cc0000;
    text-decoration-thickness: 2px;
}

.discount {
    display: flex;
    gap: 10px;
    font-weight: bold;
    color: #cc0000;
}


.overlay {
    display: flex;
    margin-top: 10vh;
    justify-content: center;
}

.imgOverlay {
    width: 90%;
    margin-left: 5%;
}

.contentCarousel {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.imgCarousel {
    width: auto;
    max-height: 300px;
}

.description {
    white-space: pre-wrap;
}

.allPictures {
    display: none;
}

.btnAddBasket {
    margin-top: 10px;
    margin-bottom: 30px;
}

.inStock {
    color: darkgreen;
}

.outStock {
    color: #cc0000;
}

@media (width >= 1200px) {
    article {
        display: flex;
    }

    .carousel {
        display: none;
    }

    .allPictures {
        width: 60%;
        display: block;
    }

    .info {
        width: 40%;
    }

    .imgAllImage {
        width: 300px;
        height: 300px;
        object-fit: cover;
    }
}

</style>