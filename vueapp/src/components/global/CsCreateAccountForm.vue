<template>
    <h2>{{ t('createAccount') }}</h2>

    <template v-if="!successCreate">
        <v-alert class="alertError" v-model="showAlert" type="error" :text="t('error.form')"/>
        <v-alert class="alertError" v-model="showBackendError" type="error"
                 :text="t(backendError, {email: email})"/>
        <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
            <v-text-field name="name" v-model="name" :rules="nameRules" :label="t('name')"/>
            <v-text-field name="firstName" v-model="firstName" :rules="firstNameRules" :label="t('firstName')"/>
            <v-text-field name="email" type="email" v-model="email" :rules="emailRules" :label="t('email')"/>
            <v-text-field name="password" type="password" v-model="password" :rules="passwordRules"
                          :label="t('password')"/>
            <v-text-field name="repeatPassword" type="password" v-model="repeatPassword"
                          :rules="repeatPasswordRules" :label="t('repeatPassword')"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
        </v-form>
    </template>

    <template v-if="successCreate">
        <v-alert v-model="successCreate" type="success" :text="t('createAccount.success')"/>
    </template>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ref, watch} from "vue";
import useRules from "../../compositionfunctions/rules.ts";
import axiosServer from "../../axios/axiosServer.ts";
import * as validator from "validator";
import useGoogleRecaptcha from "../../compositionfunctions/googleRecaptcha.ts";

const {t} = useI18n({useScope: "global"});
const {notEmpty, isEmail, isStrongPassword, isSamePassword} = useRules();
const {getToken} = useGoogleRecaptcha();

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successCreate = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const name = ref('');
const nameRules = [notEmpty(t('name'))];
const firstName = ref('');
const firstNameRules = [notEmpty(t('firstName'))];
const email = ref('');
const emailRules = [isEmail(t('email'))];
const password = ref('');
const passwordRules = [isStrongPassword(t('password'))];
const repeatPassword = ref('');
const repeatPasswordRules = computed(() => [isSamePassword(password.value)]);

watch(email, () => {
    backendError.value = '';
});

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    const token = await getToken('CREATE ACCOUNT');

    try {
        await axiosServer.post('/user', {
            name: name.value,
            firstName: firstName.value,
            email: email.value,
            password: password.value,
            repeatPassword: repeatPassword.value
        });
        backendError.value = '';
        successCreate.value = true;
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