<template>
    <div v-if="hasAccessToStore" class="store">

        <div class="featured">
            <h2>{{ t('featured') }}</h2>
            <div class="productOptions">
                <CsProductOptionThumbnail
                    v-for="productOptionId in featuredProductOptionIds"
                    :key="productOptionId"
                    :product-option-id="productOptionId"
                    class="thumbnail"
                />
            </div>
        </div>

        <div class="featured">
            <h2>{{ t('discount') }}</h2>
            <div class="productOptions">
                <CsProductOptionThumbnail
                    v-for="productOptionId in discountProductOptionIds"
                    :key="productOptionId"
                    :product-option-id="productOptionId"
                    class="thumbnail"
                />
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import StoreAccessRequester from "../../requesters/StoreAccessRequester.ts";
import {useI18n} from "vue-i18n";
import {computed, ref, watch} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import CsProductOptionThumbnail from "./CsProductOptionThumbnail.vue";
import {useUserStore} from "../../pinia/user/UserStore.ts";

const {t} = useI18n({useScope: 'global'});
const userStore = useUserStore();
const loggedIn = computed(() => userStore.isLoggedIn);

const hasAccessToStore = ref(false);
const featuredProductOptionIds = ref(new Array<string>());
const discountProductOptionIds = ref(new Array<string>());

StoreAccessRequester.requestStoreAccess().then((response) => {
    hasAccessToStore.value = response;
});

watch(hasAccessToStore, async () => {
    if (!hasAccessToStore.value) {
        return;
    }
    //featuredProductOptionIds.value = await ProductOptionStoreRequester.requestFeaturedProductOptionIds();
    discountProductOptionIds.value = await ProductOptionStoreRequester.requestDiscountProductOptionIds();
});

watch(loggedIn, async () => {
    hasAccessToStore.value = await StoreAccessRequester.requestStoreAccess();
});


</script>

<style scoped>

.store {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.featured {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
}

.productOptions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: stretch;
    row-gap: 30px;
    width: 100%;
}

.thumbnail {
    width: 40%;
}
</style>