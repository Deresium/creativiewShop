<template>
    <div class="form">
        <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
        <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError"
                 type="error"/>
        <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
            <v-text-field v-model="code" :label="t('code')" name="code"/>
            <v-text-field v-model="nameFr" :label="t('nameFr')" name="nameFr"/>
            <v-text-field v-model="nameEn" :label="t('nameEn')" name="nameEn"/>
            <v-text-field v-model="stock" :label="t('stock')" name="stock" type="number"/>
            <v-text-field v-model="weight" :label="t('weight')" name="weight" type="number"/>
            <v-switch v-model="active" :color="firstColor" :label="t('active')" name="active"/>
            <v-switch v-model="preorder" :color="firstColor" :label="t('preorder')" name="preorder"/>
            <v-switch v-model="featured" :color="firstColor" :label="t('featured')" name="featured"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('update') }}</v-btn>
        </v-form>
    </div>
</template>

<script lang="ts" setup>

import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import * as validator from "validator";
import ProductOptionRequester from "../../../requesters/ProductOptionRequester.ts";
import axiosServer from "../../../axios/axiosServer.ts";
import useCustomer from "../../../compositionfunctions/customer.ts";

const {t} = useI18n({useScope: 'global'});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['updateInfoSuccess']);

const {firstColor} = useCustomer();

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successUpdate = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const code = ref(null);
const nameFr = ref(null);
const nameEn = ref(null);
const stock = ref(null);
const weight = ref(null);
const active = ref(false);
const preorder = ref(false);
const featured = ref(false);

ProductOptionRequester.requestProductOption(productIdString, props.productOptionId).then(response => {
    code.value = response.getCode();
    nameFr.value = response.getNameFr();
    nameEn.value = response.getNameEn();
    stock.value = response.getStock();
    weight.value = response.getWeight();
    active.value = response.getActive();
    preorder.value = response.getPreorder();
    featured.value = response.getFeatured();
});

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.put(`/product/${productIdString}/productOption/${props.productOptionId}`, {
            code: code.value,
            nameFr: nameFr.value,
            nameEn: nameEn.value,
            stock: stock.value,
            weight: weight.value,
            active: active.value,
            preorder: preorder.value,
            featured: featured.value
        });
        backendError.value = '';
        successUpdate.value = true;
        emit('updateInfoSuccess');
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
};

</script>

<style scoped>
.form {
    margin-top: 30px;
    padding-bottom: 10px;
}
</style>