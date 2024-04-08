<template>
    <div class="category">
        <v-checkbox v-model="checkCategory" :hide-details="true" :label="categoryName" density="compact"/>
        <div v-if="category.getChildrenCategories().length >= 1" class="childrenCategories">
            <CsStoreFilter
                v-for="children in category.getChildrenCategories()"
                :key="children.getCategoryId()"
                :base-selection="baseSelection"
                :category="children"
                :parent-checked="checkCategory"
                @value-change="childrenValueChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import CategoryVM from "../../viewmodels/CategoryVM.ts";
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";

const {locale} = useI18n({useScope: 'global'});

const props = defineProps({
    category: {
        type: CategoryVM,
        required: true
    },
    parentChecked: {
        type: Boolean,
        required: false
    },
    baseSelection: {
        type: Map<string, string>,
        required: true
    }
});

const emit = defineEmits(['valueChange']);

const checkCategory = ref(false);
const categoryName = ref(props.category.getNameEn());

if (props.baseSelection.get(props.category.getCategoryId())) {
    checkCategory.value = true;
}

watch(locale, () => {
    if (locale.value === 'fr') {
        categoryName.value = props.category.getNameFr();
    } else {
        categoryName.value = props.category.getNameEn();
    }
}, {immediate: true});

watch(() => props.parentChecked, () => {
    checkCategory.value = props.parentChecked
});

watch(checkCategory, () => {
    emit('valueChange', checkCategory.value, props.category.getCategoryId());
});

const childrenValueChange = (check: boolean, categoryId: string) => {
    emit('valueChange', check, categoryId);
};
</script>

<style scoped>
.childrenCategories {
    margin-left: 10px;
    margin-bottom: 10px;
}
</style>