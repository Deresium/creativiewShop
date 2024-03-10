<template>
    <v-data-table
        :headers="headers"
        :items="categoriesFlat"
        item-key="categoryId"
        items-per-page="10"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn color="white" icon="mdi-pencil" size="25px" @click="showEditOverlay(item.getCategoryId())"/>
            <v-btn color="red" icon="mdi-delete-empty" size="25px" @click="deleteItemConfirm(item.getCategoryId())"/>
            <v-btn color="white" icon="mdi-image" size="25px" @click="clickImage(item.getCategoryId())"/>
        </template>
    </v-data-table>
    <v-dialog v-model="confirmDelete">
        <v-card :text="t('confirmDeleteCategory.text')" :title="t('confirmDelete.title')">
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
    <v-overlay v-if="showImage" v-model="showImage" class="overlay">
        <CsCategoryImageUploader :category-id="categoryIdSelected"/>
    </v-overlay>
</template>

<script lang="ts" setup>
import {computed, Ref, ref} from "vue";
import CategoryFlatVM from "../../viewmodels/CategoryFlatVM.ts";
import CategoryFlatRequester from "../../requesters/CategoryFlatRequester.ts";
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";
import CsCategoryImageUploader from "./CsCategoryImageUploader.vue";

const {t} = useI18n({useScope: "global"});

const emit = defineEmits(['deleteSuccess', 'showEditOverlay']);

const headers = computed(() => [
    {title: t('frenchName'), value: 'nameFr'},
    {title: t('englishName'), value: 'nameEn'},
    {title: t('parentCategory'), value: 'parentsAriane'},
    {title: t('action'), value: 'actions'}
]);

const confirmDelete = ref(false);
const tempCategoryId = ref();
const loading = ref(false);
const showImage = ref(false);
const categoryIdSelected = ref();

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

const clickImage = (categoryId: string) => {
    showImage.value = true;
    categoryIdSelected.value = categoryId;
};

</script>

<style scoped>
.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>