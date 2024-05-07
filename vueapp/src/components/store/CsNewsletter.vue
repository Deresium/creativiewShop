<template>
    <div class="content">
        <h2>{{ t('Newsletter') }}</h2>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import UserPurchaserRequester from "../../requesters/UserPurchaserRequester.ts";
import {Ref, ref} from "vue";
import UserPurchaserVM from "../../viewmodels/UserPurchaserVM.ts";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import axiosServer from "../../axios/axiosServer.ts";
import TitleValueParser from "../../parsers/TitleValueParser.ts";

const {t} = useI18n({useScope: "global"});

const users: Ref<Array<UserPurchaserVM>> = ref([]);
const groups: Ref<Array<TitleValueVM<string, string>>> = ref([]);

const requestUsers = async() => {
    users.value = await UserPurchaserRequester.requestUserPurchasers();
}

const requestGroups = async() => {
    const response = await axiosServer.get('/groupDiscount');
    groups.value = TitleValueParser.parseTitleValues(response.data);
}

requestUsers();
requestGroups();

</script>

<style scoped>
.content {
    padding: 10px;
}
</style>