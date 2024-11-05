<template>
    <v-overlay v-model="showMenuOverlay" :scrim="firstColor" class="overlay" opacity="100%">
        <div class="overlayContent">
            <div class="topContent">
                <div class="routes">
                    <RouterLink v-if="isAdminStore" :to="{name: 'admin'}" @click="clickOnRoute">{{
                            t('adminZone')
                        }}
                    </RouterLink>
                    <RouterLink v-if="hasAccessToStore" :to="{name: 'store'}" @click="clickOnRoute">{{
                            t('store')
                        }}
                    </RouterLink>
                    <RouterLink v-if="hasAccessToStore" :to="{name: 'userOrders'}" @click="clickOnRoute">{{
                            t('myOrders')
                        }}
                    </RouterLink>
                </div>
                <v-btn v-if="isLoggedIn" @click="clickOnLogout">{{ t('logout') }}</v-btn>
            </div>

            <div class="bottomContent">
                <CsSelectLocale/>
                <CsSelectCurrency v-if="hasAccessToStore"/>
            </div>
        </div>
    </v-overlay>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "../../pinia/global/GlobalStore.ts";
import {computed} from "vue";
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {useI18n} from "vue-i18n";
import useUser from "../../compositionfunctions/user.ts";
import router from "../../router/router.ts";
import useCustomer from "../../compositionfunctions/customer.ts";
import {useStoreStore} from "../../pinia/store/StoreStore.ts";
import CsSelectLocale from "./CsSelectLocale.vue";
import CsSelectCurrency from "./CsSelectCurrency.vue";

const globalStore = useGlobalStore();
const userStore = useUserStore();

const {t} = useI18n({useScope: 'global'});
const {isLoggedIn, isAdminStore} = useUser();
const {firstColor} = useCustomer();
const storeStore = useStoreStore();

const hasAccessToStore = computed(() => storeStore.getHasAccessToStore);

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
};


</script>


<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlayContent {
    display: flex;
    height: 90vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.topContent {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

.bottomContent {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
}
</style>