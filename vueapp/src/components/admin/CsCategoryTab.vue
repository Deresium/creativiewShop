<template>
    <h2>{{ t('category') }}</h2>
    <v-btn @click="showAddCategory">{{ t('addCategory') }}</v-btn>
    <CategoryForm v-if="showCategoryForm" :key="counterRefresh" v-model="showCategoryForm" :categoryId="categoryToEdit"
                  @add-success="onAddSuccess" @update-success="onUpdateSuccess"/>
    <CsCategoryList :key="counterRefresh" @delete-success="deleteSuccess" @show-edit-overlay="showEditOverlay"/>

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
import CategoryForm from "./CsCategoryForm.vue";
import {ref} from "vue";
import CsCategoryList from "./CsCategoryList.vue";

const {t} = useI18n({useScope: 'global'});

const showCategoryForm = ref(false);

const counterRefresh = ref(0);
const showSnackbar = ref(false);
const textSnackbar = ref(null);
const categoryToEdit = ref();

const showAddCategory = () => {
    categoryToEdit.value = null;
    showCategoryForm.value = true;
};
const onAddSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    showCategoryForm.value = false;
    textSnackbar.value = t('createCategory.success');
};

const onUpdateSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    showCategoryForm.value = false;
    categoryToEdit.value = null;
    textSnackbar.value = t('updateCategory.success');
};

const deleteSuccess = () => {
    counterRefresh.value++;
    showSnackbar.value = true;
    textSnackbar.value = t('deleteCategory.success');
};

const showEditOverlay = (categoryId: string) => {
    categoryToEdit.value = categoryId;
    showCategoryForm.value = true;
}

</script>

<style scoped>

</style>