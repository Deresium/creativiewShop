<template>
    <h1>{{ t('welcomeTo') }} {{ customerName}}</h1>
    <p>{{ t('privateStore') }}</p>
    <div class="actionButtons">
        <RouterLink :to="{name: 'login'}" tag="v-btn">
            <v-btn>{{ t('login')}}</v-btn>
        </RouterLink>
        <RouterLink :to="{name: 'createAccount'}" tag="v-btn">
            <v-btn>{{ t('createAccount')}}</v-btn>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import {useCustomerStore} from "../../pinia/customer/CustomerStore.ts";
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const customerStore = useCustomerStore();

const {t} = useI18n({useScope: 'global'});
const customerName = computed(() => customerStore.getCustomerName);

</script>

<style scoped>

</style>