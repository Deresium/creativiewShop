<template>
    <div class="addresses">
        <div class="delivery">
            <p>{{ t('deliveryAddress') }}</p>
            <v-autocomplete v-if="addresses.length > 0" v-model="deliveryAddressId"
                            :items="addresses" @update:modelValue="handleDeliveryAddressChange"/>
        </div>

        <div class="billing">
            <p>{{ t('billingAddress') }}</p>
            <v-autocomplete v-if="addresses.length > 0" v-model="billingAddressId" :items="addresses"
                            @update:modelValue="handleBillingAddressChange"/>
        </div>
        <v-btn @click="showAddAddress=true">{{ t('addAddress') }}</v-btn>
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

const {t} = useI18n({useScope: "global"});

const {firstColor} = useCustomer();

const showAddAddress = ref(false);
const showSnackbar = ref(false);
const textSnackbar = ref(null);

const addresses = ref(new Array<TitleValueVM<string, string>>());
const deliveryAddressId = ref(props.deliveryAddressId);
const billingAddressId = ref(props.billingAddressId);


const requestAddresses = async () => {
    addresses.value = await AddressRequester.requestAddressesTitleValue();
};

const handleAddAddress = async () => {
    await requestAddresses();
    showAddAddress.value = false;
};
requestAddresses();

const handleDeliveryAddressChange = async () => {
    await axiosServer.put('/basket/address/delivery', {
        addressId: deliveryAddressId.value
    });
    showSnackbar.value = true;
    textSnackbar.value = t('updateDeliveryAddress.success');
};

const handleBillingAddressChange = async () => {
    await axiosServer.put('/basket/address/billing', {
        addressId: billingAddressId.value
    });
    showSnackbar.value = true;
    textSnackbar.value = t('updateBillingAddress.success');
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
</style>