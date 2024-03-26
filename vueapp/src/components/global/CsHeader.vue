<template>
    <header>
        <v-btn icon="mdi-menu" variant="flat" @click="clickOnMenu"/>
        <img :src="srcImg" alt="logo" class="imgLogo" @click="clickOnLogo"/>
        <v-btn v-if="hasAccessToStore" icon="mdi-cart" variant="flat" @click="clickOnBasket"/>
        <CsMenu/>
    </header>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useCustomerStore} from "../../pinia/customer/CustomerStore.ts";
import CsMenu from "./CsMenu.vue";
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";
import router from "../../router/router.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";

const customerStore = useCustomerStore();
const globalStore = useGlobalStore();
const storeStore = useStoreStore();

const hasAccessToStore = computed(() => storeStore.getHasAccessToStore);
const srcImg = computed((() => `${import.meta.env.BASE_URL}logos/${customerStore.getCustomerId}.png`));

const clickOnMenu = () => {
    globalStore.setShowMenuOverlay(true);
};

const clickOnLogo = async () => {
    await router.push({name: 'home'});
};

const clickOnBasket = async () => {

};

</script>

<style scoped>
header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

img.imgLogo {
    width: 150px;
}

</style>