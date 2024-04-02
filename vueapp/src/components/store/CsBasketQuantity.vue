<template>
    <v-text-field v-model="quantity" :hide-details="true" :label="t('quantity')" name="quantity" type="number"/>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import Debouncer from "../../compositionfunctions/Debouncer.ts";
import axiosServer from "../../axios/axiosServer.ts";

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['quantityUpdated', 'errorQuantity']);

const {t} = useI18n({useScope: "global"});

const quantity = ref(props.quantity);

const updateProductOptionQuantity = async () => {
    try {
        await axiosServer.put(`/basket/${props.productOptionId}`, {
            quantity: quantity.value
        });
        emit('quantityUpdated');
    } catch (error: any) {
        emit('errorQuantity', error.response.data);
    }
};

const debounceUpdateQuantity = new Debouncer(1000, updateProductOptionQuantity);

watch(quantity, () => {
    debounceUpdateQuantity.debounce();
});


</script>

<style scoped>

</style>