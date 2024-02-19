<script setup lang="ts">

type MenuItem = {
    id: string,
    label: string,
    iconName: string,
    badge?: string
}

//update query
const router = useRouter()
const updateQuery = (newView: string) => {
    router.replace({
        query: {
            ...router.currentRoute.value.query,
            view: newView
        }
    })
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
        id: 'settings',
        label: 'Settings',
        iconName: 'i-ph-gear-light'
    }
]

const activeView = computed(() => {
    return router.currentRoute.value.query?.view
})

</script>
<template>
    <div class="flex border-b mb-4 overflow-y-auto">
        <NuxtLink to="/tools/free-menu-maker" title="Back to all menus" class="cursor-pointer text-sm border-b-2 justify-center font-medium px-4 py-2.5 transition-all duration-200 hover:bg-blue-200 flex border-transparent gap-4 items-center">
            <UIcon name="i-ph-arrow-u-up-left-light"  class="flex-shrink-0 w-5 h-5"/>
             <!-- <span>All menus</span> -->
            
        </NuxtLink>
        <a  @click.prevent="() => updateQuery(item.id)"
            :class="{ 'text-blue-600 border-blue-600': activeView === item.id }"
        class="cursor-pointer text-sm border-b-2 justify-center font-medium px-6 py-2.5 transition-all duration-200 hover:bg-blue-200 flex border-transparent gap-4 items-center flex-shrink-0"
            v-for="item in blocksArray" :key="item.id">
            <UIcon :name="item.iconName" class="flex-shrink-0 w-5 h-5" />
            <span>{{ item.label }}</span>
        </a>
    </div>
</template>