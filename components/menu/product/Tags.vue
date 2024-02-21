<script setup>
const props = defineProps({
    modelValue: {
        type: Array,
        default: []
    }
})

const emit = defineEmits(['update:modelValue'])

const tags = ref([...props.modelValue]);
const newTag = ref("");

const addTag = () => {
    const tag = newTag.value.trim()
    if (!tag) return;

    if (tags.value.includes(tag)) {
        handleDuplicate(tag)
        return
    }

    tags.value.push(tag)
    emit("update:modelValue", tags.value)
    newTag.value = ""
}

const removeTag = (index) => {
    tags.value.splice(index, 1)
    emit("update:modelValue", tags.value)
}

const duplicate = ref(false)

const handleDuplicate = (tag) => {
    duplicate.value = true
    setTimeout(() => {
        duplicate.value = false
    }, 1000)
}
</script>

<template>
    <div class="tag-input relative">
        <input v-model="newTag" type="text" class="input-text" @keyup.enter="addTag" @keyup.tab="addTag">

        <div class="formkit-help">
            Write the text and press Enter
        </div>

        <div v-if="duplicate" class="text-sm mt-2 text-green">
            This tag already exists
        </div>

        <div v-if="tags.length" class="flex gap-2 overflow-x-auto mt-2 pb-3">
            <span v-for="(tag, index) in tags" :key="tag"
                class="flex items-center gap-2 pl-3 pr-2 py-2 bg-green-400 bg-opacity-10 rounded-lg flex-shrink-0 cursor-pointer"
                :class="{ 'duplicate': tag === duplicate }" @click="removeTag(index)">
                {{ tag }}
                <UIcon name="i-ph-x"/>
            </span>
        </div>
    </div>
</template>
