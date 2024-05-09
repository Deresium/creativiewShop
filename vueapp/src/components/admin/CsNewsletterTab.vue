<template>
    <div class="content">
        <h2>{{ t('Newsletter') }}</h2>
        <template v-if="successSent">
            <v-alert :text="t('newsletter.success')" type="success"/>
        </template>
        <template v-if="!successSent">
            <v-alert v-if="backError" :text="t(backError)" class="alertError" type="error"/>
            <v-form v-model="formValid" @submit.prevent="submitForm">
                <div class="selection">
                    <v-autocomplete v-model="selectedGroups" :items="groups" :label="t('groups')" :multiple="true"/>
                    <v-autocomplete v-model="selectedUsers" :items="users" :label="t('users')" :multiple="true"/>
                    <v-switch v-model="sendToAllUsers" :color="firstColor" :label="t('sendToAllUsers')"/>
                </div>
                <div>
                    <v-text-field v-model="object" :label="t('object')" :rules="objectRules"/>
                </div>
                <div>
                    <CsTextArea v-model="content" :label="t('content')" mandatory/>
                </div>
                <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('submit') }}</v-btn>
            </v-form>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import UserPurchaserRequester from "../../requesters/UserPurchaserRequester.ts";
import {Ref, ref} from "vue";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import axiosServer from "../../axios/axiosServer.ts";
import TitleValueParser from "../../parsers/TitleValueParser.ts";
import useCustomer from "../../compositionfunctions/customer.ts";
import CsTextArea from "../global/CsTextArea.vue";
import useRules from "../../compositionfunctions/rules.ts";

const {t} = useI18n({useScope: "global"});

const {firstColor} = useCustomer();
const {notEmpty} = useRules();

const users: Ref<Array<TitleValueVM<string, string>>> = ref([]);
const groups: Ref<Array<TitleValueVM<string, string>>> = ref([]);


const formValid = ref(false);
const isSending = ref(false);
const successSent = ref(false);
const backError = ref(null);
const selectedGroups = ref([]);
const selectedUsers = ref([]);
const sendToAllUsers = ref(false);
const object = ref(null);
const objectRules = [notEmpty(t('object'))];
const content = ref(null);

const requestUsers = async () => {
    const usersPurchasers = await UserPurchaserRequester.requestUserPurchasers(true);
    users.value = usersPurchasers.map(user => {
        const title = `${user.getEmail()} (${user.getFirstName()} ${user.getName()})`;
        return new TitleValueVM(title, user.getUserId());
    });
};

const requestGroups = async () => {
    const response = await axiosServer.get('/groupDiscount');
    groups.value = TitleValueParser.parseTitleValues(response.data);
};

requestUsers();
requestGroups();

const submitForm = async () => {
    isSending.value = true;
    backError.value = null;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.post('/newsletter', {
            object: object.value,
            content: content.value,
            userIds: selectedUsers.value,
            groupIds: selectedGroups.value,
            sendToAllUsers: sendToAllUsers.value
        });
        isSending.value = false;
        successSent.value = true;
    } catch (error: any) {
        isSending.value = false;
        backError.value = error.response.data;
    }
}

</script>

<style scoped>
.content {
    padding: 10px;
}

.alertError {
    margin-bottom: 10px;
}
</style>