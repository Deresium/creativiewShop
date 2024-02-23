<template>
    <header>
        <img class="imgLogo" :src="srcImg" alt="logo"/>
        <v-btn @click="clickOnMenu" icon="mdi-menu" size="large" :color="firstColor"/>
        <CsMenu/>
    </header>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useCustomerStore} from "../../pinia/customer/CustomerStore.ts";
import CsMenu from "./CsMenu.vue";
import useCustomer from "../../compositionfunctions/customer.ts";
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";

const customerStore = useCustomerStore();
const globalStore = useGlobalStore();

const srcImg = computed((() => `/logos/${customerStore.getCustomerId}.png`));
const {firstColor} = useCustomer();

const clickOnMenu = () => {
    globalStore.setShowMenuOverlay(true);
}

</script>

<style scoped>
header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

img.imgLogo {
    width: 200px;
}

</style>