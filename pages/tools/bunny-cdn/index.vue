<script setup>
// definePageMeta({
//     layout: 'bunny'
// })

const showModal = ref(false);

</script>
<template>
    <div>
        <BunnyHero/>
        <BunnyStorageList v-if="storageZones?.length"/>
        <!-- <HomeHero />
        <BunnyStorageList v-if="storageZones?.length" /> -->

        <div class="container py-6" v-else>
            <div class="text-center py-6">
                <div class="mb-4">To get started, enter your <a href="https://bunny.net?ref=kw3bknywrh" target="_blank" rel="nofollow"
                        class="font-medium">Bunny.net</a> API key and fetch your storages.</div>
                <UButton color="brand" size="md" variant="outline" @click="showModal = true">
                    <Icon name="ph:key-light" class="w-6 h-6" />
                    Configure your Storage
                </UButton>
            </div>
        </div>
        <div class="container py-6">
            <div class="subtitle text-center">How it works</div>
            <div class="text-lg mt-8">
                <ol class="flex flex-col gap-2 text-md list-decimal list-inside">
                    <li>This app is <strong>FREE</strong> to use, but check <a
                            href="https://bunny.net/pricing/?ref=kw3bknywrh" target="_blank" class="font-medium" rel="nofollow">Bunny.net
                            prices.</a></li>
                    <li>Your monthly bandwidth is used up by downloading and viewing the files.</li>
                    <li>Nobody online can access your configuration data or API key because they are saved in your
                        browser.</li>
                    <li>For your security, you can refresh your API key in the bunny.net dashboard at any time.</li>
                </ol>
            </div>
        </div>

        <UModal v-model="showModal" class="custom-class">
            <BunnyModalsStorageConfig @close="showModal = false" />
        </UModal>
    </div>
</template>