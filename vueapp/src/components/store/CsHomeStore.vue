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

    </div>

</template>

<script lang="ts" setup>
import StoreAccessRequester from "../../requesters/StoreAccessRequester.ts";
import {useI18n} from "vue-i18n";
import {ref, watch} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import CsProductOptionThumbnail from "./CsProductOptionThumbnail.vue";

const {t} = useI18n({useScope: 'global'});

const hasAccessToStore = ref(false);
const featuredProductOptionIds = ref(new Array<string>());

StoreAccessRequester.requestStoreAccess().then((response) => {
    hasAccessToStore.value = response;
});

watch(hasAccessToStore, async () => {
    if (!hasAccessToStore.value) {
        return;
    }
    featuredProductOptionIds.value = await ProductOptionStoreRequester.requestFeaturedProductOptionIds();
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