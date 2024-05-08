<template>
    <v-alert v-model="showBackendError" :text="t(backendError)" class="alertError"
             type="error"/>
    <v-form v-model="formValid" validate-on="input" @submit.prevent="submitForm">
        <v-autocomplete v-model="userId" :items="users" :label="t('user')" :rules="userRules"
                        name="user"/>
        <v-btn :disabled="isSending" :loading="isSending" type="submit">{{ t('addUser') }}</v-btn>
    </v-form>

    <v-data-table
        :headers="headers"
        :items="usersInGroup"
        item-key="userId"
        items-per-page="10"
    >
        <template #item.actions="{ item }">
            <v-btn color="red" icon="mdi-delete-empty" size="25px" @click="askDeleteConfirm(item.getUserId())"/>
        </template>
    </v-data-table>

    <v-dialog v-model="showDeleteConfirm">
        <v-card :text="t('confirmDeleteUserGroup.text')" :title="t('confirmDelete.title')">
            <template #actions>
                <v-btn :loading="isSending" @click="handleConfirm">
                    {{ t('confirm') }}
                </v-btn>
                <v-btn @click="handleRefuse">
                    {{ t('refuse') }}
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import UserPurchaserRequester from "../../requesters/UserPurchaserRequester.ts";
import {useI18n} from "vue-i18n";
import useRules from "../../compositionfunctions/rules.ts";
import UserPurchaserVM from "../../viewmodels/UserPurchaserVM.ts";
import axiosServer from "../../axios/axiosServer.ts";
import * as validator from "validator";

const {t} = useI18n({useScope: 'global'});

const props = defineProps({
    groupId: {
        type: String,
        required: true
    }
});

const {notEmpty} = useRules();

const headers = computed(() => [
    {title: t('name'), value: 'name'},
    {title: t('firstName'), value: 'firstName'},
    {title: t('email'), value: 'email'},
    {title: t('action'), value: 'actions'},
]);

const formValid = ref();
const isSending = ref(false);
const backendError = ref('');
const showBackendError = computed(() => !validator.isEmpty(backendError.value));

const userIdTemp = ref(null);
const showDeleteConfirm = ref(false);

const userId = ref(null);
const userRules = [notEmpty(t('user'))];

const users = ref(new Array<TitleValueVM<string, string>>());
UserPurchaserRequester.requestUserPurchasers(true).then(response => {
    users.value = response.map(user => new TitleValueVM<string, string>(`${user.getFirstName()} ${user.getName()} (${user.getEmail()})`, user.getUserId()));
});

const usersInGroup = ref(new Array<UserPurchaserVM>());
UserPurchaserRequester.requestUserPurchasersInGroup(props.groupId).then(response => {
    usersInGroup.value = response;
});

const refreshUserPurchaserInGroup = async () => {
    usersInGroup.value = await UserPurchaserRequester.requestUserPurchasersInGroup(props.groupId);
};

const submitForm = async () => {
    isSending.value = true;
    if (!formValid.value) {
        isSending.value = false;
        return;
    }

    try {
        await axiosServer.post(`/user/${userId.value}/group/discount/${props.groupId}`);
        await refreshUserPurchaserInGroup();
        backendError.value = '';
    } catch (error: any) {
        backendError.value = error.response.data;
    }
    isSending.value = false;
};

const askDeleteConfirm = (userId: string) => {
    userIdTemp.value = userId;
    showDeleteConfirm.value = true;
};

const handleConfirm = async () => {
    isSending.value = true;
    if (!userIdTemp.value) {
        return;
    }
    await axiosServer.delete(`/user/${userIdTemp.value}/group/${props.groupId}`);
    await refreshUserPurchaserInGroup();
    showDeleteConfirm.value = false;
    userIdTemp.value = null;
    isSending.value = false;
};

const handleRefuse = () => {
    showDeleteConfirm.value = false;
    userIdTemp.value = null;
};
</script>

<style scoped>

</style>