<script setup>
import { computed } from "vue"
// import { checkFileType } from "../../utils";

const props = defineProps({
    fileName: {
        required: true,
        type: String
    },
    baseURL: {
        default: '',
        type: String
    },
    fileUrl: {
        type: String,
        default: ''
    },
    fileExtension: {
        type: String,
        default: ''
    }
})

const fileType = checkFileType(props.fileName, props.fileExtension)
const classNames = "w-full h-full object-cover aspect-square border rounded grid place-items-center"

const fileSrc = computed(() => {
    if (props.fileUrl) return props.fileUrl
    return `${props.baseURL}${props.fileName}`
})

</script>
<template>
    <img v-if="fileType == 'image'" :class="classNames" :src="fileSrc" />
    <video v-if="fileType == 'video'" :class="classNames" autoplay="" muted="" playsinline="" loop="">
        <source :src="fileSrc">
    </video>
    <audio v-if="fileType == 'audio'" :class="classNames" class="p-2" muted="true" controls>
        <source :src="fileSrc">
    </audio>
    <div v-if="fileType == 'pdf'" :class="classNames" class="p-2">
        <div class="text-2xl p-2">PDF</div>
        <div class="truncate text-center text-md w-full">{{ fileName }}</div>
    </div>
    <div v-if="!fileType && fileName" :class="classNames">
        <div>This file type is not supported by our app!!! </div>
        <div class="truncate text-center text-md w-full">{{ fileName }}</div>
    </div>
</template>