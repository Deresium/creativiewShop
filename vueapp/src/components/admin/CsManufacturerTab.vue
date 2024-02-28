<template>
    <h2>{{ t('manufacturer') }}</h2>
    <v-btn @click="showAddManufacturer">{{ t('addManufacturer') }}</v-btn>
    <CsManufacturerForm v-if="showManufacturerForm" :key="counterRefresh" v-model="showManufacturerForm"
                        :manufacturer-id="manufacturerToEdit"
                        @add-success="onAddSuccess" @update-success="onUpdateSuccess"/>
    <CsManufacturerList :key="counterRefresh" @delete-success="deleteSuccess" @show-edit-overlay="showEditOverlay"/>

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
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import CsManufacturerForm from "./CsManufacturerForm.vue";
import CsManufacturerList from "./CsManufacturerList.vue";

const {t} = useI18n({useScope: 'global'});

const showManufacturerForm = ref(false);

const counterRefresh = ref(0);
const showSnackbar = ref(false);
const textSnackbar = ref(null);
const manufacturerToEdit = ref();

const showAddManufacturer = () => {
    manufacturerToEdit.value = null;
    showManufacturerForm.value = true;
};

const onAddSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    showManufacturerForm.value = false;
    textSnackbar.value = t('createManufacturer.success');
};

const onUpdateSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    showManufacturerForm.value = false;
    manufacturerToEdit.value = null;
    textSnackbar.value = t('updateManufacturer.success');
};

const deleteSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    textSnackbar.value = t('deleteManufacturer.success');
};

const showEditOverlay = (categoryId: string) => {
    manufacturerToEdit.value = categoryId;
    showManufacturerForm.value = true;
}
</script>

<style scoped>

</style>