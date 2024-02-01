<script setup>
import { ref } from "vue"
import useStorageZones, { storageZones, accountAPIkey } from "../../composables/useStorageZones";
const { getStorageZones } = useStorageZones()
const isLoading = ref(false);

const deleteStorage = (id) => {
    let storageObj = storageZones.value.find((obj) => obj.Id == id)
    if (storageObj) {
        let idx = storageZones.value.indexOf(storageObj)
        storageZones.value.splice(idx, 1);
    }
}

const deleteAllStorages = () => {
    storageZones.value = null
    accountAPIkey.value = null
}

const refreshStorageFiles = async () => {
    isLoading.value = true
    // storageZones.value = null
    await getStorageZones(accountAPIkey.value)
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
}
</script>
<template>
    <div class="container my-20">
        <h2 class="text-center my-6 text-xl font-medium">Your Storages</h2>
        <div class="flex flex-col md:flex-row gap-6">
            <UButton variant="outline" @click="refreshStorageFiles">
                <Icon name="ph:arrow-counter-clockwise-light" class="w-6 h-6 -scale-x-100" />
                <span>Refresh Storages</span>
            </UButton>
            <UButton color="red" @click="deleteAllStorages">
                <Icon name="ph:trash-light" class="w-6 h-6" />
                <span>Remove all</span>
            </UButton>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <UCard v-for="storage in storageZones">
                <div class="flex justify-center items-center flex-col gap-6">
                    <div class="text-center font-medium text-2xl truncate">{{ storage.Name }}</div>
                    <div class="text-center flex justify-between gap-6 w-full">
                        <div class="flex flex-col w-1/2 items-center"><span class="text-sm">Files</span><strong>{{
                            storage.FilesStored }}</strong></div>
                        <div class="flex flex-col w-1/2 items-center"><span class="text-sm">Size</span><strong>{{
                            (storage.StorageUsed / (1000 * 1000 * 1000)).toFixed(4) }} GB</strong></div>
                    </div>
                    <div class="flex justify-between items-center w-full shrink-0">
                        <UButton color="red" square variant="soft" @click="deleteStorage(storage.Id)" icon="i-ph-trash-light">
                        </UButton>
                        <UButton size="md" color="teal" variant="outline" class="shrink-0" :to="`/bunny-cdn/${storage.Id}`">
                            View</UButton>
                    </div>
                </div>
            </UCard>
        </div>
        <Loading v-if="isLoading" />
    </div>
</template>