<template>
    <v-app>
        <div v-if="!initDone">
            <v-skeleton-loader type="card"></v-skeleton-loader>
        </div>
        <div v-if="initDone" class="app">
            <div class="exceptFooter">
                <CsHeader/>
                <router-view v-slot="{ Component }">
                    <KeepAlive include="CsStore">
                        <component :is="Component" :key="route.fullPath"/>
                    </KeepAlive>
                </router-view>
            </div>
            <CsFooter/>
        </div>
    </v-app>
</template>

<script lang="ts" setup>
import CsHeader from "./components/global/CsHeader.vue";
import CsFooter from "./components/global/CsFooter.vue";
import {useCustomerStore} from "./pinia/customer/CustomerStore.ts";
import {computed, ref, watch} from "vue";
import InternalizationRequester from "./requesters/InternalizationRequester.ts";
import I18nMessagesMerger from "./i18n/i18nMessagesMerger.ts";
import {useI18n} from "vue-i18n";
import axiosServer from "./axios/axiosServer.ts";
import {useUserStore} from "./pinia/user/UserStore.ts";
import {useGlobalStore} from "./pinia/global/GlobalStore.ts";
import {useStoreStore} from "./pinia/store/StoreStore.ts";
import {useRoute} from "vue-router";

const initDone = ref(false);
const customerStore = useCustomerStore();
const userStore = useUserStore();
const globalStore = useGlobalStore();
const storeStore = useStoreStore();
const {locale} = useI18n({useScope: "global"});


const loggedIn = computed(() => userStore.isLoggedIn);

const route = useRoute();

watch(locale, () => {
    axiosServer.defaults.params['language'] = locale.value;
}, {immediate: true});

watch(loggedIn, async () => {
    await storeStore.setHasAccessToStore();
    await storeStore.refreshNbItemsInStore();
});

const initApp = async () => {
    await customerStore.retrieveCustomer();
    await storeStore.setCurrency(customerStore.getCurrencyCode);
    const messages = await InternalizationRequester.getInternalizationMessages();
    new I18nMessagesMerger().addMessages(messages);
    await userStore.retrieveLoginUserInfo();
    //@ts-ignore
    grecaptcha.enterprise.ready(() => {
        globalStore.setRecaptchaReady(true);
    });
};

initApp().then(() => {
    initDone.value = true;
});

</script>

<style>
body {
    margin: 0;
    padding: 0;
}

h1 {
    font-size: xx-large;
}

h2, h3 {
    font-size: x-large;
}

h1, h2, h3 {

    font-weight: 700;
    font-style: normal;
}

.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
