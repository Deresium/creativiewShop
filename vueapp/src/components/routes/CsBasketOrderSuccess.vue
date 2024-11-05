<template>
    <v-alert :text="t('basketOrder.success')" type="success"/>
    <v-alert v-if="isPaypalMe" class="paypalInfo" type="info">
        <h3>{{ t('paypalMeInfo') }}</h3>
        <p>{{ t('paypalMe.content') }}</p>
        <a :href="paypalURL" class="linkPaypal" target="_blank">{{ paypalURL }}</a>
    </v-alert>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {computed} from "vue";

const {t} = useI18n({useScope: "global"});
const route = useRoute();

const paypalURL = computed(() => {
    if (typeof route.query.paypalURL === 'string') {
        return route.query.paypalURL;
    }
    return '';
});

const paymentMethod = computed(() => {
    if (typeof route.query.paymentMethod === 'string') {
        return route.query.paymentMethod;
    }
    return '';
});

const isPaypalMe = computed(() => paymentMethod.value && paymentMethod.value === 'PAYPAL_ME');


</script>

<style scoped>
.linkPaypal {
    color: white;
    text-decoration: none;
}

.paypalInfo {
    margin-top: 10px;
}

</style>