<script setup>

const { logout } = useAuth();   
const router = useRouter();
const menuItems = [
    [
        {
            label: 'My Account',
            click: () => router.push('/user/profile')
        }, 
    ],
    [
        {
            label: 'Logout',
            click: () => logout(),
            class: 'text-brand-red-600'
        }
    ],
]

</script>
<template>
    <header class="border-b bg-white sticky top-0 z-30 h-14 flex items-center">
        <div class="container flex items-center justify-between gap-6 h-full">
            <div class="flex flex-shrink-0 items-center gap-6">
                <NuxtLink to="/" class="flex-shrink-0 flex gap-2 items-center">
                    <img src="/logo.svg" class="w-14" />
                </NuxtLink>
            </div>
            <UDropdown :items="menuItems" :popper="{ placement: 'bottom-start' }">
                        <UIcon name="i-ph-user-circle-light" class="w-8 h-8"></UIcon>
                        <!-- <template #logout>
                            <div class="text-brand-error" @click="logout">Logout</div>
                        </template> -->
            </UDropdown>
        </div>
    </header>
</template>