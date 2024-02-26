<template>
    <v-overlay class="overlay" v-model="localModelValue">
        <div class="form">
            <p v-if="categoryId">{{ categoryId }}</p>
            <v-alert class="alertError" v-model="showAlert" type="error" :text="t('error.form')"/>
            <v-alert class="alertError" v-model="showBackendError" type="error" :text="t(backendError)"/>
            <v-form v-model="formValid" validate-on="blur" @submit.prevent="submitForm">
                <v-text-field name="nameFR" type="text" v-model="nameFr" :rules="nameFrRules" :label="t('frenchName')"/>
                <v-text-field name="nameEN" type="text" v-model="nameEn" :rules="nameEnRules"
                              :label="t('englishName')"/>
                <v-autocomplete v-model="selectedParentCategory" :items="categoriesFlat" :label="t('parentCategory')"/>
                <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
            </v-form>
        </div>
    </v-overlay>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import useRules from "../../compositionfunctions/rules.ts";
import {computed, ref} from "vue";
import * as validator from "validator";
import axiosServer from "../../axios/axiosServer.ts";
import CategoryFlatRequester from "../../requesters/CategoryFlatRequester.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";

const {t} = useI18n({useScope: "global"});
const {notEmpty} = useRules();

const emit = defineEmits(['addSuccess', 'update:modelValue']);

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

const nameFr = ref('');
const nameFrRules = [notEmpty(t('frenchName'))];
const nameEn = ref('');
const nameEnRules = [notEmpty(t('englishName'))];
const selectedParentCategory = ref(null);

const categoriesFlat = ref(new Array<TitleValueVM<string, string>>());
CategoryFlatRequester.requestCategoriesFlat().then(response => {
    categoriesFlat.value = response.map(category => new TitleValueVM(category.getFullNameAriane(), category.getCategoryId()));
});

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.post('/category', {
            nameFr: nameFr.value,
            nameEn: nameEn.value,
            parentCategoryId: selectedParentCategory.value
        });
        backendError.value = '';
        successAddCategory.value = true;
        emit('addSuccess');
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