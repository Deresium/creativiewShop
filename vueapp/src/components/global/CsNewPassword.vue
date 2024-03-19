<template>
    <div class="fullPage">
        <h2>{{ t('passwordChanging') }}</h2>
        <template v-if="!successUpdatePassword">
            <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
            <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError"
                     type="error"/>
            <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
                <v-text-field v-model="password" :label="t('password')" :rules="passwordRules" name="password"
                              type="password"/>
                <v-text-field v-model="repeatPassword" :label="t('repeatPassword')" :rules="repeatPasswordRules"
                              name="repeatPassword" type="password"/>
                <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
            </v-form>
        </template>

        <template v-if="successUpdatePassword">
            <v-alert :text="t('updatePassword.success')" type="success"/>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import useRules from "../../compositionfunctions/rules.ts";
import {computed, ref} from "vue";
import * as validator from "validator";
import axiosServer from "../../axios/axiosServer.ts";
import {useRoute} from "vue-router";
import useGoogleRecaptcha from "../../compositionfunctions/googleRecaptcha.ts";

const {t} = useI18n({useScope: "global"});
const {isStrongPassword, isSamePassword} = useRules();
const {getToken} = useGoogleRecaptcha();

const {query: {uuid}} = useRoute();
const uuidString = String(uuid);

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successUpdatePassword = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const password = ref('');
const passwordRules = [isStrongPassword(t('password'))];
const repeatPassword = ref('');
const repeatPasswordRules = computed(() => [isSamePassword(password.value)]);

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    const token = await getToken('NEW_PASSWORD');

    try {
        await axiosServer.post('/changePasswordRequest', {
            password: password.value,
            repeatPassword: repeatPassword.value,
            uuid: uuidString
        }, {
            params: {
                tokenAction: 'NEW_PASSWORD',
                token: token
            }
        });
        backendError.value = '';
        successUpdatePassword.value = true;
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