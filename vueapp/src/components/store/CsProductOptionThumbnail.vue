<template>
    <div>
        <v-skeleton-loader v-if="!loaded" type="card"></v-skeleton-loader>
        <article v-if="loaded" class="productOption">
            <img :alt="productOptionStore.getTitle()" :src="firstImageSrc" class="imgThumbnail"/>
            <p>{{ productOptionStore.getTitle() }}</p>
            <p>{{ productOptionStore.getBasePrice() }} {{ currencySymbol }}</p>
        </article>
    </div>
</template>

<script lang="ts" setup>
import {computed, Ref, ref} from "vue";
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

ProductOptionStoreRequester.requestProductOptionStore(props.productOptionId).then(response => {
    productOptionStore.value = response;
    loaded.value = true;
});

const firstImageSrc = computed(() => {
    const firstPictureId = productOptionStore.value.getPictures()[0];
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productOptionStore.value.getProductId()}/productOption/${props.productOptionId}/image/${firstPictureId}`;
});

const currencySymbol = computed(() => storeStore.getCurrencySymbol);
</script>

<style scoped>
.imgThumbnail {
    width: 100%;
}
</style>