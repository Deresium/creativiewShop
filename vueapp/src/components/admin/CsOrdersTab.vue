<template>
    <h2>{{ t('orders') }}</h2>
    <v-data-table
        :headers="headers"
        :items="orders"
        item-key="basketId"
        items-per-page="10"
    >
        <template #item.email="{item}">
            <a :href="getHref(item.getEmail())">{{ item.getEmail() }}</a>
        </template>
        <template #item.orderedAt="{item}">
            <span v-if="item.getOrderedAt()">{{ d(item.getOrderedAt(), 'long') }}</span>
        </template>
        <template #item.paidAt="{item}">
            <span v-if="item.getPaidAt()">{{ d(item.getPaidAt(), 'long') }}</span>
        </template>
        <template #item.deliveredAt="{item}">
            <span v-if="item.getDeliveredAt()">{{ d(item.getDeliveredAt(), 'long') }}</span>
        </template>
        <template #item.basketStateCode="{item}">
            {{ t(`basketState.${item.getBasketStateCode()}`) }}
        </template>
        <template #item.action="{item}">
            <v-btn density="compact" @click="clickOnDetail(item.getBasketId())">{{ t('detail') }}</v-btn>
            <v-btn :href="getPdfSrc(item.getBasketId())" density="compact" download>{{ t('pdf') }}</v-btn>
            <v-btn v-if="showOrderToPayButton(item.getBasketStateCode())" density="compact"
                   @click="askConfirmOrderToPay(item.getBasketId())">
                {{ t('orderToPay.ask') }}
            </v-btn>
            <v-btn v-if="showPayToDeliveredButton(item.getBasketStateCode())" density="compact"
                   @click="askConfirmPayToDelivered(item.getBasketId())">
                {{ t('payToDelivered.ask') }}
            </v-btn>
        </template>
    </v-data-table>

    <v-overlay v-if="showOverlayOrderDetails" v-model="showOverlayOrderDetails" class="overlay">
        <CsBasketDetail :basket-id="selectedBasketId"/>
    </v-overlay>

    <v-dialog v-model="showConfirmOrderToPay">
        <v-card :text="t('orderToPay.text')" :title="t('orderToPay.title')">
            <template #actions>
                <v-btn :disabled="loading" :loading="loading" @click="handleConfirmOrderToPay">
                    {{ t('confirm') }}
                </v-btn>
                <v-btn @click="handleRefuse">
                    {{ t('refuse') }}
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="showConfirmPayToDelivered">
        <v-card :text="t('payToDelivered.text')" :title="t('payToDelivered.title')">
            <template #actions>
                <v-btn :disabled="loading" :loading="loading" @click="handleConfirmPayToDelivered">
                    {{ t('confirm') }}
                </v-btn>
                <v-btn @click="handleRefuse">
                    {{ t('refuse') }}
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import CsBasketDetail from "../store/CsBasketDetail.vue";
import {computed, ref} from "vue";
import BasketOrderLightVM from "../../viewmodels/BasketOrderLightVM.ts";
import BasketOrderRequester from "../../requesters/BasketOrderRequester.ts";
import axiosServer from "../../axios/axiosServer.ts";

const headers = computed(() => [
    {title: t('orderNumber'), value: 'orderNumber'},
    {title: t('name'), value: 'name'},
    {title: t('firstName'), value: 'firstName'},
    {title: t('email'), value: 'email'},
    {title: t('orderedAt'), value: 'orderedAt'},
    {title: t('paidAt'), value: 'paidAt'},
    {title: t('deliveredAt'), value: 'deliveredAt'},
    {title: t('status'), value: 'basketStateCode'},
    {title: t('action'), value: 'action'}
]);

const {t, d, locale} = useI18n({useScope: 'global'});

const orders = ref(new Array<BasketOrderLightVM>());
const showOverlayOrderDetails = ref(false);
const selectedBasketId = ref(null);

const showConfirmOrderToPay = ref(false);
const basketIdOrderToPay = ref(null);
const showConfirmPayToDelivered = ref(false);
const basketIdPayToDelivered = ref(null);

const loading = ref(false);

const requestUserOrders = async () => {
    orders.value = await BasketOrderRequester.requestBasketOrderLightForCustomer();
};

requestUserOrders();

const clickOnDetail = (basketId: string) => {
    selectedBasketId.value = basketId;
    showOverlayOrderDetails.value = true;
};

const askConfirmOrderToPay = (basketId: string) => {
    basketIdOrderToPay.value = basketId;
    showConfirmOrderToPay.value = true;
};

const askConfirmPayToDelivered = (basketId: string) => {
    basketIdPayToDelivered.value = basketId;
    showConfirmPayToDelivered.value = true;
};

const handleConfirmOrderToPay = async () => {
    if (!basketIdOrderToPay.value) {
        return;
    }
    loading.value = true;
    await axiosServer.post(`/order/${basketIdOrderToPay.value}/paid`);
    basketIdOrderToPay.value = null;
    await requestUserOrders();
    showConfirmOrderToPay.value = false;
    loading.value = false;
};

const handleConfirmPayToDelivered = async () => {
    if (!basketIdPayToDelivered.value) {
        return;
    }
    loading.value = true;
    await axiosServer.post(`/order/${basketIdPayToDelivered.value}/delivered`);
    basketIdPayToDelivered.value = null;
    await requestUserOrders();
    showConfirmPayToDelivered.value = false;
    loading.value = false;
};

const handleRefuse = () => {
    basketIdOrderToPay.value = null;
    basketIdOrderToPay.value = null;
    showConfirmOrderToPay.value = false;
    showConfirmPayToDelivered.value = false;
};

const getHref = (email: string): string => {
    return `mailto:${email}`;
};

const getPdfSrc = (basketId: string) => {
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/order/${basketId}/pdf?language=${locale.value}`;
};

const showOrderToPayButton = (state: string) => {
    return state === 'ORDERED'
};

const showPayToDeliveredButton = (state: string) => {
    return state === 'PAID'
};

</script>

<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>