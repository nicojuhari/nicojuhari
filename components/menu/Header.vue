<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'

defineEmits(['open-nav'])
// defineProps(['isOpen'])

const { menu } = storeToRefs(useMenuStore())

</script>
<template>
    <header class="bg-white border-b sticky top-0 z-30 h-14 flex items-center">
        <div class="container flex items-center justify-between gap-6 h-full">
            <div class="flex flex-shrink-0 items-center gap-4">
                <UButton @click="$emit('open-nav')" class="md:hidden" color="gray" variant="soft" icon="i-ph-list" />
                <div class="flex items-center gap-2">
                    <div class="text-lg font-medium w-40 truncate">{{ menu?.configs.title }}</div>
                    <UButton :to="`/free-menu-maker/${$route.params.menu_uid}/settings`" square
                        icon="i-ph-pencil-simple-light" variant="link" color="brand-gray" />
                </div>
            </div>
        </div>
    </header>
</template>