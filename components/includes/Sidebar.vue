<script setup lang="ts">

type MenuItem = {
    id: string,
    label: string,
    iconName: string,
    badge?: string
}

const blocksArray: Array<MenuItem> = [
    {
        id: '',
        label: 'Main',
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
    // {
    //     id: 'allergens',
    //     label: 'Allergens',
    //     iconName: 'i-ph-grains-slash-light'
    // },
    // {
    //     id: 'bundles',
    //     label: 'Bundles',
    //     iconName: 'i-ph-bounding-box-light',
    //     badge: 'Beta'
    // },
    // {
    //     id: 'free-designs',
    //     label: 'Free Designs',
    //     iconName: 'i-ph-layout-light'
    // },
    // {
    //     id: 'settings',
    //     label: 'Settings',
    //     iconName: 'i-ph-gear-light'
    // }
]

</script>
<template>
    <aside
        class="bg-[#132335] text-white transition-all duration-500 w-64 -translate-x-64 lg:translate-x-0 z-10">
        <div class="w-full sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pb-14">
            <!-- <div class="h-14 px-4 flex items-center justify-center p-4 border-b border-opacity-10 border-white">
                <NuxtLink to="/" class="flex-shrink-0 flex gap-2 items-center">
                    <img src="/logo-white.svg" class="w-14" />
                </NuxtLink>
            </div> -->
            <div class="flex flex-col gap-4 px-4 pt-4">
                <NuxtLink :to="`/menu/${$route.params.menu_uid}/${item.id}`" @click="$emit('close')"
                    class="cursor-pointer text-sm font-medium py-2.5 px-4 transition-all duration-200 hover:bg-white hover:bg-opacity-20 bg-opacity-10 rounded-lg flex gap-2 items-center"
                    v-for="item in blocksArray" :key="item.id"
                    :class="{ 'bg-white': $route.params.sub_page == item.id }">
                    <UIcon :name="item.iconName" class="flex-shrink-0 w-5 h-5" />
                    {{ item.label }}
                    <UBadge v-if="item?.badge" class="ml-auto">{{ item?.badge }}</UBadge>
                </NuxtLink>
            </div>
        </div>
    </aside>
</template>