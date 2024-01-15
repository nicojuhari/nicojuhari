<script setup>
    import { useMenuStore } from '~/store/menu';

    definePageMeta({
        layout: 'menu'
    })

    // prepare the menu
    const { fetchMenu, resetMenu } = useMenuStore()

    const { menu_uid } = useRoute().params
    fetchMenu(menu_uid);

    //reset on leave
    onBeforeUnmount(() => resetMenu())
</script>
<template>
    <div class="my-4">
        <NuxtPage :menu_uid="menu_uid"></NuxtPage>
    </div>
</template>