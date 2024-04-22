<template>
    <h2>{{ t('myOrders') }}</h2>
    <v-data-table
        :headers="headers"
        :items="categoriesFlat"
        item-key="categoryId"
        items-per-page="10"
    >

    </v-data-table>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const headers = computed(() => [
    {title: t('frenchName'), value: 'nameFr'},
    {title: t('englishName'), value: 'nameEn'},
    {title: t('parentCategory'), value: 'parentsAriane'},
    {title: t('action'), value: 'actions'}
]);

const {t} = useI18n({useScope: 'global'});
</script>

<style scoped>

</style>