<template>
    <v-overlay v-model="localModelValue" class="overlay">
        <div class="form">
            <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
            <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError" type="error"/>
            <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
                <v-text-field v-model="nameFr" :label="t('frenchName')" :rules="nameFrRules" name="nameFR" type="text"/>
                <v-text-field v-model="nameEn" :label="t('englishName')" :rules="nameEnRules" name="nameEN"
                              type="text"/>
                <v-autocomplete v-model="selectedParentCategory" :items="categoriesFlat" :label="t('parentCategory')"
                                :rules="selectedParentCategoryRules" name="categoryParentId"/>
                <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ textButton }}</v-btn>
            </v-form>
        </div>
    </v-overlay>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import useRules from "../../compositionfunctions/rules.ts";
import {computed, ref} from "vue";
import * as validator from "validator";
import axiosServer from "../../axios/axiosServer.ts";
import CategoryFlatRequester from "../../requesters/CategoryFlatRequester.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";

const {t} = useI18n({useScope: "global"});
const {notEmpty, isSameValue} = useRules();

const emit = defineEmits(['addSuccess', 'updateSuccess', 'update:modelValue']);

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    categoryId: {
        type: String,
        required: false
    }
});

const localModelValue = computed({
    get: () => props.modelValue,
    set: (value: any) => {
        emit('update:modelValue', value);
    }
});

const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const successAddCategory = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const isUpdate = computed(() => props.categoryId);
const txtCategoryId = ref();

const nameFr = ref('');
const nameFrRules = [notEmpty(t('frenchName'))];
const nameEn = ref('');
const nameEnRules = [notEmpty(t('englishName'))];
const selectedParentCategory = ref(null);
const selectedParentCategoryRules = [isSameValue(t('parentCategory'), props.categoryId, txtCategoryId.value)];

const textButton = computed(() => {
    if (isUpdate.value) {
        return t('update');
    }
    return t('submit');
});

const categoriesFlat = ref(new Array<TitleValueVM<string, string>>());
CategoryFlatRequester.requestCategoriesFlat().then(response => {
    for (const category of response) {
        categoriesFlat.value.push(new TitleValueVM(category.getFullNameAriane(), category.getCategoryId()));
        if (isUpdate.value && category.getCategoryId() === props.categoryId) {
            nameFr.value = category.getNameFr();
            nameEn.value = category.getNameEn();
            selectedParentCategory.value = category.getParentCategoryId();
            txtCategoryId.value = category.getFullNameAriane();
            formValid.value = true;
        }
    }
});

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (formValid.value === false) {
        isSending.value = false;
        return;
    }

    try {
        if (isUpdate.value) {
            await axiosServer.put(`/category/${props.categoryId}`, {
                nameFr: nameFr.value,
                nameEn: nameEn.value,
                parentCategoryId: selectedParentCategory.value
            });
            emit('updateSuccess');
        } else {
            await axiosServer.post('/category', {
                nameFr: nameFr.value,
                nameEn: nameEn.value,
                parentCategoryId: selectedParentCategory.value
            });
            emit('addSuccess');
        }

        backendError.value = '';
        successAddCategory.value = true;
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
}

</script>

<style scoped>
.alertError {
    margin-bottom: 10px;
}

.overlay {
    display: flex;
    justify-content: center;
    margin-top: 20vh;
}

.form {
    padding: 20px;
    background-color: white;
    width: 80vw;
}
</style>