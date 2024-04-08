<template>
    <div class="store">
        <v-skeleton-loader v-if="!loadedStore" type="card"></v-skeleton-loader>

        <div v-if="loadedStore" class="storeLoaded">

            <div v-if="categories.length >= 1" class="filter">
                <v-btn :color="firstColor" append-icon="mdi-plus" variant="flat" @click="showFilters=true">
                    {{ t('filter') }}
                </v-btn>
            </div>
            <div v-if="selectedManufacturerNames.length >= 1" class="manufacturer">
                <p>{{ t('manufacturer') }}: {{ selectedManufacturerNames[0] }}</p>
            </div>

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

            <v-overlay v-if="showFilters" v-model="showFilters" :scrim="firstColor"
                       opacity="99%">
                <div class="overlayContent">
                    <v-btn class="closeIcon" density="compact" icon="mdi-close" variant="flat"
                           @click="showFilters=false"/>
                    <div class="categoriesFilter">
                        <h2>{{ t('categories') }}</h2>
                        <CsStoreFilter
                            v-for="category in categories"
                            :key="category.getCategoryId()"
                            :base-selection="selectedCategories"
                            :category="category"
                            @value-change="updateSelectedCategories"
                        />
                    </div>
                    <!--                    <div class="manufacturerFilter">
                                            <v-checkbox
                                                v-for="manufacturer in manufacturers"
                                                :key="manufacturer.getManufacturerId()"
                                                v-model="selectedManufacturers"
                                                :hide-details="true"
                                                :label="manufacturer.getName()"
                                                :value="manufacturer.getManufacturerId()"
                                                density="compact"
                                            />
                                        </div>-->
                    <v-btn variant="flat" @click="searchFilter">{{ t('search') }}</v-btn>
                </div>
            </v-overlay>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {Ref, ref} from "vue";
import ProductOptionStoreRequester from "../../requesters/ProductOptionStoreRequester.ts";
import CsProductOptionThumbnail from "../store/CsProductOptionThumbnail.vue";
import {useI18n} from "vue-i18n";
import CategoryVM from "../../viewmodels/CategoryVM.ts";
import CategoryRequester from "../../requesters/CategoryRequester.ts";
import useCustomer from "../../compositionfunctions/customer.ts";
import CsStoreFilter from "../store/CsStoreFilter.vue";
import ManufacturerVM from "../../viewmodels/ManufacturerVM.ts";
import ManufacturerRequester from "../../requesters/ManufacturerRequester.ts";

const {t} = useI18n({useScope: "global"});

const {query: {searchTerm, manufacturerIds}} = useRoute();
let searchTermString: string = null;
let manufacturersQuery = new Array<string>();
if (searchTerm) {
    searchTermString = String(searchTerm);
}

if (manufacturerIds) {
    if (typeof manufacturerIds === 'string') {
        manufacturersQuery.push(manufacturerIds);
    } else {
        manufacturersQuery.push(...manufacturerIds);
    }
}

const {firstColor} = useCustomer();

const nbPage = ref(1);
const loadedStore = ref(false);
const searchedProductOptionIds = ref(new Array<string>());
const categories = ref(new Array<CategoryVM>()) as Ref<Array<CategoryVM>>;
const manufacturers = ref(new Array<ManufacturerVM>());
const selectedCategories = ref(new Map<string, string>());
const selectedManufacturerNames = ref(new Array<string>());
const showFilters = ref(false);

const refreshStore = async () => {
    loadedStore.value = false;
    searchedProductOptionIds.value = await ProductOptionStoreRequester.requestSearchAllProductOptionIds(searchTermString, [...selectedCategories.value.keys()], manufacturersQuery);
    loadedStore.value = true;
};
refreshStore();

CategoryRequester.requestCategories().then(response => {
    categories.value = response;
});

ManufacturerRequester.getManufacturers().then(response => {
    manufacturers.value = response;
    for (const manufacturer of manufacturers.value) {
        if (manufacturersQuery.includes(manufacturer.getManufacturerId())) {
            selectedManufacturerNames.value.push(manufacturer.getName());
        }
    }
});

const updateSelectedCategories = (checked: boolean, categoryId: string) => {
    if (checked) {
        selectedCategories.value.set(categoryId, categoryId);
    } else {
        selectedCategories.value.delete(categoryId);
    }
};

const searchFilter = async () => {
    await refreshStore();
    showFilters.value = false;
};

/*const onClickOutside = () => {
    showFilters.value = false;
};*/

const goToNextPage = (nextFct: Function) => {
    nbPage.value++;
    nextFct();
};

const goToPrevPage = (prevFct: Function) => {
    nbPage.value--;
    prevFct();
};

</script>

<style scoped>
.storeLoaded {
    margin: 10px;
}

.filter {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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

.overlayContent {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    padding-left: 10px;
}

.closeIcon {
    position: absolute;
    right: 10px;
    top: 10px;
}

.categoriesFilter {
    margin-bottom: 10px;
}

.categoriesFilter h2 {
    padding-left: 0;
}

.manufacturer {
    margin-bottom: 20px;
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