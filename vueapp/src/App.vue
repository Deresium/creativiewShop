<template>
    <v-app>
        <div v-if="!initDone">
            <p>Chargement en cours</p>
        </div>
        <div v-if="initDone" class="app">
            <div class="exceptFooter">
                <CsHeader/>
                <router-view/>
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

const initDone = ref(false);
const customerStore = useCustomerStore();
const userStore = useUserStore();
const customerName = computed(() => customerStore.getCustomerName);
const {locale} = useI18n({useScope: "global"});

watch(customerName, () => {
    document.title = `${customerName.value} - ${document.title}`;
    const link = document.getElementById('favIconLink');
    if (link) {
        link.setAttribute('href', `${import.meta.env.BASE_URL}/icos/${customerStore.getCustomerId}.ico`);
    }
});

watch(locale, () => {
    axiosServer.defaults.params['language'] = locale.value;
}, {immediate: true});

const initApp = async () => {
    await customerStore.retrieveCustomer();
    const messages = await InternalizationRequester.getInternalizationMessages();
    new I18nMessagesMerger().addMessages(messages);
    await userStore.retrieveLoginUserInfo();
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

h1, h2, h3 {
    font-family: "Anton", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
