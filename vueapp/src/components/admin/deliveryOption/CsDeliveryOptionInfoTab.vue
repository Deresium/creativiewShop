<template>
    <div class="form">
        <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
        <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError"
                 type="error"/>
        <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
            <v-text-field v-model="nameFr" :label="t('name')" name="name"/>
            <v-switch v-model="active" :color="firstColor" :label="t('active')" name="active"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('update') }}</v-btn>
        </v-form>

        <v-snackbar v-model="showSnackbar">
            {{ t('updateDeliveryOption.success') }}
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
    </div>
</template>

<script lang="ts" setup>

import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import * as validator from "validator";
import DeliveryOptionRequester from "../../../requesters/DeliveryOptionRequester.ts";
import axiosServer from "../../../axios/axiosServer.ts";
import useCustomer from "../../../compositionfunctions/customer.ts";

const {t} = useI18n({useScope: "global"});

const {params: {deliveryOptionId}} = useRoute();
const deliveryOptionIdString = String(deliveryOptionId);

const {firstColor} = useCustomer();

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successUpdate = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));
const showSnackbar = ref(false);

const nameFr = ref(null);
const active = ref(null);

DeliveryOptionRequester.requestDeliveryOption(deliveryOptionIdString).then(response => {
    nameFr.value = response.getNameFr();
    active.value = response.getActive();
});

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.put(`/deliveryOption/${deliveryOptionIdString}`, {
            nameFr: nameFr.value,
            active: active.value
        });
        backendError.value = '';
        successUpdate.value = true;
        showSnackbar.value = true;
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
};

</script>

<style scoped>
.form {
    width: 80%;
    margin-bottom: 20px;
}

</style>