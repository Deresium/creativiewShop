<template>
    <div class="form">
        <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
        <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError"
                 type="error"/>
        <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
            <v-text-field v-model="code" :label="t('code')" name="code"/>
            <v-text-field v-model="nameFr" :label="t('nameFr')" name="nameFr"/>
            <v-text-field v-model="nameEn" :label="t('nameEn')" name="nameEn"/>
            <CsTextArea v-model="descriptionFr" :label="t('descriptionFr')" name="descriptionFr"/>
            <CsTextArea v-model="descriptionEn" :label="t('descriptionEn')" name="descriptionEn"/>
            <v-autocomplete v-model="manufacturerId" :items="manufacturerList" :label="t('manufacturer')"
                            name="manufacturer"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('update') }}</v-btn>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import * as validator from "validator";
import axiosServer from "../../../axios/axiosServer.ts";
import TitleValueVM from "../../../viewmodels/TitleValueVM.ts";
import ManufacturerRequester from "../../../requesters/ManufacturerRequester.ts";
import {useRoute} from "vue-router";
import ProductRequester from "../../../requesters/ProductRequester.ts";
import CsTextArea from "../../global/CsTextArea.vue";

const {t} = useI18n({useScope: "global"});

const emit = defineEmits(['updateSuccess']);

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successUpdate = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const manufacturerId = ref(null);
const code = ref(null);
const nameFr = ref(null);
const nameEn = ref(null);
const descriptionFr = ref(null);
const descriptionEn = ref(null);

const manufacturerList = ref(new Array<TitleValueVM<string, string>>());
ManufacturerRequester.getManufacturers().then(response => {
    for (const manufacturer of response) {
        manufacturerList.value.push(new TitleValueVM(manufacturer.getName(), manufacturer.getManufacturerId()));
    }
});

ProductRequester.requestProduct(productIdString).then(response => {
    manufacturerId.value = response.getManufacturerId();
    code.value = response.getCode();
    nameFr.value = response.getNameFr();
    nameEn.value = response.getNameEn();
    descriptionFr.value = response.getDescriptionFr();
    descriptionFr.value = descriptionFr.value.replaceAll('\r\n', '<p>&nbsp;</p>');
    descriptionFr.value = descriptionFr.value.replaceAll('\n', '<p>&nbsp;</p>');
    descriptionEn.value = response.getDescriptionEn();
    descriptionEn.value = descriptionEn.value.replaceAll('\r\n', '<p>&nbsp;</p>');
    descriptionEn.value = descriptionEn.value.replaceAll('\n', '<p>&nbsp;</p>');
});

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.put(`/product/${productIdString}`, {
            manufacturerId: manufacturerId.value,
            code: code.value,
            nameFr: nameFr.value,
            nameEn: nameEn.value,
            descriptionFr: descriptionFr.value,
            descriptionEn: descriptionEn.value
        });
        backendError.value = '';
        successUpdate.value = true;
        emit('updateSuccess');
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
};

</script>

<style scoped>
</style>