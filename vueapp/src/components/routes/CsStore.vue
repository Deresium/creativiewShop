<template>
    <div class="store">
        <v-skeleton-loader v-if="!loadedStore" type="card"></v-skeleton-loader>
        <div v-if="loadedStore" class="storeLoaded">
            <v-data-iterator :items="searchedProductOptionIds" :items-per-page="10" :page="nbPage">
                <template #default="{ items }">
                    <div class="productOptions">
                        <template
                            v-for="(item) in items"
                            :key="item.raw"
                        >
                            <CsProductOptionThumbnail
                                :product-option-id="item.raw"
                                class="thumbnail"
                            />

                        </template>
                    </div>
                </template>
                <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                    <div class="footer">
                        <v-btn
                            :disabled="page === 1"
                            density="comfortable"
                            icon="mdi-arrow-left"
                            rounded
                            variant="tonal"
                            @click="goToPrevPage(prevPage)"
                        />

                        <div class="page">
                            <span>{{ t('page') }}</span>
                            <v-text-field v-model="nbPage" :hide-details="true" density="compact"
                                          name="page"/>
                            <span>{{ t('of') }} {{ pageCount }}</span>
                        </div>
                        <v-btn
                            :disabled="page >= pageCount"
                            density="comfortable"
                            icon="mdi-arrow-right"
                            rounded
                            variant="tonal"
                            @click="goToNextPage(nextPage)"
                        />
                    </div>
                </template>
            </v-data-iterator>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import CsProductOptionThumbnail from "../store/CsProductOptionThumbnail.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: "global"});

const {query: {searchTerm}} = useRoute();
let searchTermString: string = null;
if (searchTerm) {
    searchTermString = String(searchTerm);
}
const nbPage = ref(1);
const loadedStore = ref(false);
const searchedProductOptionIds = ref(new Array<string>());

const refreshStore = async () => {
    searchedProductOptionIds.value = await ProductOptionStoreRequester.requestSearchAllProductOptionIds(searchTermString);
    loadedStore.value = true;
};

const goToNextPage = (nextFct: Function) => {
    nbPage.value++;
    nextFct();
};

const goToPrevPage = (prevFct: Function) => {
    nbPage.value--;
    prevFct();
};

refreshStore();

</script>

<style scoped>
.productOptions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    gap: 20px;
    width: 100%;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
}

.footer .page {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    padding-left: 10px;
    padding-right: 10px;
}

.thumbnail {
    width: 45%;
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