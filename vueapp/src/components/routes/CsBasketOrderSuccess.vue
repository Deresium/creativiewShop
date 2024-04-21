<template>
    <v-alert :text="t('basketOrder.success')" type="success"/>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: "global"});

</script>

<style scoped>

</style>