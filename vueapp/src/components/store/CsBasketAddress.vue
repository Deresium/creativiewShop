<template>
    <div class="addresses">
        <div class="delivery">
            <p>{{ t('deliveryAddress') }}</p>
            <v-autocomplete v-if="addresses.length > 0" v-model="deliveryAddressId"
                            :items="addresses" @update:modelValue="handleDeliveryAddressChange"/>
            <v-btn class="btnAdd" @click="handleClickOnAddDeliveryAddress">{{ t('addDeliveryAddress') }}</v-btn>
        </div>

        <div class="billing">
            <p>{{ t('billingAddress') }}</p>
            <v-autocomplete v-if="addresses.length > 0" v-model="billingAddressId" :items="addresses"
                            @update:modelValue="handleBillingAddressChange"/>
            <v-btn class="btnAdd" @click="handleClickOnAddBillingAddress">{{ t('addBillingAddress') }}</v-btn>
        </div>
    </div>

    <v-overlay v-if="showAddAddress" v-model="showAddAddress" :scrim="firstColor" class="overlay"
               opacity="99%">
        <div class="overlayContent">
            <CsAddressForm @add-address-success="handleAddAddress"/>
        </div>
    </v-overlay>

    <v-snackbar v-model="showSnackbar">
        {{ textSnackbar }}
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
</template>

<script lang="ts" setup>
import {ref} from "vue";
import AddressRequester from "../../requesters/AddressRequester.ts";
import {useI18n} from "vue-i18n";
import useCustomer from "../../compositionfunctions/customer.ts";
import CsAddressForm from "./CsAddressForm.vue";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import axiosServer from "../../axios/axiosServer.ts";

const props = defineProps({
    deliveryAddressId: {
        type: String,
        required: false
    },
    billingAddressId: {
        type: String,
        required: false
    }
});

const emit = defineEmits(['deliveryCountryChanged', 'billingAddressChanged']);

const {t} = useI18n({useScope: "global"});

const {firstColor} = useCustomer();

const showAddAddress = ref(false);
const showSnackbar = ref(false);
const textSnackbar = ref(null);
const addDeliveryAddress = ref(true);

const addresses = ref(new Array<TitleValueVM<string, string>>());
const deliveryAddressId = ref(props.deliveryAddressId);
const billingAddressId = ref(props.billingAddressId);


const requestAddresses = async () => {
    addresses.value = await AddressRequester.requestAddressesTitleValue();
};

const handleClickOnAddBillingAddress = () => {
    showAddAddress.value = true;
    addDeliveryAddress.value = false;
};

const handleClickOnAddDeliveryAddress = () => {
    showAddAddress.value = true;
    addDeliveryAddress.value = true;
};

const handleAddAddress = async (addressId: string) => {
    await requestAddresses();
    showAddAddress.value = false;
    if (addDeliveryAddress.value) {
        deliveryAddressId.value = addressId;
        await handleDeliveryAddressChange();
    } else {
        billingAddressId.value = addressId;
        await handleBillingAddressChange();
    }
};

requestAddresses();

const handleDeliveryAddressChange = async () => {
    await axiosServer.put('/basket/address/delivery', {
        addressId: deliveryAddressId.value
    });
    showSnackbar.value = true;
    textSnackbar.value = t('updateDeliveryAddress.success');
    emit('deliveryCountryChanged');
};

const handleBillingAddressChange = async () => {
    await axiosServer.put('/basket/address/billing', {
        addressId: billingAddressId.value
    });
    showSnackbar.value = true;
    textSnackbar.value = t('updateBillingAddress.success');
    emit('billingAddressChanged');
};

</script>

<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    margin-top: 10vh;
}

.overlayContent {
    width: 90vw;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
}

.btnAdd {
    margin-bottom: 50px;
}
</style>