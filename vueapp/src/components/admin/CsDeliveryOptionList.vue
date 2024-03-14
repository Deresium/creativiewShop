<template>
    <v-data-table
        :headers="headers"
        :items="deliveryOptions"
        item-key="deliveryOptionId"
        items-per-page="10"
    >
        <template #item.active="{ item }">
            <v-icon :color="getColorBoolean(item.getActive())" icon="mdi-circle"/>
        </template>
        <template #item.actions="{ item }">
            <v-btn color="white" icon="mdi-pencil" size="25px" @click="goToEdit(item.getDeliveryOptionId())"/>
            <v-btn color="red" icon="mdi-delete-empty" size="25px"
                   @click="deleteItemConfirm(item.getDeliveryOptionId())"/>
        </template>
    </v-data-table>

    <v-dialog v-model="askConfirmDelete">
        <v-card :text="t('confirmDeleteDeliveryOption.text')" :title="t('confirmDelete.title')">
            <template #actions>
                <v-btn :loading="loading" @click="handleConfirm">
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
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import router from "../../router/router.ts";
import axiosServer from "../../axios/axiosServer.ts";
import DeliveryOptionVM from "../../viewmodels/DeliveryOptionVM.ts";
import DeliveryOptionRequester from "../../requesters/DeliveryOptionRequester.ts";

const {t} = useI18n({useScope: "global"});

const emit = defineEmits(['deleteSuccess']);

const headers = computed(() => [
    {title: t('nameFr'), value: 'nameFr'},
    {title: t('active'), value: 'active'},
    {title: t('action'), value: 'actions'}
]);

const askConfirmDelete = ref(false);
const tempDeliveryOptionId = ref();
const loading = ref(false);

const deliveryOptions = ref(new Array<DeliveryOptionVM>());
DeliveryOptionRequester.requestDeliveryOptions().then(response => {
    deliveryOptions.value = response;
});

const deleteItemConfirm = (deliveryOptionId: string) => {
    askConfirmDelete.value = true;
    tempDeliveryOptionId.value = deliveryOptionId;
};

const handleConfirm = async () => {
    loading.value = true;
    if (!tempDeliveryOptionId.value) {
        return;
    }
    await axiosServer.delete(`/deliveryOption/${tempDeliveryOptionId.value}`);
    askConfirmDelete.value = false;
    tempDeliveryOptionId.value = null;
    loading.value = false;
    emit('deleteSuccess');
};

const handleRefuse = () => {
    askConfirmDelete.value = false;
    tempDeliveryOptionId.value = null;
};

const goToEdit = async (deliveryOptionId: string) => {
    await router.push({name: 'adminDeliveryOption', params: {deliveryOptionId: deliveryOptionId}});
};

const getColorBoolean = (bool: boolean) => {
    if (bool) {
        return 'green';
    }
    return 'red';
};

</script>

<style scoped>

</style>