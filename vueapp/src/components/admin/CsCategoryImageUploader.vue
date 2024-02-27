<template>
    <DragHover @drop-file="handleDrop">
        <template #default="{isHover, on}">
            <label :class="{dragHover: isHover}" v-on="on">
                <template v-if="successLoad">
                    <img :src="srcImage" alt="image category" class="imageLoaded" @error="handleFailed"/>
                </template>
                <template v-if="!successLoad">
                    <span class="card">
                        <v-icon icon="mdi-image" size="50px"/>
                        <span>{{ t('upload') }}</span>
                    </span>
                </template>
                <input type="file" @change="handleChange"/>
            </label>
        </template>
    </DragHover>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import axiosServer from "../../axios/axiosServer.ts";
import DragHover from "../global/DragHover.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});

const props = defineProps({
    categoryId: {
        type: String,
        required: true
    }
});

const srcImage = computed(() => `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/category/${props.categoryId}?refresh=${refreshImg.value}`);
const successLoad = ref(true);
const refreshImg = ref(0);

const handleFailed = () => {
    successLoad.value = false;
};

const handleChange = async (event: any) => {
    const file: File = event.target.files[0];
    await sendImageToServer(file);
};

const handleDrop = async (dataTransfer: DataTransfer) => {
    await sendImageToServer(dataTransfer.files[0]);
};

const sendImageToServer = async (file: File) => {
    if (!file) {
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);
        await axiosServer.put(`/category/image/${props.categoryId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        refreshImg.value++;
        successLoad.value = true;
    } catch (error) {
        alert('Une erreur est survenue');
    }
};

</script>

<style scoped>
input[type="file"] {
    display: none;
}

.imageLoaded {
    max-width: 90vw;
    max-height: 90vh;
}

.dragHover {
    color: red;
}

label, span {
    display: block;
}

.card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px grey;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

p {
    font-size: x-large;
}
</style>