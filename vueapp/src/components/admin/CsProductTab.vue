<template>
    <h2>{{ t('product') }}</h2>
    <v-btn @click="addProduct">{{ t('addProduct') }}</v-btn>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});

const addProduct = () => {

}

</script>

<style scoped>

</style>