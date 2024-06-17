<template>
    <div class="store">
        <v-skeleton-loader v-if="!loadedStore" type="card"></v-skeleton-loader>

        <div v-if="loadedStore" class="storeLoaded">

            <div class="filter">
                <v-autocomplete v-if="categories.length >= 1" v-model="selectedCategories" :items="categories"
                                :label="('category')"
                                :multiple="true" density="compact"
                                name="category"/>
                <v-autocomplete v-if="manufacturers.length >= 1" v-model="selectedManufacturers" :items="manufacturers"
                                :label="('manufacturer')"
                                :multiple="true" density="compact"
                                name="manufacturer"/>
            </div>

            <v-chip-group v-model="orderBySelected" class="chips">
                <v-chip v-for="orderWay in orderWays" :key="orderWay" :color="firstColor" :value="orderWay">
                    {{ t(`sort.${orderWay}`) }}
                </v-chip>
            </v-chip-group>

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
import {computed, Ref, ref, watch} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import CsProductOptionThumbnail from "../store/CsProductOptionThumbnail.vue";
import {useI18n} from "vue-i18n";
import ManufacturerRequester from "../../requesters/ManufacturerRequester.ts";
import CategoryFlatRequester from "../../requesters/CategoryFlatRequester.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import Debouncer from "../../compositionfunctions/Debouncer.ts";
import useCustomer from "../../compositionfunctions/customer.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";

const {t, locale} = useI18n({useScope: "global"});

const {query: {searchTerm, sort, manufacturerIds}} = useRoute();
let searchTermString: string = null;
let sortString: string = null;
if (searchTerm) {
    searchTermString = String(searchTerm);
}

if (sort) {
    sortString = String(sort);
}

const {firstColor} = useCustomer();
const storeStore = useStoreStore();
const currencyCode = computed(() => storeStore.getCurrencyCode);


const nbPage = ref(1);
const loadedStore = ref(false);
const searchedProductOptionIds = ref(new Array<string>());
const categories = ref(new Array<TitleValueVM<string, string>>()) as Ref<Array<TitleValueVM<string, string>>>;
const manufacturers = ref(new Array<TitleValueVM<string, string>>()) as Ref<Array<TitleValueVM<string, string>>>;
const selectedCategories = ref(new Array<string>());
const selectedManufacturers = ref(new Array<string>());
const orderBySelected = ref();
const orderWays = [
    'PRICE_ASC',
    'PRICE_DESC',
    'DATEADD_ASC',
    'DATEADD_DESC'
];

if (sortString) {
    orderBySelected.value = sortString;
}

if (manufacturerIds) {
    if (typeof manufacturerIds === 'string') {
        selectedManufacturers.value.push(manufacturerIds);
    } else {
        selectedManufacturers.value.push(...manufacturerIds);
    }
}

const refreshStore = async () => {
    loadedStore.value = false;
    searchedProductOptionIds.value = await ProductOptionStoreRequester.requestSearchAllProductOptionIds(searchTermString, currencyCode.value, orderBySelected.value, selectedCategories.value, selectedManufacturers.value);
    loadedStore.value = true;
};
refreshStore();

CategoryFlatRequester.requestCategoriesFlat().then(response => {
    categories.value = response.map(category => {
        let title = category.getNameEn();
        if (locale.value === 'fr') {
            title = category.getNameFr();
        }
        return new TitleValueVM<string, string>(title, category.getCategoryId());
    });
});

ManufacturerRequester.getManufacturers().then(response => {
    manufacturers.value = response.map(manufacturer => new TitleValueVM<string, string>(manufacturer.getName(), manufacturer.getManufacturerId()));
});

const debounceRefreshStore = new Debouncer(1000, refreshStore);

watch([selectedManufacturers, selectedCategories], () => {
    debounceRefreshStore.debounce();
});


const goToNextPage = (nextFct: Function) => {
    nbPage.value++;
    nextFct();
};

const goToPrevPage = (prevFct: Function) => {
    nbPage.value--;
    prevFct();
};

watch(orderBySelected, () => {
    refreshStore();
});

</script>

<style scoped>
.storeLoaded {
    margin: 10px;
}

.productOptions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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

.categoriesFilter h2 {
    padding-left: 0;
}

.filter {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.chips {
    margin-bottom: 10px;
}

@media (width >= 600px) {
    .thumbnail {
        width: 27%;
    }

    .productOptions {
        gap: 50px;
        justify-content: flex-start;
    }
}

@media (width >= 1200px) {
    .thumbnail {
        width: 17%;
    }

    .storeLoaded {
        margin: 50px;
    }
}

@media (width >= 1400px) {
    .thumbnail {
        width: 13%;
    }
}

</style>