<template>
    <div class="content">
        <h2>{{ t('Newsletter') }}</h2>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: "global"});

</script>

<style scoped>
.content {
    padding: 10px;
}
</style>