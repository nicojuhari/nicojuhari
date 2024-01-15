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
    <header class="border-b bg-white sticky top-0 z-30 h-14 flex items-center">
        <div class="container flex items-center justify-between gap-6 h-full">
            <div class="flex flex-shrink-0 items-center gap-4">
                <UButton v-if=isOpen class="lg:hidden" color="gray" variant="soft" icon="i-ph-x"/>
                <UButton v-else @click="$emit('open-nav')" class="lg:hidden" color="gray" variant="soft" icon="i-ph-list"/>
                <NuxtLink to="/" class="flex-shrink-0 flex gap-2 items-center">
                    <img src="/logo.svg" class="w-14" />
                </NuxtLink>
            </div>
            <div class="flex gap-2 items-center">
                <UInput 
                :value="menu?.configs?.title"
                @input="handleUpdateTitle" ></UInput>
                <UDropdown :items="items" mode="hover" :popper="{ placement: 'bottom-start' }">
                    <UIcon name="i-ph-gear-six-light" class="w-6 h-6"></UIcon>
                    <!-- <template #logout>
                    <div class="text-brand-error" @click="logout">Logout</div>
                </template> -->
                </UDropdown>

            </div>
            
        </div>
    </header>
</template>