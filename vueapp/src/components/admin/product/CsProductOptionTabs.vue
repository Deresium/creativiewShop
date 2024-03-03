<template>
    <div>
        <v-tabs v-model="tab" :bg-color="firstColor" grow>
            <v-tab value="info">{{ t('generalInformation') }}</v-tab>
            <v-tab value="category">{{ t('category') }}</v-tab>
            <v-tab value="price">{{ t('price') }}</v-tab>
            <v-tab value="picture">{{ t('picture') }}</v-tab>
        </v-tabs>
        <v-window v-model="tab" :touch="false" class="window">
            <v-window-item value="info">
                <CsProductOptionInfo :product-option-id="productOptionId" @updateInfoSuccess="handleUpdateInfoSuccess"/>
            </v-window-item>
            <v-window-item value="category">
                <CsProductOptionCategory/>
            </v-window-item>
            <v-window-item value="price">
                <CsProductOptionPrice/>
            </v-window-item>
            <v-window-item value="picture">
                <CsProductOptionPicture/>
            </v-window-item>
        </v-window>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import useCustomer from "../../../compositionfunctions/customer.ts";
import {ref} from "vue";
import CsProductOptionInfo from "./CsProductOptionInfo.vue";
import CsProductOptionCategory from "./CsProductOptionCategory.vue";
import CsProductOptionPrice from "./CsProductOptionPrice.vue";
import CsProductOptionPicture from "./CsProductOptionPicture.vue";

const {t} = useI18n({useScope: 'global'});
const {firstColor} = useCustomer();

defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['updateInfoSuccess']);

const tab = ref('info');

const handleUpdateInfoSuccess = () => {
    emit('updateInfoSuccess');
}
</script>

<style scoped>

</style>