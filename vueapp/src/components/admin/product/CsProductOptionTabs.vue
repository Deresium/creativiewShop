<template>
    <h2 v-if="productOption">{{ t('productOption', {code: productOption.getCode()}) }}</h2>
    <div>
        <v-tabs v-model="tab" :bg-color="firstColor" grow>
            <v-tab value="info">{{ t('generalInformation') }}</v-tab>
            <v-tab value="category">{{ t('category') }}</v-tab>
            <v-tab value="price">{{ t('price') }}</v-tab>
            <v-tab value="picture">{{ t('picture') }}</v-tab>
            <v-tab value="discount">{{ t('discount') }}</v-tab>
        </v-tabs>
        <v-window v-model="tab" :touch="false" class="window">
            <v-window-item value="info">
                <CsProductOptionInfo :key="counterRefresh" :product-option-id="productOptionId"
                                     @updateInfoSuccess="handleUpdateInfoSuccess"/>
            </v-window-item>
            <v-window-item value="category">
                <CsProductOptionCategory :key="counterRefresh" :product-option-id="productOptionId"
                                         @updateCategorySuccess="handleUpdateSuccessCategory"/>
            </v-window-item>
            <v-window-item value="price">
                <CsProductOptionPrice :key="counterRefresh" :product-option-id="productOptionId"
                                      @addPriceSuccess="handleAddPriceSuccess"/>
            </v-window-item>
            <v-window-item value="picture">
                <CsProductOptionPicture :key="counterRefresh" :product-option-id="productOptionId"
                                        @add-picture-success="handleAddPictureSuccess"
                                        @delete-picture-success="handleDeletePictureSuccess"/>
            </v-window-item>
            <v-window-item value="discount">
                <CsProductOptionDiscountList :key="counterRefresh" :product-option-id="productOptionId"
                                             @add-discount-success="handleAddDiscountSuccess"
                                             @delete-discount-success="handleDeleteDiscountSuccess"/>
            </v-window-item>
        </v-window>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import useCustomer from "../../../compositionfunctions/customer.ts";
import {Ref, ref} from "vue";
import CsProductOptionInfo from "./CsProductOptionInfo.vue";
import CsProductOptionCategory from "./CsProductOptionCategory.vue";
import CsProductOptionPrice from "./CsProductOptionPrice.vue";
import CsProductOptionPicture from "./CsProductOptionPicture.vue";
import ProductOptionRequester from "../../../requesters/ProductOptionRequester.ts";
import {useRoute} from "vue-router";
import ProductOptionVM from "../../../viewmodels/ProductOptionVM.ts";
import CsProductOptionDiscountList from "./CsProductOptionDiscountList.vue";

const {t} = useI18n({useScope: 'global'});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const {firstColor} = useCustomer();

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const counterRefresh = ref(0);

const productOption: Ref<ProductOptionVM> = ref(null);
ProductOptionRequester.requestProductOption(productIdString, props.productOptionId).then(response => {
    productOption.value = response;
});

const emit = defineEmits(['updateInfoSuccess', 'updateCategorySuccess', 'addPriceSuccess', 'addPictureSuccess', 'deletePictureSuccess', 'addDiscountSuccess', 'deleteDiscountSuccess']);

const tab = ref('info');

const handleUpdateInfoSuccess = () => {
    counterRefresh.value++;
    emit('updateInfoSuccess');
};

const handleUpdateSuccessCategory = () => {
    counterRefresh.value++;
    emit('updateCategorySuccess');
};

const handleAddPriceSuccess = () => {
    counterRefresh.value++;
    emit('addPriceSuccess');
};

const handleAddPictureSuccess = () => {
    counterRefresh.value++;
    emit('addPictureSuccess');
};

const handleDeletePictureSuccess = () => {
    counterRefresh.value++;
    emit('deletePictureSuccess');
};

const handleAddDiscountSuccess = () => {
    counterRefresh.value++;
    emit('addDiscountSuccess');
};

const handleDeleteDiscountSuccess = () => {
    counterRefresh.value++;
    emit('deleteDiscountSuccess');
};

</script>

<style scoped>
h2 {
    background-color: v-bind(firstColor);
    text-align: center;
}

</style>