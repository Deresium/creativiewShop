<template>
    <v-overlay v-model="localModelValue" class="overlay">
        <div class="form">
            <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
            <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError" type="error"/>
            <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
                <v-text-field v-model="name" :label="t('manufacturer')" :rules="nameRules" name="name" type="text"/>
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
import ManufacturerRequester from "../../requesters/ManufacturerRequester.ts";

const {t} = useI18n({useScope: "global"});
const {notEmpty} = useRules();

const emit = defineEmits(['addSuccess', 'updateSuccess', 'update:modelValue']);

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    manufacturerId: {
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
const successAddManufacturer = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const isUpdate = computed(() => props.manufacturerId);

const name = ref('');
const nameRules = [notEmpty(t('manufacturer'))];

const textButton = computed(() => {
    if (isUpdate.value) {
        return t('update');
    }
    return t('submit');
});

if (isUpdate.value) {
    ManufacturerRequester.getManufacturer(props.manufacturerId).then(response => {
        name.value = response.getName();
        formValid.value = true;
    });
}

const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (formValid.value === false) {
        isSending.value = false;
        return;
    }

    try {
        if (isUpdate.value) {
            await axiosServer.put(`/manufacturer/${props.manufacturerId}`, {
                name: name.value
            });
            emit('updateSuccess');
        } else {
            await axiosServer.post('/manufacturer', {
                name: name.value
            });
            emit('addSuccess');
        }

        backendError.value = '';
        successAddManufacturer.value = true;
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