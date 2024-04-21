<template>
    <v-overlay v-model="showMenuOverlay" :scrim="firstColor" class="overlay" opacity="100%">
        <div class="overlayContent">
            <div class="topContent">
                <div class="routes">
                    <RouterLink v-if="isAdminStore" :to="{name: 'admin'}" @click="clickOnRoute">{{
                            t('adminZone')
                        }}
                    </RouterLink>
                    <RouterLink v-if="hasAccessToStore" :to="{name: 'store'}" @click="clickOnRoute">{{
                            t('store')
                        }}
                    </RouterLink>
                </div>
                <v-btn v-if="isLoggedIn" @click="clickOnLogout">{{ t('logout') }}</v-btn>
            </div>

            <div class="bottomContent">
                <div class="selectLanguage">
                    <v-select v-model="selectedLocale" :items="availableLocalesTitleValues" :label="t('language')"/>
                </div>
                <div class="selectCurrency">
                    <v-select v-model="selectedCurrency" :items="availableCurrencies" :label="t('currency')"/>
                </div>
            </div>
        </div>
    </v-overlay>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";
import {computed, ref, watch} from "vue";
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {useI18n} from "vue-i18n";
import useUser from "../../compositionfunctions/user.ts";
import router from "../../router/router.ts";
import useCustomer from "../../compositionfunctions/customer.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import CurrencyRequester from "../../requesters/CurrencyRequester.ts";
import {useLocale} from "vuetify";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";

const globalStore = useGlobalStore();
const userStore = useUserStore();

const {t, availableLocales, locale} = useI18n({useScope: 'global'});
const {isLoggedIn, isAdminStore} = useUser();
const {firstColor} = useCustomer();
const storeStore = useStoreStore();
const {current} = useLocale();

const selectedLocale = ref(locale.value);
const selectedCurrency = ref(storeStore.getCurrencyCode);

const hasAccessToStore = computed(() => storeStore.getHasAccessToStore);

const showMenuOverlay = computed({
    get(): boolean {
        return globalStore.getShowMenuOverlay;
    },
    set(value: boolean) {
        globalStore.setShowMenuOverlay(value);
    }
});

const clickOnRoute = () => {
    globalStore.setShowMenuOverlay(false);
};

const clickOnLogout = async () => {
    await userStore.logout();
    await router.push({name: 'home'});
    globalStore.setShowMenuOverlay(false);
};

const availableLocalesTitleValues = computed(() => {
    return availableLocales.map(availableLocale => new TitleValueVM(t(`locale.${availableLocale}`), availableLocale));
});

const availableCurrencies = ref(new Array<TitleValueVM<string, string>>());

CurrencyRequester.requestCurrencies().then(response => {
    availableCurrencies.value = response.map(currency => new TitleValueVM(currency.getSymbol(), currency.getCurrencyCode()));
});

watch(selectedLocale, () => {
    locale.value = selectedLocale.value;
    current.value = selectedLocale.value;
});

watch(selectedCurrency, async () => {
    await storeStore.setCurrency(selectedCurrency.value);
});

</script>


<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlayContent {
    display: flex;
    height: 90vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.topContent {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.routes {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.routes a {
    font-size: x-large;
    display: block;
    text-decoration: none;
}
</style>