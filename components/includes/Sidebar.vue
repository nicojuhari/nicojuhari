<script setup lang="ts">

type MenuItem = {
    id: string,
    label: string,
    iconName: string,
    badge?: string
}

const blocksArray: Array<MenuItem> = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        iconName: 'i-ph-house-light'
    },
    {
        id: 'categories',
        label: 'Categories',
        iconName: 'i-ph-squares-four-light'
    },
    {
        id: 'products',
        label: 'Products',
        iconName: 'i-ph-list-bullets-light'
    },
    {
        id: 'bundles',
        label: 'Bundles',
        iconName: 'i-ph-bounding-box-light',
    },
    {
        id: 'promos',
        label: 'Promos',
        iconName: 'i-ph-percent-light'
    },
    {
        id: 'allergens',
        label: 'Allergens',
        iconName: 'i-ph-grains-slash-light'
    },
    {
        id: 'designs',
        label: 'Free Designs',
        iconName: 'i-ph-layout-light'
    },
    {
        id: 'settings/general',
        label: 'Settings',
        iconName: 'i-ph-gear-light'
    }
]

</script>
<template>
    <aside
        class="bg-[#132335] h-[100dvh] fixed text-white transition-all duration-500 w-64 -translate-x-64 md:translate-x-0 z-40">
        <div class="w-full h-full overflow-y-auto">
            <div class="h-14 px-4 flex items-center justify-between">
                <NuxtLink to="/" class="flex-shrink-0 flex gap-2 items-center">
                    <img src="/logo-white.svg" class="w-14" />
                </NuxtLink>
                <UButton @click.prevent="$emit('close')" class="md:hidden text-white" color="white" variant="soft" icon="i-ph-x"/>
            </div>
            <div class="flex flex-col gap-4 px-2 pt-4">
                <NuxtLink activeClass="bg-brand-primary" :to="`/menu/${$route.params.menu_uid}/${item.id}`" @click.prevent="$emit('close')"  
                class="cursor-pointer text-sm font-medium px-4 py-2.5 transition-all duration-200 hover:bg-white hover:bg-opacity-20 bg-opacity-40 rounded-lg flex gap-4 items-center"
                    v-for="item in blocksArray" :key="item.id">
                    <UIcon :name="item.iconName" class="flex-shrink-0 w-5 h-5" />
                    <span>{{ item.label }}</span>
                </NuxtLink>
            </div>
        </div>
    </aside>
</template>