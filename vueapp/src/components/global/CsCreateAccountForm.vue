<template>
    <div class="createAccount">
        <h2>{{ t('createAccount') }}</h2>

        <template v-if="!successCreate">
            <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
            <v-alert v-model="showBackendError" :text="t(backendError, {email: email})" class="alertError"
                     type="error"/>
            <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
                <v-text-field v-model="name" :label="t('name')" :rules="nameRules" name="name"/>
                <v-text-field v-model="firstName" :label="t('firstName')" :rules="firstNameRules" name="firstName"/>
                <v-text-field v-model="email" :label="t('email')" :rules="emailRules" name="email" type="email"/>
                <v-select v-model="language" :items="languages" :label="t('language')" :rules="languageRules"
                          name="language"/>
                <v-text-field v-model="password" :label="t('password')" :rules="passwordRules" name="password"
                              type="password"/>
                <v-text-field v-model="repeatPassword" :label="t('repeatPassword')" :rules="repeatPasswordRules"
                              name="repeatPassword" type="password"/>
                <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
            </v-form>
        </template>

        <template v-if="successCreate">
            <v-alert v-model="successCreate" :text="t('createAccount.success')" type="success"/>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref, watch} from "vue";
import useRules from "../../compositionfunctions/rules.ts";
import axiosServer from "../../axios/axiosServer.ts";
import * as validator from "validator";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";

const {t, availableLocales} = useI18n({useScope: "global"});
const {notEmpty, isEmail, isStrongPassword, isSamePassword} = useRules();

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
const language = ref('');
const languageRules = [notEmpty(t('language'))];

watch(email, () => {
    backendError.value = '';
});

const languages = ref(new Array<TitleValueVM<string, string>>());
for (const locale of availableLocales) {
    languages.value.push(new TitleValueVM(t(`locale.${locale}`), locale));
}

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    //const token = await getToken('CREATE ACCOUNT');

    try {
        await axiosServer.post('/user', {
            name: name.value,
            firstName: firstName.value,
            email: email.value,
            password: password.value,
            repeatPassword: repeatPassword.value,
            language: language.value
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

.createAccount {
    max-height: 80vh;
    padding-bottom: 10px;
    overflow-y: scroll;
}
</style>