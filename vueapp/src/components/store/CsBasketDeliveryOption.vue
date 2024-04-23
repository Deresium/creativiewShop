<template>
    <h2>{{ t('deliveryOption') }}</h2>
    <v-autocomplete v-model="deliveryOptionId" :items="deliveryOptions"
                    @update:modelValue="handleDeliveryOptionChange"/>
    <v-alert v-if="deliveryOptions.length === 0" class="infoAlert" type="info">
        {{ t('noDeliveryOption.info') }}
    </v-alert>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref, watch} from "vue";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import DeliveryOptionRequester from "../../requesters/DeliveryOptionRequester.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import axiosServer from "../../axios/axiosServer.ts";

const {t} = useI18n({useScope: "global"});

const props = defineProps({
    deliveryCountryId: {
        type: Number,
        required: true
    },
    deliveryOptionId: {
        type: String,
        required: false
    }
});

const emit = defineEmits(['deliveryOptionChanged']);

const storeStore = useStoreStore();
const currencySymbol = computed(() => storeStore.getCurrencySymbol);
const currencyCode = computed(() => storeStore.getCurrencyCode);

const deliveryOptionId = ref(props.deliveryOptionId);
const deliveryOptions = ref(new Array<TitleValueVM<string, string>>());


const loadDeliveryOptions = async () => {
    deliveryOptions.value = await DeliveryOptionRequester.requestDeliveryOptionStores(currencyCode.value, currencySymbol.value);
};

const handleDeliveryOptionChange = async () => {
    await axiosServer.put('/basket/deliveryOption', {
        deliveryOptionId: deliveryOptionId.value
    });

    emit('deliveryOptionChanged');
};

watch([currencyCode, () => props.deliveryCountryId], async () => {
    await loadDeliveryOptions();
}, {immediate: true});


</script>

<style scoped>
.infoAlert {
    margin-bottom: 20px;
}
</style>