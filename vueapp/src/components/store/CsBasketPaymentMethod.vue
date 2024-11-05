<template>
    <h2>{{ t('paymentMethod') }}</h2>
    <v-autocomplete v-model="paymentMethodLocal" :items="paymentMethods"
                    @update:modelValue="handlePaymentMethodChange"/>

    <v-alert v-if="isBankTransfer && customerBank" type="info">
        <h3>{{ t('bankInfo') }}</h3>
        <div class="address">
            <p>{{ customerBank.getName() }}</p>
            <p>{{ customerBank.getStreet() }} {{ customerBank.getStreetNumber() }}</p>
            <p>{{ customerBank.getZipCode() }} {{ customerBank.getCity() }}</p>
            <p>{{ customerBank.getCountryName() }}</p>
        </div>

        <div class="bankInfo hue">
            <h4>{{ t('bankInfo.HUE') }}</h4>
            <p>{{ customerBank.getAccountLabel() }}</p>
        </div>

        <div class="bankInfo ue">
            <h4>{{ t('bankInfo.UE') }}</h4>
            <p>{{ t('iban') }}: {{ customerBank.getIban() }}</p>
            <p>{{ t('bic') }}: {{ customerBank.getBic() }} </p>
        </div>
    </v-alert>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, Ref, ref} from "vue";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import CustomerBankVM from "../../viewmodels/CustomerBankVM.ts";
import axiosServer from "../../axios/axiosServer.ts";
import TitleValueParser from "../../parsers/TitleValueParser.ts";
import CustomerBankRequester from "../../requesters/CustomerBankRequester.ts";

const {t} = useI18n({useScope: "global"});

const props = defineProps({
    paymentMethod: {
        type: String,
        required: false
    },
    total: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['paymentMethodChanged', 'paypalURLChanged']);


const paymentMethodLocal = ref(props.paymentMethod);
const paymentMethods = ref(new Array<TitleValueVM<string, string>>());
const customerBank: Ref<CustomerBankVM> = ref();

const loadPaymentMethod = async () => {
    const response = await axiosServer.get('/paymentMethod');
    paymentMethods.value = TitleValueParser.parseTitleValues(response.data, true);
};

const loadCustomerBank = async () => {
    customerBank.value = await CustomerBankRequester.requestCustomerBank();
};

const loadPaypalUrl = async () => {
    const response = await axiosServer.get('/paypalMe/url', {
        params: {
            total: props.total,
            currencyCode: props.currencyCode
        }
    });
    emit('paypalURLChanged', response.data);
};

loadPaymentMethod();
loadCustomerBank();
loadPaypalUrl();

const handlePaymentMethodChange = async () => {
    await axiosServer.put('/basket/paymentMethod', {
        paymentMethod: paymentMethodLocal.value
    });
    emit('paymentMethodChanged', paymentMethodLocal.value);
};

const isBankTransfer = computed(() => {
    return paymentMethodLocal && paymentMethodLocal.value === 'BANK_TRANSFER';
});

</script>

<style scoped>
.bankInfo {
    margin-top: 10px;
}

.qrCode img {
    width: 200px;
}
</style>