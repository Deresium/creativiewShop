<template>
    <v-overlay v-model="showLoginOverlay" class="overlay">
        <div class="bgTabs">
            <v-tabs v-model="tab" :bg-color="firstColor" grow>
                <v-tab value="login">{{ t('login') }}</v-tab>
                <v-tab value="createAccount">{{ t('createAccount') }}</v-tab>
            </v-tabs>
            <v-window v-model="tab" class="insideTab">
                <v-window-item value="login">
                    <LoginForm/>
                </v-window-item>
                <v-window-item value="createAccount">
                    <create-account-form/>
                </v-window-item>
            </v-window>
        </div>
    </v-overlay>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import useCustomer from "../../compositionfunctions/customer.ts";
import {useI18n} from "vue-i18n";
import LoginForm from "./CsLoginForm.vue";
import CreateAccountForm from "./CsCreateAccountForm.vue";
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";

const props = defineProps({
    openTab: String
});

const tab = ref(props.openTab);

const {firstColor} = useCustomer();
const {t} = useI18n({useScope: 'global'});
const globalStore = useGlobalStore();

const showLoginOverlay = computed({
    get(): boolean {
        return globalStore.getShowLoginOverlay;
    },
    set(value: boolean) {
        globalStore.setShowLoginOverlay(value);
    }
});

</script>

<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    margin-top: 2vh;
}

.bgTabs {
    background-color: white;
    width: 90vw;
}

.insideTab {
    padding: 10px;
}
</style>