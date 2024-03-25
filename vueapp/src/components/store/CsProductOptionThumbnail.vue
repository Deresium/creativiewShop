<template>
    <div>
        <v-skeleton-loader v-if="!loaded" type="card"></v-skeleton-loader>
        <article v-if="loaded" class="productOption">
            <img :alt="productOptionStore.getTitle()" :src="firstImageSrc" class="imgThumbnail"/>
            <p>{{ productOptionStore.getTitle() }}</p>
            <p>{{ productOptionStore.getBasePrice() }} {{ currencySymbol }}</p>
            <div v-if="productOptionStore.getDiscountPrice()">
                <p>{{ productOptionStore.getDiscountPrice() }} {{ currencySymbol }}</p>
                <p>{{ productOptionStore.getPercent() }} %</p>
                <p>{{ nbDays }} {{ nbHours }} {{ minutes }} {{ seconds }}</p>
            </div>
        </article>
    </div>
</template>

<script lang="ts" setup>
import {computed, Ref, ref, watch} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import ProductOptionStoreVM from "../../viewmodels/ProductOptionStoreVM.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";


const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const storeStore = useStoreStore();

const loaded = ref(false);
const productOptionStore: Ref<ProductOptionStoreVM> = ref();
const currencySymbol = computed(() => storeStore.getCurrencySymbol);
const currencyCode = computed(() => storeStore.getCurrencyCode);
const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60;
const oneMinute = 1000 * 60;
const oneSecond = 1000;
const nbDays = ref();
const nbHours = ref();
const minutes = ref();
const seconds = ref();


setInterval(() => {
    if (!productOptionStore.value || !productOptionStore.value.getDiscountPrice()) {
        return;
    }

    const dateNow = new Date();
    const diff = productOptionStore.value.getEndDateDiscount().getTime() - dateNow.getTime();
    nbDays.value = Math.floor(diff / oneDay);
    const remainderHours = diff - (nbDays.value * oneDay);
    nbHours.value = Math.floor(remainderHours / oneHour).toString().padStart(2, '0');
    const remainderMinutes = remainderHours - (nbHours.value * oneHour);
    minutes.value = Math.floor(remainderMinutes / oneMinute).toString().padStart(2, '0');
    const remainderSeconds = remainderMinutes - (minutes.value * oneMinute);
    seconds.value = Math.floor(remainderSeconds / oneSecond).toString().padStart(2, '0');
}, 1000);

const firstImageSrc = computed(() => {
    const firstPictureId = productOptionStore.value.getPictures()[0];
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productOptionStore.value.getProductId()}/productOption/${props.productOptionId}/image/${firstPictureId}`;
});


const refreshProductOptionStore = async () => {
    loaded.value = false;
    productOptionStore.value = await ProductOptionStoreRequester.requestProductOptionStore(props.productOptionId, currencyCode.value);
    loaded.value = true;
};

refreshProductOptionStore();

watch(currencyCode, () => {
    refreshProductOptionStore();
});


</script>

<style scoped>
.imgThumbnail {
    width: 100%;
}
</style>