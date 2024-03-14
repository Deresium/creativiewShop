<template>
    <div class="form">
        <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
            <v-autocomplete v-model="countryId" :items="countries" :label="t('country')" :rules="countryIdRules"
                            name="country"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('addCountry') }}</v-btn>
        </v-form>
    </div>

    <v-data-table
        :headers="headers"
        :items="deliveryOptionCountries"
        item-key="countryId"
        items-per-page="10"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn color="red" icon="mdi-delete-empty" size="25px"
                   @click="deleteItemConfirm(item.getCountryId())"/>
        </template>
    </v-data-table>

    <v-dialog v-model="confirmDelete">
        <v-card :text="t('confirmDeleteCountry.text')" :title="t('confirmDelete.title')">
            <template #actions>
                <v-btn :loading="isSending" @click="handleConfirm">
                    {{ t('confirm') }}
                </v-btn>
                <v-btn @click="handleRefuse">
                    {{ t('refuse') }}
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="showSnackbar">
        {{ t('deleteDeliveryOptionCountry.success') }}
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
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import CountryVM from "../../../viewmodels/CountryVM.ts";
import CountryRequester from "../../../requesters/CountryRequester.ts";
import axiosServer from "../../../axios/axiosServer.ts";
import TitleValueVM from "../../../viewmodels/TitleValueVM.ts";
import useRules from "../../../compositionfunctions/rules.ts";

const {t} = useI18n({useScope: "global"});
const {notEmpty} = useRules();

const {params: {deliveryOptionId}} = useRoute();
const deliveryOptionIdString = String(deliveryOptionId);

const headers = computed(() => [
    {title: t('country'), value: 'nameFr'},
    {title: t('action'), value: 'actions'}
]);

const formValid = ref();
const isSending = ref(false);
const confirmDelete = ref(false);
const tempCountryId = ref();
const showSnackbar = ref(false);

const countryId = ref(null);

const countryIdRules = [
    notEmpty(t('country')),
    (value: any) => {
        const existCountry = deliveryOptionCountries.value.filter(country => country.getCountryId() === value).length !== 0;
        if (existCountry) {
            return t('error.existsCountry');
        }
        return true;
    }
];


const countries = ref(new Array<TitleValueVM<string, number>>());
CountryRequester.requestCountries().then(response => {
    countries.value = response;
});

const deliveryOptionCountries = ref(new Array<CountryVM>());
CountryRequester.requestCountriesDeliveryOption(deliveryOptionIdString).then(response => {
    deliveryOptionCountries.value = response;
});

const refreshListCountries = async () => {
    CountryRequester.requestCountriesDeliveryOption(deliveryOptionIdString).then(response => {
        deliveryOptionCountries.value = response;
    });
};

const submitForm = async () => {
    isSending.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    await axiosServer.post(`/deliveryOption/${deliveryOptionIdString}/country/${countryId.value}`);
    countryId.value = null;
    formValid.value = false;
    await refreshListCountries();
    isSending.value = false;
};

const deleteItemConfirm = (countryIdToDelete: number) => {
    confirmDelete.value = true;
    tempCountryId.value = countryIdToDelete;
};

const handleConfirm = async () => {
    isSending.value = true;
    if (!tempCountryId.value) {
        return;
    }
    await axiosServer.delete(`/deliveryOption/${deliveryOptionIdString}/country/${tempCountryId.value}`);
    await refreshListCountries();
    confirmDelete.value = false;
    tempCountryId.value = null;
    isSending.value = false;
};

const handleRefuse = () => {
    confirmDelete.value = false;
    tempCountryId.value = null;
};

</script>

<style scoped>
.form {
    margin-bottom: 30px;
    width: 80%;
}
</style>