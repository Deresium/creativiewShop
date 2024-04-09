<template>
    <div class="formAddress">
        <h2>{{ t('addAddress') }}</h2>
        <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
        <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError"
                 type="error"/>
        <v-form v-model="formValid" class="form" validate-on="blur" @submit.prevent="submitForm">
            <v-autocomplete v-model="countryId" :items="countries" :label="t('country')" :rules="countryIdRules"
                            name="country"/>
            <v-text-field v-model="city" :label="t('city')" :rules="cityRules" name="city"/>
            <v-text-field v-model="zipCode" :label="t('zipCode')" :rules="zipCodeRules" name="zipCode"/>
            <v-text-field v-model="street" :label="t('street')" :rules="streetRules" name="street"/>
            <v-text-field v-model="streetNumber" :label="t('streetNumber')" :rules="streetNumberRules" name="number"/>
            <v-text-field v-model="box" :label="t('box')" name="box"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import AddressRequester from "../../requesters/AddressRequester.ts";
import {useI18n} from "vue-i18n";
import useRules from "../../compositionfunctions/rules.ts";
import * as validator from "validator";
import CountryRequester from "../../requesters/CountryRequester.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import axiosServer from "../../axios/axiosServer.ts";

const props = defineProps({
    addressId: {
        type: String,
        required: false
    }
});

const emit = defineEmits(['addAddressSuccess']);

const {t} = useI18n({useScope: "global"});

const {notEmpty} = useRules();

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const countryId = ref(null);
const countryIdRules = [notEmpty(t('country'))];
const city = ref(null);
const cityRules = [notEmpty(t('city'))];
const street = ref(null);
const streetRules = [notEmpty(t('street'))];
const streetNumber = ref(null);
const streetNumberRules = [notEmpty(t('streetNumber'))];
const zipCode = ref(null);
const zipCodeRules = [notEmpty(t('zipCode'))];
const box = ref(null);

const isUpdate = computed(() => props.addressId);

const countries = ref(new Array<TitleValueVM<string, number>>());

const requestAddress = async () => {
    const address = await AddressRequester.requestAddress(props.addressId);
    countryId.value = address.getCountryId();
};

const requestCountries = async () => {
    countries.value = await CountryRequester.requestCountries();
};

if (isUpdate.value) {
    requestAddress();
}

requestCountries();

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        const response = await axiosServer.post(`/address`, {
            countryId: countryId.value,
            city: city.value,
            street: street.value,
            streetNumber: streetNumber.value,
            zipCode: zipCode.value,
            box: box.value
        });
        emit('addAddressSuccess', String(response.data));
        backendError.value = '';
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
}

</script>

<style scoped>
.alertError {
    margin-bottom: 10px;
}

</style>