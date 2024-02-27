<template>
    <slot :isHover="isHover" :on="props"></slot>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const isHover = ref(false);
let counterHandler = ref(0);
const emit = defineEmits(['dropFile']);


const dragEnterHandler = (event: any) => {
    event.preventDefault();
    counterHandler.value++;
    isHover.value = true;
};

const dragLeaveHandler = (event: any) => {
    event.preventDefault();
    counterHandler.value--;
    if (counterHandler.value === 0) {
        isHover.value = false;
    }
};

const dropHandler = (event: any) => {
    event.preventDefault();
    isHover.value = false;
    counterHandler.value = 0;
    emit('dropFile', event.dataTransfer);
};

const dragoverHandler = (event: any) => {
    event.preventDefault();
};

const props = {
    dragenter: dragEnterHandler,
    dragleave: dragLeaveHandler,
    drop: dropHandler,
    dragover: dragoverHandler
}

</script>


<style scoped>

</style>