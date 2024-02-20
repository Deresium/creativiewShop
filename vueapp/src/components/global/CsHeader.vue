<template>
    <header>
        <img class="imgLogo" :src="srcImg" alt="logo"/>
        <v-btn id="menuIcon" icon="mdi-menu" size="large" :color="firstColor"/>
        <CsMenu/>
    </header>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useCustomerStore} from "../../pinia/customer/CustomerStore.ts";
import CsMenu from "./CsMenu.vue";

const customerStore = useCustomerStore();

const srcImg = computed((() => `/logos/${customerStore.getCustomerId}.png`));
const firstColor = computed(() => customerStore.getFirstColorHex);

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