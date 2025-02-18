<template>
    <v-input v-model="localModelValue" #default="{isDisabled}" :hide-details="hideDetails" :label="label" :name="name"
             :rules="rules">
        <editor v-model="localModelValue" :aria-label="label" :disabled="disabled || isDisabled.value"
                :init="initTinyMce" :name="name"/>
    </v-input>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import Editor from '@tinymce/tinymce-vue';
import useRules from "../../compositionfunctions/rules.ts";

const props = defineProps({
    name: {
        type: String,
        required: false
    },
    modelValue: {
        required: true
    },
    disabled: {
        type: Boolean,
        required: false
    },
    hideDetails: {
        type: Boolean,
        required: false,
        default: false
    },
    mandatory: {
        type: Boolean,
        required: false,
        default: false
    },
    label: {
        type: String,
        required: false
    }
});


const emit = defineEmits(['update:modelValue']);

const {notEmpty} = useRules();

const localModelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const rules = ref([]);
if (props.mandatory) {
    const notEmptyRule = notEmpty(props.label);
    rules.value.push(notEmptyRule);
}


const initTinyMce = {
    resize: true,
    width: '100%',
    plugins: "link",
    convert_urls: false,

    // Theme options
    toolbar: ["cut copy paste pastetext | bold italic underline strikethrough | bullist numlist | alignleft aligncenter alignright alignjustify | outdent indent",
        "formatselect fontselect fontsizeselect | forecolor backcolor | subscript superscript | removeformat | link"],

    // Options
    entityEncoding: "raw",
    contextmenu: false,
    cleanup: true,
    menubar: "",
    statusbar: false,
    cleanupOnStartup: true,
    insertdatetimeDateformat: "%d-%m-%Y",
    insertdatetimeTimeformat: "%H:%M:%S",
    relativeUrls: false,
    pluginInsertdateTimeFormat: "%H:%M:%S",

    language: 'fr_FR',
};
</script>

<style scoped>

</style>