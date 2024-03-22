<template>
    <footer>
        <div class="selectLanguage">
            <v-btn v-for="availableLocale of availableLocales" :key="availableLocale"
                   @click="selectLang(availableLocale)">
                {{ t(`locale.${availableLocale}`) }}
            </v-btn>
        </div>
        <div class="selectCurrency">
            <v-btn v-for="availableCurrency of availableCurrencies"
                   :key="availableCurrency.getCurrencyCode()"
                   @click="updateCurrency(availableCurrency)">
                {{ availableCurrency.getSymbol() }}
            </v-btn>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import useCustomer from "../../compositionfunctions/customer.ts";
import {useLocale} from "vuetify";
import CurrencyRequester from "../../requesters/CurrencyRequester.ts";
import CurrencyVM from "../../viewmodels/CurrencyVM.ts";
import {Ref, ref} from "vue";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";

const {t, availableLocales, locale} = useI18n({useScope: 'global'});
const {firstColor} = useCustomer();
const storeStore = useStoreStore();
const {current} = useLocale();

const availableCurrencies = ref(new Array<CurrencyVM>()) as Ref<Array<CurrencyVM>>;

CurrencyRequester.requestCurrencies().then(response => {
    availableCurrencies.value = response;
});

const selectLang = (value: any) => {
    locale.value = value;
    current.value = value;
};

const updateCurrency = (availableCurrency: CurrencyVM) => {
    storeStore.setCurrency(availableCurrency.getCurrencyCode(), availableCurrency.getSymbol());
}
</script>

<style scoped>
footer {
    padding: 10px;
    border-top: solid 1px v-bind(firstColor);
}

.selectCurrency {
    margin-top: 10px;
}
</style>