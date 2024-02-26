<template>
    <v-overlay :scrim="firstColor" class="overlay" v-model="showMenuOverlay">
        <div class="overlayContent">
            <div class="routes">
                <RouterLink @click="clickOnRoute" v-if="isAdminStore" :to="{name: 'admin'}">{{ t('adminZone') }}</RouterLink>
            </div>
            <v-btn v-if="isLoggedIn" @click="clickOnLogout">{{ t('logout') }}</v-btn>
        </div>
    </v-overlay>
</template>

<script setup lang="ts">
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";
import {computed} from "vue";
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {useI18n} from "vue-i18n";
import useUser from "../../compositionfunctions/user.ts";
import router from "../../router/router.ts";
import useCustomer from "../../compositionfunctions/customer.ts";

const globalStore = useGlobalStore();
const userStore = useUserStore();

const {t} = useI18n({useScope: 'global'});
const {isLoggedIn, isAdminStore} = useUser();
const {firstColor} = useCustomer();

const showMenuOverlay = computed({
    get(): boolean {
        return globalStore.getShowMenuOverlay;
    },
    set(value: boolean) {
        globalStore.setShowMenuOverlay(value);
    }
});

const clickOnRoute = () => {
    globalStore.setShowMenuOverlay(false);
};

const clickOnLogout = async () => {
    await userStore.logout();
    await router.push({name: 'home'});
    globalStore.setShowMenuOverlay(false);
}
</script>


<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlayContent {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.routes {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.routes a {
    font-size: x-large;
    display: block;
    text-decoration: none;
}
</style>