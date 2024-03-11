<template>
    <div class="discount">
        <v-btn @click="handleAdd">{{ t('addDiscount') }}</v-btn>

        <v-data-table
            :headers="headers"
            :items="productOptionDiscounts"
            item-key="productOptionDiscountId"
            items-per-page="10"
        >
            <template v-slot:item.startDate="{ item }">
                {{ d(item.getStartDate(), 'long') }}
            </template>
            <template v-slot:item.endDate="{ item }">
                {{ d(item.getEndDate(), 'long') }}
            </template>
            <template v-slot:item.deletedAt="{ item }">
                <template v-if="item.getDeletedAt()">{{ d(item.getDeletedAt(), 'long') }}</template>
            </template>
            <template v-slot:item.actions="{ item }">
                <template v-if="!item.getDeletedAt()">
                    <v-btn color="red" icon="mdi-delete-empty" size="25px"
                           @click="askConfirmDelete(item.getProductOptionDiscountId())"/>
                </template>
            </template>
        </v-data-table>

        <v-overlay v-if="showAdd" v-model="showAdd" class="overlay">
            <CsProductOptionDiscountForm :product-option-id="productOptionId"
                                         @addDiscountSuccess="handleAddDiscountSuccess"/>
        </v-overlay>

        <v-dialog v-model="askDelete">
            <v-card :text="t('confirmDeleteDiscount.text')" :title="t('confirmDelete.title')">
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
    </div>
</template>

<script lang="ts" setup>
import CsProductOptionDiscountForm from "./CsProductOptionDiscountForm.vue";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import ProductOptionDiscountRequester from "../../../requesters/ProductOptionDiscountRequester.ts";
import {useRoute} from "vue-router";
import ProductOptionDiscountVM from "../../../viewmodels/ProductOptionDiscountVM.ts";
import axiosServer from "../../../axios/axiosServer.ts";

const {t, d} = useI18n({useScope: "global"});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const emit = defineEmits(['addDiscountSuccess', 'deleteDiscountSuccess']);

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const headers = computed(() => [
    {title: t('price'), value: 'lastPrice'},
    {title: t('discountPrice'), value: 'discountPrice'},
    {title: t('percent'), value: 'percent'},
    {title: t('group'), value: 'groupName'},
    {title: t('startDate'), value: 'startDate'},
    {title: t('endDate'), value: 'endDate'},
    {title: t('deletedAt'), value: 'deletedAt'},
    {title: t('action'), value: 'actions'}
]);

const productOptionDiscounts = ref(new Array<ProductOptionDiscountVM>());

ProductOptionDiscountRequester.requestProductOptionDiscounts(productIdString, props.productOptionId).then(response => {
    productOptionDiscounts.value = response;
});


const showAdd = ref(false);
const askDelete = ref(false);
const productOptionDiscountIdTemp = ref(null);
const loading = ref(false);
const handleAdd = () => {
    showAdd.value = true;
};

const handleAddDiscountSuccess = () => {
    emit('addDiscountSuccess')
};

const askConfirmDelete = (productOptionDiscountId: string) => {
    productOptionDiscountIdTemp.value = productOptionDiscountId;
    askDelete.value = true;
};

const handleConfirm = async () => {
    loading.value = true;
    if (!productOptionDiscountIdTemp.value) {
        return;
    }
    await axiosServer.delete(`/product/${productIdString}/productOption/${props.productOptionId}/discount/${productOptionDiscountIdTemp.value}`);
    askDelete.value = false;
    productOptionDiscountIdTemp.value = null;
    loading.value = false;
    emit('deleteDiscountSuccess');
};

const handleRefuse = () => {
    askDelete.value = false;
    productOptionDiscountIdTemp.value = null;
};


</script>

<style scoped>
.discount {
    margin-top: 10px;
    margin-bottom: 10px;
}

.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>