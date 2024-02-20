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

<script setup lang="ts">
import CsHeader from "./components/global/CsHeader.vue";
import CsFooter from "./components/global/CsFooter.vue";
import {useCustomerStore} from "./pinia/customer/CustomerStore.ts";
import {computed, ref, watch} from "vue";
import InternalizationRequester from "./requesters/InternalizationRequester.ts";
import I18nMessagesMerger from "./i18n/i18nMessagesMerger.ts";

const initDone = ref(false);
const customerStore = useCustomerStore();
const customerName = computed(() => customerStore.getCustomerName);

watch(customerName, () => {
    document.title = `${customerName.value} - ${document.title}`;
    const link = document.getElementById('favIconLink');
    if (link) {
        link.setAttribute('href', `/icos/${customerStore.getCustomerId}.ico`);
    }
});

const initApp = async () => {
    await customerStore.retrieveCustomer();
    const messages = await InternalizationRequester.getInternalizationMessages();
    new I18nMessagesMerger().addMessages(messages);
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

.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
