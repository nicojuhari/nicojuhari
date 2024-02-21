<script setup>
import { ref } from 'vue'

const { getStorageZones } = useStorageZones()
const emit = defineEmits(['close'])
const isLoading = ref(false)

const storageApiKey = ref('')
const fetchSuccess = ref(true)

const connectToStorage = async () => {
    isLoading.value = true
    fetchSuccess.value = await getStorageZones(storageApiKey.value)
    isLoading.value = false
    if (fetchSuccess.value) {
        emit('close')
    }
}
</script>
<template>
    <div class="p-4">
        <div class="flex justify-between">
            <div class="font-medium">Enter your Bunny.net API Key</div>
            <Icon name="ph:x-light" class="w-6 h-6 shrink-0 ml-auto cursor-pointer" @click="$emit('close')"/>
        </div>
        <div class="mt-6">
            <UInput label="API key" type="text" class="w-full outline-none" v-model="storageApiKey" />
            <div class="text-sm text-gray-500 my-2">Bunny.net Dashboard => Account => Settings</div>
        </div>
        <div class="alert alert-red text-sm" v-if="!fetchSuccess">Couldn't fetch, please check your API key and try again
        </div>
        <a class="flex items-center gap-2 my-4 text-blue-500" href="https://dash.bunny.net/account/settings?ref=kw3bknywrh"
            target="_blank">Get your API key from bunny.net dashboard
            <Icon name="ph:arrow-fat-lines-right-light" class="w-6 h-6" />
        </a>
        <!-- <img src="/get-bunny-api-key.gif" class="max-w-full rounded-lg mt-2 mb-6 border h-auto" /> -->
        <UButton @click="connectToStorage"
            :disabled="storageApiKey.length < 50">Connect</UButton>
        <Loading v-if="isLoading" />
    </div>
</template>