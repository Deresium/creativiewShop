<template>
    <v-select v-model="selectedLocale" :hide-details="true" :items="availableLocalesTitleValues" :label="t('language')"
              density="compact"/>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref, watch} from "vue";
import TitleValueVM from "../../viewmodels/TitleValueVM.ts";
import {useLocale} from "vuetify";

const {t, availableLocales, locale} = useI18n({useScope: 'global'});
const {current} = useLocale();

const localStorageLocale = localStorage.getItem("locale");
const initialValueLocale = localStorageLocale ? localStorageLocale : locale.value;

const selectedLocale = ref(initialValueLocale);

const availableLocalesTitleValues = computed(() => {
    return availableLocales.map(availableLocale => new TitleValueVM(t(`locale.${availableLocale}`), availableLocale));
});

watch(selectedLocale, () => {
    locale.value = selectedLocale.value;
    current.value = selectedLocale.value;
    localStorage.setItem("locale", selectedLocale.value);
}, {immediate: true});

watch(locale, () => {

});

</script>

<style scoped>

</style>