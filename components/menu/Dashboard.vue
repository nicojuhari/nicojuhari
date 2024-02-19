<script setup>
import { useMenuStore } from '~/store/menu';

// definePageMeta({
//     layout: 'menu'
// })

// prepare the menu
const { fetchMenu, resetMenu } = useMenuStore()

const { menu_uid } = useRoute().query
// const menuUid = Array.isArray(menu_uid) ? menu_uid[0] : menu_uid;

await fetchMenu(menu_uid);

//reset on leave
onBeforeUnmount(() => resetMenu())
//update query
const router = useRouter()
const updateQuery = (newView) => {
    router.replace({
        query: {
            ...router.currentRoute.value.query,
            view: newView
        }
    })
}

const links = [
    {
        label: 'All Menus',
        // icon: 'i-ph-house-light',
        to: '/tools/free-menu-maker'
    },
    {
        label: 'Dashboard',
        icon: 'i-ph-house-light',
        click: () => updateQuery('')
    },
    {
        label: 'Categories',
        icon: 'i-ph-squares-four-light',
        click: () => updateQuery('categories')
    },
    {
        label: 'Products',
        icon: 'i-ph-list-bullets-light',
        click: () => updateQuery('products')
    },
    {
        label: 'Allergens',
        icon: 'i-ph-grains-slash-light',
        click: () => updateQuery('allergens')
    },
    {
        label: 'Free Designs',
        icon: 'i-ph-layout-light',
        click: () => updateQuery('designs')
    },
    {
        label: 'Settings',
        icon: 'i-ph-gear-light',
        click: () => updateQuery('settings')
    }
]

</script>
<template>
    <MenuHorizontalMenu/>
    <MenuPagesCategories v-if="$route.query.view == 'categories'"></MenuPagesCategories>
    <MenuPagesProducts v-else-if="$route.query.view == 'products'"></MenuPagesProducts>
    <MenuPagesAllergens v-else-if="$route.query.view == 'allergens'"></MenuPagesAllergens>
    <MenuPagesDesigns v-else-if="$route.query.view == 'designs'"></MenuPagesDesigns>
    <MenuPagesSettings v-else-if="$route.query.view == 'settings'"></MenuPagesSettings>
    <MenuPages v-else></MenuPages>
</template>