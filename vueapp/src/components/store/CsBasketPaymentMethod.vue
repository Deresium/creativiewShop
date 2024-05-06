<template>
    <h2>{{ t('paymentMethod') }}</h2>
    <v-autocomplete v-model="paymentMethod" :items="paymentMethods" @update:modelValue="handlePaymentMethodChange"/>

    <v-alert v-if="isBankTransfer" type="info">
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

    <v-alert v-if="isPaypalMe" type="info">
        <h3>{{ t('paypalMeInfo') }}</h3>
        <p>{{ t('paypalMe.content') }}</p>
        <p>{{ t('payalMeInfoAdd') }}</p>
        <div class="qrCode">
            <a :href="paypalURL" class="linkPaypal" target="_blank">{{ paypalURL }}</a>
            <img v-if="paypalQrCode" :src="paypalQrCode" alt="paypal qr code"/>
        </div>
    </v-alert>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";
import TitleValueParser from "../../parsers/TitleValueParser.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import {computed, Ref, ref} from "vue";
import CustomerBankVM from "../../viewmodels/CustomerBankVM.ts";
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

const emit = defineEmits(['paymentMethodChanged']);


const paymentMethod = ref(props.paymentMethod);
const paymentMethods = ref(new Array<TitleValueVM<string, string>>());
const customerBank: Ref<CustomerBankVM> = ref();
const paypalURL = ref();
const paypalQrCode = ref();

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

    paypalURL.value = response.data;
};

const loadQRCode = async () => {
    const response = await axiosServer.get(`/paypalMe/qrcode?total=${props.total}&currencyCode=${props.currencyCode}`);
    paypalQrCode.value = response.data;
};

loadPaymentMethod();
loadCustomerBank();
loadPaypalUrl();
loadQRCode();

const handlePaymentMethodChange = async () => {
    await axiosServer.put('/basket/paymentMethod', {
        paymentMethod: paymentMethod.value
    });
    emit('paymentMethodChanged');
};

const isBankTransfer = computed(() => paymentMethod && paymentMethod.value === 'BANK_TRANSFER');
const isPaypalMe = computed(() => paymentMethod && paymentMethod.value === 'PAYPAL_ME');

</script>

<style scoped>
.bankInfo {
    margin-top: 10px;
}

.linkPaypal {
    color: white;
    text-decoration: none;
}

.qrCode {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.qrCode img {
    width: 200px;
}
</style>