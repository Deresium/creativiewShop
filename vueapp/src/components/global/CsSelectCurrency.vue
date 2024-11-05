<template>
    <v-select v-model="selectedCurrency" :hide-details="true" :items="availableCurrencies" :label="t('currency')"
              density="compact"/>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import CurrencyRequester from "../../requesters/CurrencyRequester.ts";
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});

const storeStore = useStoreStore();

const localStorageCurrency = localStorage.getItem("currency");
const initialValueCurrency = localStorageCurrency ? localStorageCurrency : storeStore.getCurrencyCode;

const selectedCurrency = ref(initialValueCurrency);

const availableCurrencies = ref(new Array<TitleValueVM<string, string>>());

CurrencyRequester.requestCurrencies().then(response => {
    availableCurrencies.value = response.map(currency => new TitleValueVM(currency.getSymbol(), currency.getCurrencyCode()));
});


watch(selectedCurrency, async () => {
    localStorage.setItem("currency", selectedCurrency.value);
    await storeStore.setCurrency(selectedCurrency.value);
}, {immediate: true});

</script>

<style scoped>

</style>