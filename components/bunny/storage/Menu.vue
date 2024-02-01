<script setup>
import { ref } from "vue"
import useStorageZones, { pullZones, activePullZoneURL } from "../../../composables/useStorageZones";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const { currentPath } = usePath();
const { getStorageFiles } = useStorageZones();

const showCreateFolderModal = ref(false)
const showUploadFileModal = ref(false)

const refreshStorageFiles = () => {
    showCreateFolderModal.value = false
    showUploadFileModal.value = false
    getStorageFiles(currentPath.value)
}

</script>
<template>
    <div class="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
                <UButton @click="showUploadFileModal = true" color="teal">
                    <Icon name="bx:image-add" class="w-6 h-6" />
                    Upload File
                </UButton>
                <UButton @click="showCreateFolderModal = true" color="orange">
                    <Icon name="bx:bxs-folder-plus" class="w-6 h-6" />
                    Create a Folder
                </UButton>
                <UButton @click="refreshStorageFiles" variant="outline">
                    <Icon name="bx:refresh" class="w-6 h-6" />
                    Refresh
                </UButton>
                <USelect class="select md:max-w-[200px] h-9" v-model="activePullZoneURL" :options="pullZones">
                </USelect>
                <div class="form-control ml-auto flex gap-4 items-center shrink-0 cursor-pointer">
                    <UCheckbox :value="modelValue" id="show-images" class="cursor-pointer" @change="(e) => emit('update:modelValue', !modelValue)"/>
                    <label for="show-images" class="cursor-pointer">Show Images</label>
                </div>
            </div>
            <UModal v-model="showCreateFolderModal">
                <BunnyModalsCreateFolder @close="showCreateFolderModal = false" @uploaded="refreshStorageFiles"/>
            </UModal>
            <UModal v-model="showUploadFileModal">
                <BunnyModalsUploadFile @close="showUploadFileModal = false" @uploaded="refreshStorageFiles"/>
            </UModal>
</template>