<template>
    <h2>{{ t('paymentMethod') }}</h2>
    <v-autocomplete v-model="paymentMethod" :items="paymentMethods" @update:modelValue="handlePaymentMethodChange"/>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";
import TitleValueParser from "../../parsers/TitleValueParser.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import {ref} from "vue";

const {t} = useI18n({useScope: "global"});

const props = defineProps({
    paymentMethod: {
        type: String,
        required: false
    }
});

const paymentMethod = ref(props.paymentMethod);
const paymentMethods = ref(new Array<TitleValueVM<string, string>>());

const loadPaymentMethod = async () => {
    const response = await axiosServer.get('/paymentMethod');
    paymentMethods.value = TitleValueParser.parseTitleValues(response.data, true);
};
loadPaymentMethod();

const handlePaymentMethodChange = async () => {
    await axiosServer.put('/basket/paymentMethod', {
        paymentMethod: paymentMethod.value
    });
}

</script>

<style scoped>

</style>