<template>
    <div class="formDiv">
        <v-alert v-model="showAlert" :text="t('error.form')" class="alertError" type="error"/>
        <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError"
                 type="error"/>
        <v-form v-model="formValid" class="form" validate-on="blur" @submit.prevent="submitForm">
            <v-autocomplete v-model="groupId" :items="listGroupDiscount" :label="('group')" name="groupId"/>

            <div class="price">
                <v-text-field v-model="discountPrice" :label="t('discountPrice')" :rules="discountPriceRules"
                              name="discountPrice"/>
                <div v-if="originalPrice" class="originalPrice">
                    <v-alert class="info" color="info">
                        <p>{{ t('basePrice') }}: {{ originalPrice }} €</p>
                        <p v-if="percent">{{ t('percent') }}: {{ percent }}%</p>
                        <v-progress-circular v-if="loadingPercent" :color="firstColor" :size="30" indeterminate/>
                    </v-alert>
                </div>
                <v-alert v-if="!originalPrice" class="error" color="error">{{ t('noOriginalPrice') }}</v-alert>
            </div>

            <v-text-field v-model="startDate" :label="t('startDate')" :rules="startDateRules" name="startDate"
                          type="datetime-local"/>
            <v-text-field v-model="endDate" :label="t('endDate')" :rules="endDateRules" name="endDate"
                          type="datetime-local"/>
            <v-btn :disabled="disabledSending||isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {computed, ref, watch} from "vue";
import * as validator from "validator";
import axiosServer from "../../../axios/axiosServer.ts";
import TitleValueVM from "../../../viewmodels/TitleValueVM.ts";
import TitleValueParser from "../../../parsers/TitleValueParser.ts";
import Debouncer from "../../../compositionfunctions/Debouncer.ts";
import useCustomer from "../../../compositionfunctions/customer.ts";
import useRules from "../../../compositionfunctions/rules.ts";

const {t} = useI18n({useScope: "global"});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['addDiscountSuccess']);

const {firstColor} = useCustomer();
const {notEmpty} = useRules();


const formValid = ref();
const firstSubmit = ref(false);
const showAlert = computed(() => !formValid.value && firstSubmit.value);
const isSending = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));
const disabledSending = ref(false);

const discountPrice = ref(null);
const discountPriceRules = [notEmpty(t('discountPrice'))];
const originalPrice = ref('');
const percent = ref(null);
const groupId = ref(null);
const startDate = ref(null);
const startDateRules = [notEmpty(t('startDate'))];
const endDate = ref(null);
const endDateRules = [notEmpty(t('endDate'))];

const loadingPercent = ref(false);

const listGroupDiscount = ref(new Array<TitleValueVM<string, string>>());

axiosServer.get(`/product/${productIdString}/productOption/${props.productOptionId}/lastPrice`).then(response => {
    originalPrice.value = response.data.price;
    if (!originalPrice.value) {
        disabledSending.value = true;
    }
});

axiosServer.get('/group/discount').then(response => {
    listGroupDiscount.value = TitleValueParser.parseTitleValues(response.data);
});
const handleCalculatePercent = async () => {
    if (!discountPrice.value || !originalPrice.value) {
        loadingPercent.value = false;
        return;
    }
    const response = await axiosServer.get(`/product/${productIdString}/productOption/${props.productOptionId}/percentCalculator`, {
        params: {
            discountPrice: discountPrice.value
        }
    });
    percent.value = response.data.percent;
    loadingPercent.value = false;
};

const debouncerPercent = new Debouncer(2000, handleCalculatePercent);

watch(discountPrice, () => {
    percent.value = null;
    loadingPercent.value = true;
    debouncerPercent.debounce()
});


const submitForm = async () => {
    isSending.value = true;
    firstSubmit.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.post(`/product/${productIdString}/productOption/${props.productOptionId}/discount`, {
            groupId: groupId.value,
            percent: percent.value,
            startDate: startDate.value,
            endDate: endDate.value
        });
        emit('addDiscountSuccess');
        backendError.value = '';
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
}

</script>

<style scoped>
.formDiv {
    padding: 30px;
    background-color: white;
}

.info {
    margin-bottom: 30px;
}

.error {
    margin-bottom: 30px;
}
</style>