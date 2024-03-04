<template>
    <v-chip-group v-model="selectedCategories" class="chips" multiple>
        <v-chip v-for="category in categories" :key="category.getCategoryId()" :color="firstColor"
                :value="category.getCategoryId()">
            {{ category.getNameFr() }}
        </v-chip>
    </v-chip-group>
    <v-btn :disabled="loading" :loading="loading" class="btnSubmit" @click="updateCategories">{{ t('update') }}</v-btn>
</template>

<script lang="ts" setup>
import CategoryRequester from "../../../requesters/CategoryRequester.ts";
import CategoryVM from "../../../viewmodels/CategoryVM.ts";
import {ref} from "vue";
import useCustomer from "../../../compositionfunctions/customer.ts";
import {useI18n} from "vue-i18n";
import axiosServer from "../../../axios/axiosServer.ts";
import {useRoute} from "vue-router";

const {t} = useI18n({useScope: "global"});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['updateCategorySuccess']);

const {firstColor} = useCustomer();

const selectedCategories = ref(new Array<string>());
const loading = ref(false);

const categories = ref(new Array<CategoryVM>());
CategoryRequester.requestCategories().then(response => {
    categories.value = response;
});

axiosServer.get(`/product/${productIdString}/productOption/${props.productOptionId}/category`).then(response => {
    selectedCategories.value = response.data;
});

const updateCategories = async () => {
    loading.value = true;
    await axiosServer.put(`/product/${productIdString}/productOption/${props.productOptionId}/category`, {
        categoriesId: selectedCategories.value
    });
    loading.value = false;
    emit('updateCategorySuccess');
};
</script>

<style scoped>
.chips {
    margin-top: 20px;
}

.btnSubmit {
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>