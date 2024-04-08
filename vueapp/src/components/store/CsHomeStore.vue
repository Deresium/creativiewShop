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
            <v-btn :to="{name: 'store'}" class="buttonDiscover">{{ t('discoverStore') }}</v-btn>
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
            <v-btn :to="{name: 'store'}" class="buttonDiscover">{{ t('discoverStore') }}</v-btn>
        </div>

        <div class="featured">
            <h2>{{ t('lastAdded') }}</h2>
            <div class="productOptions">
                <CsProductOptionThumbnail
                    v-for="productOptionId in lastOneAddedProductOptionIds"
                    :key="productOptionId"
                    :product-option-id="productOptionId"
                    class="thumbnail"
                />
            </div>
            <v-btn :to="{name: 'store'}" class="buttonDiscover">{{ t('discoverStore') }}</v-btn>
        </div>

        <div class="featured">
            <h2>{{ t('onlyOneLeft') }}</h2>
            <div class="productOptions">
                <CsProductOptionThumbnail
                    v-for="productOptionId in onlyOneLeftProductOptionIds"
                    :key="productOptionId"
                    :product-option-id="productOptionId"
                    class="thumbnail"
                />
            </div>
            <v-btn :to="{name: 'store'}" class="buttonDiscover">{{ t('discoverStore') }}</v-btn>
        </div>

        <div class="featured">
            <h2>{{ t('random') }}</h2>
            <div class="productOptions">
                <CsProductOptionThumbnail
                    v-for="productOptionId in randomProductOptionIds"
                    :key="productOptionId"
                    :product-option-id="productOptionId"
                    class="thumbnail"
                />
            </div>
            <v-btn :to="{name: 'store'}" class="buttonDiscover">{{ t('discoverStore') }}</v-btn>
        </div>
    </div>

</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import CsProductOptionThumbnail from "./CsProductOptionThumbnail.vue";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";

const {t} = useI18n({useScope: 'global'});
const storeStore = useStoreStore();

const hasAccessToStore = computed(() => storeStore.getHasAccessToStore);
const featuredProductOptionIds = ref(new Array<string>());
const discountProductOptionIds = ref(new Array<string>());
const lastOneAddedProductOptionIds = ref(new Array<string>());
const onlyOneLeftProductOptionIds = ref(new Array<string>());
const randomProductOptionIds = ref(new Array<string>());


ProductOptionStoreRequester.requestFeaturedProductOptionIds().then(response => {
    featuredProductOptionIds.value = response;
});

ProductOptionStoreRequester.requestDiscountProductOptionIds().then(response => {
    discountProductOptionIds.value = response;
});

ProductOptionStoreRequester.requestLastOneAddedProductOptionIds().then(response => {
    lastOneAddedProductOptionIds.value = response;
});

ProductOptionStoreRequester.requestRandomProductOptionIds().then(response => {
    randomProductOptionIds.value = response;
});

ProductOptionStoreRequester.requestOnlyOneLeftProductOptionIds().then(response => {
    onlyOneLeftProductOptionIds.value = response;
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
    margin-bottom: 100px;
    width: 100%;
    align-items: center;
    flex-direction: column;
}

.productOptions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    gap: 20px;
    width: 100%;
}

.thumbnail {
    width: 45%;
}

.buttonDiscover {
    margin-top: 30px;
}

@media (width >= 600px) {
    .thumbnail {
        width: 30%;
    }

    .productOptions {
        gap: 50px;
    }
}

@media (width >= 1200px) {
    .thumbnail {
        width: 17%;
    }
}

@media (width >= 1400px) {
    .thumbnail {
        width: 13%;
    }
}
</style>