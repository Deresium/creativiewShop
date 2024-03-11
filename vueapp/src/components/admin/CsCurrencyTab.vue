<template>
    <h2>{{ t('currency') }}</h2>
    <div class="currencies">
        <v-chip-group v-model="selectedCurrency" selected-class="selected">
            <v-chip
                v-for="currency in currencies"
                :key="currency.getCurrencyCode()"
                :value="currency.getCurrencyCode()"
            >
                {{ currency.getName() }}
            </v-chip>
        </v-chip-group>
    </div>
    <div v-if="selectedCurrency" class="currency">
        <p v-if="selectedCurrency === currencyCode">{{ t('defaultCurrency') }}</p>

        <div v-if="selectedCurrency !== currencyCode" class="form">
            <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
            <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError" type="error"/>
            <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
                <v-text-field v-model="currencyRate" :label="t('currencyRate')" :rules="currencyRateRules"
                              name="currencyRate"
                              type="number"/>
                <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
            </v-form>
        </div>

        <v-data-table
            v-if="selectedCurrency !== currencyCode"
            :headers="headers"
            :items="currencyRates"
            item-key="currencyRateId"
            items-per-page="10"
        >
            <template v-slot:item.startDate="{ item }">
                {{ d(item.getStartDate(), 'long') }}
            </template>
            <template v-slot:item.endDate="{ item }">
                <span v-if="item.getEndDate()">{{ d(item.getEndDate(), 'long') }}</span>
            </template>
        </v-data-table>
    </div>

    <v-snackbar v-model="showSnackbar">
        {{ t('addCurrencyRate.success') }}
        <template v-slot:actions>
            <v-btn
                color="green"
                variant="text"
                @click="showSnackbar = false"
            >
                {{ t('close') }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import CurrencyVM from "../../viewmodels/CurrencyVM.ts";
import {computed, ref, watch} from "vue";
import CurrencyRequester from "../../requesters/CurrencyRequester.ts";
import useCustomer from "../../compositionfunctions/customer.ts";
import * as validator from "validator";
import useRules from "../../compositionfunctions/rules.ts";
import axiosServer from "../../axios/axiosServer.ts";
import CurrencyRateVM from "../../viewmodels/CurrencyRateVM.ts";

const {t, d} = useI18n({useScope: 'global'});

const {currencyCode, firstColor} = useCustomer();
const {notEmpty} = useRules();

const headers = computed(() => [
    {title: t('rate'), value: 'rate'},
    {title: t('startDate'), value: 'startDate'},
    {title: t('endDate'), value: 'endDate'}
]);

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));
const showSnackbar = ref(false);

const currencyRate = ref('');
const currencyRateRules = [notEmpty(t('currencyRate'))];

const selectedCurrency = ref(null);

const currencies = ref(new Array<CurrencyVM>());
CurrencyRequester.requestCurrencies().then(response => {
    currencies.value = response;
});

const currencyRates = ref(new Array<CurrencyRateVM>);

watch(selectedCurrency, async () => {
    if (!selectedCurrency.value || selectedCurrency.value === currencyCode) {
        return;
    }
    currencyRates.value = await CurrencyRequester.requestCurrencyRates(selectedCurrency.value);
});

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.post(`/currencyRate/${selectedCurrency.value}`, {
            rate: currencyRate.value
        });
        backendError.value = '';
        showSnackbar.value = true;
        currencyRates.value = await CurrencyRequester.requestCurrencyRates(selectedCurrency.value);
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
}

</script>

<style scoped>

.selected {
    background-color: v-bind(firstColor);
}

</style>