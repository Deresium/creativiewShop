<template>
    <v-switch v-model="accessLocal" :color="firstColor" :label="t('access')"/>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import axiosServer from "../../axios/axiosServer.ts";
import Debouncer from "../../compositionfunctions/Debouncer.ts";
import useCustomer from "../../compositionfunctions/customer.ts";

const props = defineProps({
    access: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['giveUserAccess', 'removeUserAccess']);

const accessLocal = ref(props.access);

const {t} = useI18n({useScope: 'global'});

const {firstColor} = useCustomer();

const updateUserAccess = async () => {
    await axiosServer.put(`/user/${props.userId}/access`, {
        access: accessLocal.value
    });
    if (accessLocal.value) {
        emit('giveUserAccess');
    } else {
        emit('removeUserAccess')
    }
};

const debounceUpdateAccess = new Debouncer(1000, updateUserAccess);

watch(accessLocal, () => {
    debounceUpdateAccess.debounce();
});
</script>

<style scoped>

</style>