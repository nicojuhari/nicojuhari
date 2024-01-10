<script setup lang="ts">
const { logout } = useAuth();   
const router = useRouter();
const menuItems = [
    [
        {
            label: 'My Account',
            click: () => router.push('/user/profile')
        }, 
        {
            slot: 'logout'
        }
    ],
]

</script>
<template>
    <header class="border-b bg-white sticky top-0 z-20 h-14">
        <div class="container flex items-center justify-between gap-6 py-2">
            <div class="flex flex-shrink-0 items-center gap-6">
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