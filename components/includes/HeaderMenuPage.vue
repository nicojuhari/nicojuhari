<script setup lang="ts">
    defineEmits(['open-nav'])
    defineProps(['isOpen'])
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
            <UDropdown :items="menuItems" mode="hover" :popper="{ placement: 'bottom-start' }">
                <UIcon name="i-ph-user-circle-light" class="w-8 h-8"></UIcon>
                <template #logout>
                    <div class="text-brand-error" @click="logout">Logout</div>
                </template>
            </UDropdown>
        </div>
    </header>
</template>