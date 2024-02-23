<template>
    <v-overlay class="overlay" v-model="showMenuOverlay">
        <v-btn v-if="isLoggedIn" @click="clickOnLogout">{{ t('logout') }}</v-btn>
    </v-overlay>
</template>

<script setup lang="ts">
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";
import {computed} from "vue";
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {useI18n} from "vue-i18n";
import useUser from "../../compositionfunctions/user.ts";
import router from "../../router/router.ts";

const globalStore = useGlobalStore();
const userStore = useUserStore();
const {t} = useI18n({useScope: 'global'});
const {isLoggedIn} = useUser();

const showMenuOverlay = computed({
    get(): boolean {
        return globalStore.getShowMenuOverlay;
    },
    set(value: boolean) {
        globalStore.setShowMenuOverlay(value);
    }
});

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
</style>