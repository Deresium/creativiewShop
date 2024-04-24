<template>
    <div class="content">
        <h2>{{ t('myOrders') }}</h2>
        <v-data-table
            :headers="headers"
            :items="orders"
            item-key="basketId"
            items-per-page="10"
        >
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
            </template>
        </v-data-table>

        <v-overlay v-if="showOverlayOrderDetails" v-model="showOverlayOrderDetails" class="overlay">
            <CsBasketDetail :basket-id="selectedBasketId"/>
        </v-overlay>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import BasketOrderLightVM from "../../viewmodels/BasketOrderLightVM.ts";
import BasketOrderRequester from "../../requesters/BasketOrderRequester.ts";
import CsBasketDetail from "../store/CsBasketDetail.vue";

const headers = computed(() => [
    {title: t('orderNumber'), value: 'orderNumber'},
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

const requestUserOrders = async () => {
    orders.value = await BasketOrderRequester.requestBasketOrderLightForUser();
};

requestUserOrders();

const clickOnDetail = (basketId: string) => {
    selectedBasketId.value = basketId;
    showOverlayOrderDetails.value = true;
};

const getPdfSrc = (basketId: string) => {
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/order/${basketId}/pdf?language=${locale.value}`;
};

</script>

<style scoped>
.content {
    padding: 10px;
}

.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>