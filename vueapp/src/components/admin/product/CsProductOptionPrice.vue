<template>
    <div class="form">
        <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
        <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError" type="error"/>
        <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
            <v-text-field v-model="price" :label="t('price')" :rules="priceRules" name="price" type="number"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
        </v-form>
    </div>
    <v-data-table
        :headers="headers"
        :items="prices"
        item-key="startDate"
        items-per-page="10"
    >
        <template v-slot:item.startDate="{ item }">
            {{ d(item.getStartDate(), 'long') }}
        </template>
        <template v-slot:item.endDate="{ item }">
            <span v-if="item.getEndDate()">{{ d(item.getEndDate(), 'long') }}</span>
        </template>
    </v-data-table>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import * as validator from "validator";
import useRules from "../../../compositionfunctions/rules.ts";
import axiosServer from "../../../axios/axiosServer.ts";
import ProductOptionPriceVM from "../../../viewmodels/ProductOptionPriceVM.ts";
import ProductOptionPriceRequester from "../../../requesters/ProductOptionPriceRequester.ts";

const {t, d} = useI18n({useScope: "global"});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['addPriceSuccess']);

const {notEmpty} = useRules();

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const price = ref('');
const priceRules = [notEmpty(t('price'))];


const headers = computed(() => [
    {title: t('price'), value: 'price'},
    {title: t('startDate'), value: 'startDate'},
    {title: t('endDate'), value: 'endDate'}
]);

const prices = ref(new Array<ProductOptionPriceVM>());
ProductOptionPriceRequester.requestPrices(productIdString, props.productOptionId).then(response => {
    prices.value = response;
});
const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.post(`/product/${productIdString}/productOption/${props.productOptionId}/price`, {
            price: price.value
        });
        emit('addPriceSuccess');
        backendError.value = '';
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
}


</script>

<style scoped>
.form {
    width: 40%;
    margin-top: 30px;
}
</style>