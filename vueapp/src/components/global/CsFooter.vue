<template>
    <footer>
        <div class="selectLanguage">
            <v-btn v-for="availableLocale of availableLocales" @click="selectLang(availableLocale)"
                   :key="availableLocale">
                {{ t(`locale.${availableLocale}`) }}
            </v-btn>
        </div>
    </footer>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useCustomerStore} from "../../pinia/customer/CustomerStore.ts";
import {computed} from "vue";

const {t, availableLocales, locale} = useI18n({useScope: 'global'});
const customerStore = useCustomerStore();
const firstColor = computed(() => customerStore.getFirstColorHex);

const selectLang = (value: any) => {
    locale.value = value;
}
</script>

<style scoped>
footer {
    padding: 10px;
    border-top: solid 1px v-bind(firstColor);
}
</style>