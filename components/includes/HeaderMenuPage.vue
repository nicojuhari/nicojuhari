<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useMenuStore } from '~/store/menu'

    defineEmits(['open-nav'])
    // defineProps(['isOpen'])

    const { menu, menuChanged, isLoading } = storeToRefs(useMenuStore())
    const { saveMenu } = useMenuStore()


    const handleSave = async () => {
        await saveMenu()
    }

</script>
<template>
        <header class="bg-white border-b sticky top-0 z-30 h-14 flex items-center">
        <div class="container flex items-center justify-between gap-6 h-full">
            <div class="flex flex-shrink-0 items-center gap-4">
                <UButton @click="$emit('open-nav')" class="md:hidden" color="gray" variant="soft" icon="i-ph-list"/>
                <div class="flex items-center gap-2">
                    <div class="text-lg font-medium w-40 truncate">{{  menu?.configs.title }}</div>
                    <UButton :to="`/menu/${$route.params.menu_uid}/settings/general`" square icon="i-ph-pencil-simple-light" variant="link" color="brand-gray" />
                    <UTooltip text="Your Plan" class="hidden sm:block">
                        <UBadge v-if="menu?.isFromLocal" size="xs">Free</UBadge>
                        <UBadge v-else size="xs" color="orange">Pro</UBadge>
                    </UTooltip>
                </div>
            </div>
            <div class="flex gap-2 items-center">
                <UButton v-if="!menu?.isFromLocal" @click="handleSave" :loading="isLoading" :disabled="!menuChanged">Save</UButton>
            </div>
        </div>
    </header>
</template>