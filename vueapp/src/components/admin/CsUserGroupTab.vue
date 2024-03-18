<template>
    <h2>{{ t('userGroups') }}</h2>
    <template v-for="group in listGroupDiscount" :key="group.getValue()">
        <h3>{{ group.getTitle() }}</h3>
        <CsUserGroupUsers :group-id="group.getValue()"/>
    </template>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";
import TitleValueParser from "../../parsers/TitleValueParser.ts";
import {ref} from "vue";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import CsUserGroupUsers from "./CsUserGroupUsers.vue";

const {t} = useI18n({useScope: 'global'});

const listGroupDiscount = ref(new Array<TitleValueVM<string, string>>());
axiosServer.get('/groupDiscount').then(response => {
    listGroupDiscount.value = TitleValueParser.parseTitleValues(response.data);
});

</script>

<style scoped>

</style>