<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useMenuStore } from '~/store/menu'

    defineEmits(['open-nav'])
    defineProps(['isOpen'])

    const { menu } = storeToRefs(useMenuStore())
    const handleUpdateTitle = (ev: { target: { value: string; }; }) => {
        if(menu.value) menu.value.configs.title = ev.target.value
    }

    const items = [
        [
            { label: 'Import' },
            { label: 'Export' }
        ]
    ]


</script>
<template>
    <header class="bg-white border-b sticky top-0 z-30 h-14 flex items-center">
        <div class="container flex items-center justify-between gap-6 h-full">
            <div class="flex flex-shrink-0 items-center gap-4">
                <UButton @click="$emit('open-nav')" class="md:hidden" color="gray" variant="soft" icon="i-ph-list"/>
                <UInput 
                    :value="menu?.configs?.title"
                    @input="handleUpdateTitle"></UInput>
                <UTooltip text="Your Plan">
                                <UBadge v-if="menu?.isFromLocal" size="xs">Free</UBadge>
                                <UBadge v-else size="xs" color="orange">Pro</UBadge>
                            </UTooltip>
            </div>
            <div class="flex gap-2 items-center">
                
                <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                    <UIcon name="i-ph-gear-light" class="w-6 h-6"></UIcon>
                    <!-- <template #logout>
                    <div class="text-brand-error" @click="logout">Logout</div>
                </template> -->
                </UDropdown>

            </div>
            
        </div>
    </header>
</template>