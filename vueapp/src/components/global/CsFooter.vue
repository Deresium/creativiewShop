<template>
    <footer>

    </footer>
</template>

<script lang="ts" setup>
import useCustomer from "../../compositionfunctions/customer.ts";

const {firstColor} = useCustomer();
</script>

<style scoped>
footer {
    padding: 10px;
    border-top: solid 1px v-bind(firstColor);
}
</style>