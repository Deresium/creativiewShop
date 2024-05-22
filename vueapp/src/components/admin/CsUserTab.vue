<template>
    <h2>{{ t('users') }}</h2>
    <v-data-table
        v-model:sort-by="sortBy"
        :headers="headers"
        :items="users"
        item-key="userId"
        items-per-page="10"
    >
        <template #item.access="{ item }">
            <CsUserSwitchAccess
                :access="item.getAccess()"
                :user-id="item.getUserId()"
                @give-user-access="handleGiveUserAccess"
                @remove-user-access="handleRemoveUserAccess"
            />
        </template>
    </v-data-table>
    <v-snackbar v-model="showSnackbar">
        {{ textSnackbar }}
        <template v-slot:actions>
            <v-btn
                color="green"
                variant="text"
                @click="showSnackbar = false"
            >
                {{ t('close') }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import UserPurchaserRequester from "../../requesters/UserPurchaserRequester.ts";
import UserPurchaserVM from "../../viewmodels/UserPurchaserVM.ts";
import {computed, ref} from "vue";
import CsUserSwitchAccess from "./CsUserSwitchAccess.vue";

const {t} = useI18n({useScope: 'global'});

const showSnackbar = ref(false);
const textSnackbar = ref(null);

const handleGiveUserAccess = () => {
    showSnackbar.value = true;
    textSnackbar.value = t('giveUserAccess.success');
};

const handleRemoveUserAccess = () => {
    showSnackbar.value = true;
    textSnackbar.value = t('removeUserAccess.success');
};

const sortBy: any = ref([{key: 'access', order: 'asc'}]);
const headers = computed(() => [
    {title: t('name'), value: 'name', sortable: true},
    {title: t('firstName'), value: 'firstName', sortable: true},
    {title: t('email'), value: 'email', sortable: true},
    {title: t('access'), value: 'access', sortable: true},
]);

const users = ref(new Array<UserPurchaserVM>());
UserPurchaserRequester.requestUserPurchasers(false).then(response => {
    users.value = response;
});

</script>

<style scoped>

</style>