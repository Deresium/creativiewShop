<template>
    <v-data-table
        :headers="headers"
        :items="manufacturers"
        item-key="manufacturerId"
        items-per-page="10"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn color="red" icon="mdi-delete-empty" size="25px"
                   @click="deleteItemConfirm(item.getManufacturerId())"/>
            <v-btn color="white" icon="mdi-pencil" size="25px" @click="showEditOverlay(item.getManufacturerId())"/>
        </template>
    </v-data-table>
    <v-dialog v-model="confirmDelete">
        <v-card :text="t('confirmDeleteManufacturer.text')" :title="t('confirmDelete.title')">
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
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import ManufacturerVM from "../../viewmodels/ManufacturerVM.ts";
import ManufacturerRequester from "../../requesters/ManufacturerRequester.ts";
import axiosServer from "../../axios/axiosServer.ts";

const {t} = useI18n({useScope: "global"});

const emit = defineEmits(['deleteSuccess', 'showEditOverlay']);

const headers = computed(() => [
    {title: t('name'), value: 'name'},
    {title: t('action'), value: 'actions'}
]);

const confirmDelete = ref(false);
const tempManufacturerId = ref();
const loading = ref(false);

const manufacturers = ref(new Array<ManufacturerVM>());
ManufacturerRequester.getManufacturers().then(response => {
    manufacturers.value = response;
});

const deleteItemConfirm = (manufacturerId: string) => {
    confirmDelete.value = true;
    tempManufacturerId.value = manufacturerId;
};

const showEditOverlay = (manufacturerId: string) => {
    emit('showEditOverlay', manufacturerId);
};

const handleConfirm = async () => {
    loading.value = true;
    if (!tempManufacturerId.value) {
        return;
    }
    await axiosServer.delete(`/manufacturer/${tempManufacturerId.value}`);
    confirmDelete.value = false;
    tempManufacturerId.value = null;
    loading.value = false;
    emit('deleteSuccess');
};

const handleRefuse = () => {
    confirmDelete.value = false;
    tempManufacturerId.value = null;
};

</script>

<style scoped>
.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>