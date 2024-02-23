<template>
    <div class="content">
        <h1>{{ t('welcomeTo') }} {{ customerName }}</h1>

        <template v-if="!isLoggedIn">
            <p>{{ t('privateStore') }}</p>
            <div class="actionButtons">
                <v-btn @click="clickOnLogin">{{ t('login') }}</v-btn>
                <v-btn @click="clickOnCreateAccount">{{ t('createAccount') }}</v-btn>
            </div>
        </template>

        <template v-if="isLoggedIn">
            <p>{{ t('welcome', {name: nameFirstName}) }}</p>
        </template>
    </div>
    <LoginOverlay v-if="showLoginOverlay" :open-tab="openTab"/>
</template>

<script setup lang="ts">
import {useCustomerStore} from "../../pinia/customer/CustomerStore.ts";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import LoginOverlay from "../global/LoginOverlay.vue";
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";
import useUser from "../../compositionfunctions/user.ts";

const customerStore = useCustomerStore();
const globalStore = useGlobalStore();

const showLoginOverlay = computed(() => globalStore.getShowLoginOverlay);

const openTab = ref('');

const {t} = useI18n({useScope: 'global'});
const customerName = computed(() => customerStore.getCustomerName);
const {isLoggedIn, nameFirstName} = useUser();

const clickOnLogin = () => {
    openTab.value = 'login';
    globalStore.setShowLoginOverlay(true);
};
const clickOnCreateAccount = () => {
    openTab.value = 'createAccount';
    globalStore.setShowLoginOverlay(true);
};

</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

.actionButtons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-top: 20px;
}
</style>