<template>
    <h2>{{ t('login') }}</h2>

    <template v-if="!successLogin">
        <v-alert class="alertError" v-model="showAlert" type="error" :text="t('error.form')"/>
        <v-alert class="alertError" v-model="showBackendError" type="error" :text="t(backendError)"/>
        <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
            <v-text-field name="email" type="email" v-model="email" :rules="emailRules" :label="t('email')"/>
            <v-text-field name="password" type="password" v-model="password" :rules="passwordRules"
                          :label="t('password')"/>
            <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
        </v-form>
    </template>

    <template v-if="successLogin">
        <v-alert v-model="successLogin" type="success" :text="t('login.success')"/>
    </template>


</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import * as validator from "validator";
import useRules from "../../compositionfunctions/rules.ts";
import axiosServer from "../../axios/axiosServer.ts";
import {useUserStore} from "../../pinia/user/UserStore.ts";


const {t} = useI18n({useScope: "global"});
const {notEmpty, isEmail} = useRules();
const userStore = useUserStore();

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successLogin = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const email = ref('');
const emailRules = [isEmail(t('email'))];
const password = ref('');
const passwordRules = [notEmpty(t('password'))];

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.post('/login', {
            email: email.value,
            password: password.value,
        });
        await userStore.retrieveLoginUserInfo();
        backendError.value = '';
        successLogin.value = true;
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
}

</script>

<style scoped>

</style>