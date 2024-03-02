<template>
    <div v-if="isAdminStore" class="adminZone">
        <h1>{{ t('adminZone') }}</h1>
        <CsProductForm/>

    </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "../../pinia/user/UserStore.ts";
import {useI18n} from "vue-i18n";
import CsProductForm from "../admin/product/CsProductForm.vue";

const {isAdminStore} = useUserStore();
const {t} = useI18n({useScope: 'global'});

</script>

<style scoped>
.adminZone {
    padding: 10px;
}

.window {
    padding-bottom: 10px;
}

</style>