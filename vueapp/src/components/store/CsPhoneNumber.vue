<template>
    <v-text-field v-model="phone" :label="t('phone')" name="phone" type="tel"/>
    <v-alert v-if="errorPhone" type="error">
        <p>{{ t(errorPhone) }}</p>
    </v-alert>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {nextTick, ref, watch} from "vue";
import {AsYouType, parsePhoneNumberWithError} from "libphonenumber-js";
import Debouncer from "../../compositionfunctions/Debouncer.ts";
import axiosServer from "../../axios/axiosServer.ts";

const {t} = useI18n({useScope: "global"});
const phone = ref();
const errorPhone = ref();
const initData = ref(false);


axiosServer.get('/user/phoneNumber').then(async (response) => {
    phone.value = response.data;
    await nextTick();
    initData.value = true;
});

const sendPhoneNumber = async () => {
    try {
        phone.value = new AsYouType().input(phone.value);
        parsePhoneNumberWithError(phone.value);
        await axiosServer.put('/user/phoneNumber', {
            phoneNumber: phone.value
        });
    } catch (error: any) {
        switch (error.message) {
            case 'INVALID_COUNTRY':
                errorPhone.value = 'phone.noCountry';
                break;
            case 'TOO_SHORT':
                errorPhone.value = 'phone.short';
                break;
            case 'TOO_LONG':
                errorPhone.value = 'phone.long';
                break;
            default:
                errorPhone.value = 'phone.invalid';
                break;
        }
    }
};

const debounceSendPhoneNumber = new Debouncer(1000, sendPhoneNumber);

watch(phone, () => {
    if (!initData.value) {
        return;
    }
    errorPhone.value = null;
    debounceSendPhoneNumber.debounce();
});

</script>

<style scoped>

</style>