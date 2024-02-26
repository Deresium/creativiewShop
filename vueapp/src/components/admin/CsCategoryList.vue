<template>
    <v-data-table
        :headers="headers"
        :items="categoriesFlat"
        item-key="categoryId"
        items-per-page="10"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn @click="deleteItemConfirm(item.categoryId)" size="25px" color="red" icon="mdi-delete-empty"/>
            <v-btn @click="showEditOverlay(item.categoryId)" size="25px" color="white" icon="mdi-pencil"/>
        </template>
    </v-data-table>
    <v-dialog v-model="confirmDelete">
        <v-card :title="t('confirmDelete.title')" :text="t('confirmDelete.text')">
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

<script setup lang="ts">
import {Ref, ref} from "vue";
import CategoryFlatVM from "../../viewmodels/CategoryFlatVM.ts";
import CategoryFlatRequester from "../../requesters/CategoryFlatRequester.ts";
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";

const {t} = useI18n({useScope: "global"});

const emit = defineEmits(['deleteSuccess', 'showEditOverlay']);

const headers = ref([
    {title: t('frenchName'), value: 'nameFr'},
    {title: t('englishName'), value: 'nameEn'},
    {title: t('parentCategory'), value: 'parentsAriane'},
    {title: t('action'), value: 'actions'}
]);

const confirmDelete = ref(false);
const tempCategoryId = ref();
const loading = ref(false);

const categoriesFlat = ref(new Array<CategoryFlatVM>()) as Ref<Array<CategoryFlatVM>>;
CategoryFlatRequester.requestCategoriesFlat().then(response => {
    categoriesFlat.value = response;
});

const deleteItemConfirm = (categoryId: string) => {
    confirmDelete.value = true;
    tempCategoryId.value = categoryId;
};

const showEditOverlay = (categoryId: string) => {
    emit('showEditOverlay', categoryId);
};

const handleConfirm = async () => {
    loading.value = true;
    if (!tempCategoryId.value) {
        return;
    }
    await axiosServer.delete(`/category/${tempCategoryId.value}`);
    confirmDelete.value = false;
    tempCategoryId.value = null;
    loading.value = false;
    emit('deleteSuccess');
};

const handleRefuse = () => {
    confirmDelete.value = false;
    tempCategoryId.value = null;
};

</script>

<style scoped>

</style>