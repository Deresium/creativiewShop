<template>
    <DragHover @drop-file="handleDrop">
        <template #default="{isHover, on}">
            <label :class="{dragHover: isHover}" v-on="on">
                <span class="card">
                    <v-icon icon="mdi-image" size="50px"/>
                    <span>{{ t('upload') }}</span>
                </span>
                <input type="file" @change="handleChange"/>
            </label>
        </template>
    </DragHover>
    <div class="picturesGallery">
        <img v-for="pictureId in pictureIds" :key="pictureId" :src="srcImage(pictureId)"
             alt="product image" class="imgGallery"
             @click="handleClickImg(pictureId)"/>
    </div>

    <v-overlay v-if="showOverlay" v-model="showOverlay" class="overlay">
        <div class="overlayContent">
            <img :src="srcImage(selectedImg)" alt="product image" class="imgOverlay"/>
            <v-btn color="red" @click="handleAskDeleteConfirm">{{ t('delete') }}</v-btn>
        </div>

        <v-dialog v-model="askDeleteConfirm">
            <v-card :text="t('confirmDeletePicture.text')" :title="t('confirmDelete.title')">
                <template #actions>
                    <v-btn :loading="loading" @click="handleConfirm">
                        {{ t('confirm') }}
                    </v-btn>
                    <v-btn @click="handleRefuse">
                        {{ t('refuse') }}
                    </v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-overlay>

</template>

<script lang="ts" setup>

import DragHover from "../../global/DragHover.vue";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import axiosServer from "../../../axios/axiosServer.ts";
import {ref} from "vue";

const {t} = useI18n({useScope: "global"});

const {params: {productId}} = useRoute();
const productIdString = String(productId);

const props = defineProps({
    productOptionId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['addPictureSuccess', 'deletePictureSuccess']);

const showOverlay = ref(false);
const selectedImg = ref(null);
const askDeleteConfirm = ref(false);
const loading = ref(false);

const pictureIds = ref(new Array<string>());
axiosServer.get(`/product/${productIdString}/productOption/${props.productOptionId}/image`).then(response => {
    pictureIds.value = response.data;
});

const srcImage = (productOptionPictureId: string) => {
    return `${import.meta.env.VITE_APP_URL_CREATIVIEWSHOP}/api/product/${productIdString}/productOption/${props.productOptionId}/image/${productOptionPictureId}`;
};

const handleClickImg = (pictureId: string) => {
    showOverlay.value = true;
    selectedImg.value = pictureId;
};

const handleAskDeleteConfirm = () => {
    askDeleteConfirm.value = true
};

const handleConfirm = async () => {
    loading.value = true;
    if (!selectedImg.value) {
        return;
    }
    await axiosServer.delete(`/product/${productIdString}/productOption/${props.productOptionId}/image/${selectedImg.value}`);
    askDeleteConfirm.value = false;
    showOverlay.value = false;
    selectedImg.value = null;
    loading.value = false;
    emit('deletePictureSuccess');
};

const handleRefuse = () => {
    askDeleteConfirm.value = false;
};

const handleDrop = async (dataTransfer: DataTransfer) => {
    await sendImageToServer(dataTransfer.files[0]);
};

const handleChange = async (event: any) => {
    const file: File = event.target.files[0];
    await sendImageToServer(file);
};

const sendImageToServer = async (file: File) => {
    if (!file) {
        return;
    }

    if (file.size > 5000000) {
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);
        await axiosServer.post(`/product/${productIdString}/productOption/${props.productOptionId}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        emit('addPictureSuccess');
    } catch (error) {
        alert('Une erreur est survenue');
    }
};
</script>

<style scoped>
input[type="file"] {
    display: none;
}

.dragHover {
    color: red;
}

.card {
    cursor: pointer;
    margin: 30px 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px grey;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.picturesGallery {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    align-items: center;
}

.imgGallery {
    cursor: pointer;
    max-width: 200px;
    max-height: 200px;
}

.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlayContent {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.imgOverlay {
    max-width: 80vw;
    max-height: 80vh;
    margin-bottom: 30px;
}

</style>