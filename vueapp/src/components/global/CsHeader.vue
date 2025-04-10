<template>
    <header>
        <div class="left headerItem">
            <v-btn icon="mdi-menu" variant="flat" @click="clickOnMenu"/>
        </div>
        <div class="center headerItem">
            <img :src="srcImg" alt="logo" class="imgLogo" @click="clickOnLogo"/>
        </div>

        <div class="right headerItem">
            <div class="selectors">
                <CsSelectLocale/>
                <CsSelectCurrency v-if="hasAccessToStore"/>
            </div>
            <div class="storeButtons">
                <v-btn v-if="hasAccessToStore" icon="mdi-magnify" variant="flat" @click="handleClickSearch"/>
                <v-badge v-if="hasAccessToStore" :content="nbItemsCart">
                    <v-btn icon="mdi-cart" variant="flat" @click="clickOnBasket"/>
                </v-badge>
            </div>
        </div>
        <CsMenu/>
    </header>

    <v-overlay v-if="showSearchOverlay" v-model="showSearchOverlay" :scrim="firstColor" class="overlay" opacity="99%">
        <div class="overlayContent">
            <p>{{ t('searchTermTitle') }}</p>
            <v-form v-model="formValid" validate-on="input" @submit.prevent="submitFormSearch">
                <v-text-field v-model="searchTerm" :label="t('searchTerm')" name="searchTerm"/>
                <v-btn type="submit">{{ t('submit') }}</v-btn>
            </v-form>
        </div>
    </v-overlay>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import CsMenu from "./CsMenu.vue";
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";
import router from "../../router/router.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import {useI18n} from "vue-i18n";
import useCustomer from "../../compositionfunctions/customer.ts";
import CsSelectLocale from "./CsSelectLocale.vue";
import CsSelectCurrency from "./CsSelectCurrency.vue";

const {t} = useI18n({useScope: "global"});

const {customerId, firstColor} = useCustomer();
const globalStore = useGlobalStore();
const storeStore = useStoreStore();


const hasAccessToStore = computed(() => storeStore.getHasAccessToStore);
const srcImg = computed((() => `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/logos/${customerId.value}.png`));

const showSearchOverlay = ref(false);
const formValid = ref(false);
const searchTerm = ref(null);
const nbItemsCart = computed(() => storeStore.getNbItemsInBasket);

const clickOnMenu = () => {
    globalStore.setShowMenuOverlay(true);
};

const clickOnLogo = async () => {
    await router.push({name: 'home'});
};

const clickOnBasket = async () => {
    await router.push({name: 'basket'});
};

const handleClickSearch = () => {
    showSearchOverlay.value = true;
};

const submitFormSearch = async () => {
    await router.push({name: 'store', query: {searchTerm: searchTerm.value}});
    showSearchOverlay.value = false;
};

</script>

<style scoped>
header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.headerItem {
    width: 33%;
    display: flex;
}

.center {
    justify-content: center;
}

.right {
    justify-content: flex-end;
}

img.imgLogo {
    width: 150px;
    cursor: pointer;
}

.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
}

.selectors {
    display: none;
}

@media (width >= 1200px) {
    .selectors {
        display: flex;
        column-gap: 10px;
    }
}

</style>