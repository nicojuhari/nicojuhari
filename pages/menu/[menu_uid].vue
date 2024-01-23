<script setup lang="ts">
    import { useMenuStore } from '~/store/menu';

    definePageMeta({
        layout: 'menu'
    })

    // prepare the menu
    const { fetchMenu, resetMenu } = useMenuStore()

    const { menu_uid } = useRoute().params
    const menuUid = Array.isArray(menu_uid) ? menu_uid[0] : menu_uid;

    await fetchMenu(menuUid);

    //reset on leave
    onBeforeUnmount(() => resetMenu())

    //checkout success
    const isCheckoutSuccess = ref(false)
    isCheckoutSuccess.value = useRoute().query.session_id ? true : false
    
</script>
<template>
    <div class="my-4">
        <NuxtPage :menu_uid="menu_uid"></NuxtPage>
    </div>
    <UModal v-model="isCheckoutSuccess">
        <UCard>
            <MenuCheckoutSuccess/>
            <UButton @click.prevent="() => isCheckoutSuccess = false" block class="mt-6">Continue</UButton>
        </UCard>
    </UModal>
</template>