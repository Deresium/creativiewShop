<template>
    <h2>{{ t('user') }}</h2>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});

</script>

<style scoped>

</style>