<template>
    <div class="content">
        <h2>{{ t('orderDetail') }}</h2>
        <v-skeleton-loader v-if="!isLoaded" type="card"></v-skeleton-loader>

        <div v-if="isLoaded">
            <v-data-table
                :headers="headers"
                :items="order.getBasketProductOptionOrders()"
                item-key="productOptionId"
                items-per-page="10"
            >
                <template #item.picture="{ item }">
                    <div v-if="item.getPictureId()" class="divImgProductOption">
                        <img
                            :src="imageSrc(item.getProductId(), item.getProductOptionId(), item.getPictureId())"
                            alt="product image"/>
                    </div>
                </template>

                <template #item.price="{ item }">
                    {{ item.getPrice() }}&nbsp{{ order.getCurrencySymbol() }}
                </template>

                <template #item.total="{ item }">
                    {{ item.getTotal() }}&nbsp{{ order.getCurrencySymbol() }}
                </template>
            </v-data-table>

            <div class="infos">
                <p><b>{{ t('deliveryOption') }}</b><br/>{{ order.getDeliveryOptionLabel() }}</p>
                <p>
                    <b>{{ t('deliveryOptionPrice') }}</b>
                    <br/>
                    {{ order.getDeliveryPrice() }}&nbsp{{ order.getCurrencySymbol() }}
                </p>
                <p v-if="deliveryAddress.getAddressId()">
                    <b>{{ t('deliveryAddress') }}</b>
                    <br/>
                    {{ deliveryAddress.getStreet() }} {{ deliveryAddress.getStreetNumber() }}
                    <span v-if="deliveryAddress.getBox()">({{ deliveryAddress.getBox() }})</span><br/>
                    {{ deliveryAddress.getZipCode() }} {{ deliveryAddress.getCity() }}<br/>
                    {{ deliveryAddress.getCountryName() }}
                </p>
                <p v-if="billingAddress.getAddressId()">
                    <b>{{ t('deliveryAddress') }}</b>
                    <br/>
                    {{ billingAddress.getStreet() }} {{ billingAddress.getStreetNumber() }}
                    <span v-if="billingAddress.getBox()">({{ billingAddress.getBox() }})</span><br/>
                    {{ billingAddress.getZipCode() }} {{ billingAddress.getCity() }}<br/>
                    {{ billingAddress.getCountryName() }}
                </p>
                <p>
                    <b>{{ t('totalPrice') }}</b>
                    <br/>
                    {{ order.getTotalPrice() }}&nbsp{{ order.getCurrencySymbol() }}
                </p>
                <p>
                    <b>{{ t('paymentMethod') }}</b>
                    <br/>
                    {{ t(`paymentMethod.${order.getPaymentMethod()}`) }}
                </p>
                <p>
                    <b>{{ t('status') }}</b>
                    <br/>
                    {{ t(`basketState.${order.getBasketStateCode()}`) }}
                </p>
                <p v-if="order.getOrderedAt()">
                    <b>{{ t('orderedAt') }}</b>
                    <br/>
                    {{ d(order.getOrderedAt(), 'long') }}
                </p>
                <p v-if="order.getPaidAt()">
                    <b>{{ t('paidAt') }}</b>
                    <br/>
                    {{ d(order.getPaidAt(), 'long') }}
                </p>
                <p v-if="order.getDeliveredAt()">
                    <b>{{ t('deliveredAt') }}</b>
                    <br/>
                    {{ d(order.getDeliveredAt(), 'long') }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BasketOrderVM from "../../viewmodels/BasketOrderVM.ts";
import {computed, ref, Ref} from "vue";
import BasketOrderRequester from "../../requesters/BasketOrderRequester.ts";
import {useI18n} from "vue-i18n";
import AddressVM from "../../viewmodels/AddressVM.ts";
import AddressRequester from "../../requesters/AddressRequester.ts";
import {useUserStore} from "../../pinia/user/UserStore.ts";

const props = defineProps({
    basketId: {
        type: String,
        required: true
    }
});

const {t, d} = useI18n({useScope: "global"});

const headers = computed(() => [
    {title: t('picture'), value: 'picture'},
    {title: t('title'), value: 'title'},
    {title: t('price'), value: 'price'},
    {title: t('quantity'), value: 'quantity'},
    {title: t('total'), value: 'total'}
]);

const order: Ref<BasketOrderVM> = ref();
const deliveryAddress: Ref<AddressVM> = ref();
const billingAddress: Ref<AddressVM> = ref();
const isLoaded = ref(false);
const {isAdminStore} = useUserStore();


const requestBasket = async () => {
    order.value = await BasketOrderRequester.requestBasketOrder(props.basketId);
    if (order.value.getDeliveryAddressId()) {
        if (isAdminStore) {
            deliveryAddress.value = await AddressRequester.requestAddressAdminStore(order.value.getDeliveryAddressId());
        } else {
            deliveryAddress.value = await AddressRequester.requestAddress(order.value.getDeliveryAddressId());
        }
    }
    if (order.value.getBillingAddressId()) {
        if (isAdminStore) {
            billingAddress.value = await AddressRequester.requestAddressAdminStore(order.value.getBillingAddressId());
        } else {
            billingAddress.value = await AddressRequester.requestAddress(order.value.getBillingAddressId());
        }
    }
    isLoaded.value = true;
};

requestBasket();

const imageSrc = (productId: string, productOptionId: string, productPictureId: string) => {
    if (!productId || !productOptionId || !productPictureId) {
        return null;
    }
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productId}/productOption/${productOptionId}/image/${productPictureId}`;
};


</script>

<style scoped>
.content {
    height: 80vh;
    width: 80vw;
    overflow-y: scroll;
    padding: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.divImgProductOption {
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.divImgProductOption img {
    width: 100px;
}

.infos {
    margin-top: 50px;
}

.infos p {
    margin-bottom: 20px;
}
</style>