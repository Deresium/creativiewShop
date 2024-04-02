<template>
    <div class="fullPage">
        <h2>{{ t('passwordRequest') }}</h2>
        <template v-if="!successAddPasswordRequest">
            <div class="form">
                <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
                <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError" type="error"/>
                <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
                    <v-text-field v-model="email" :label="t('email')" :rules="emailRules" name="email" type="email"/>
                    <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
                </v-form>
            </div>
        </template>
        <template v-if="successAddPasswordRequest">
            <v-alert :text="t('addPasswordRequest.success', {email: email})" type="success"/>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import useRules from "../../compositionfunctions/rules.ts";
import {computed, ref} from "vue";
import * as validator from "validator";
import axiosServer from "../../axios/axiosServer.ts";
import useGoogleRecaptcha from "../../compositionfunctions/googleRecaptcha.ts";

const {t} = useI18n({useScope: "global"});
const {isEmail} = useRules();
const {getToken} = useGoogleRecaptcha();

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successAddPasswordRequest = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const email = ref(null);
const emailRules = [isEmail(t('email'))];

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    const token = await getToken('FORGOT_PASSWORD');
    try {
        await axiosServer.post(`/forgotPassword`, {
            email: email.value
        }, {
            params: {
                tokenAction: 'FORGOT_PASSWORD',
                token: token
            }
        });
        backendError.value = '';
        successAddPasswordRequest.value = true;
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
}

</script>

<style scoped>
.fullPage {
    padding: 10px;
}

.alertError {
    margin-bottom: 10px;
}

</style>