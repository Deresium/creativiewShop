<template>
    <div class="form">
        <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
            <v-text-field v-model="gram" :label="t('grams')" :rules="gramRules" name="gram" type="number"/>
            <v-text-field v-model="price" :label="t('price')" :rules="priceRules" name="price" type="number"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('addWeightPrice') }}</v-btn>
        </v-form>
    </div>

    <v-data-table
        :headers="headers"
        :items="weightPrices"
        item-key="startDate"
        items-per-page="10"
    >
        <template #item.startDate="{ item }">
            {{ d(item.getStartDate(), 'long') }}
        </template>
    </v-data-table>

    <v-snackbar v-model="showSnackbar">
        {{ t('addWeightPrice.success') }}
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
import useRules from "../../../compositionfunctions/rules.ts";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import WeightPriceVM from "../../../viewmodels/WeightPriceVM.ts";
import WeightPriceRequester from "../../../requesters/WeightPriceRequester.ts";
import axiosServer from "../../../axios/axiosServer.ts";

const {t, d} = useI18n({useScope: "global"});
const {notEmpty} = useRules();

const {params: {deliveryOptionId}} = useRoute();
const deliveryOptionIdString = String(deliveryOptionId);

const headers = computed(() => [
    {title: t('grams'), value: 'gram'},
    {title: t('price'), value: 'price'},
    {title: t('startDate'), value: 'startDate'},
]);

const formValid = ref();
const isSending = ref(false);
const showSnackbar = ref(false);

const gram = ref(null);
const price = ref(null);

const gramRules = [notEmpty(t('grams'))];
const priceRules = [notEmpty(t('price'))];

const weightPrices = ref(new Array<WeightPriceVM>());
WeightPriceRequester.requestWeightPrices(deliveryOptionIdString).then(response => {
    weightPrices.value = response;
});

const refreshWeightPrices = async () => {
    weightPrices.value = await WeightPriceRequester.requestWeightPrices(deliveryOptionIdString);
};

const submitForm = async () => {
    isSending.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    await axiosServer.post(`/deliveryOption/${deliveryOptionIdString}/weightPrice`, {
        gram: gram.value,
        price: price.value
    });
    showSnackbar.value = true;
    formValid.value = false;
    isSending.value = false;
    await refreshWeightPrices();
};

</script>

<style scoped>
.form {
    width: 80%;
    margin-bottom: 30px;
}

</style>