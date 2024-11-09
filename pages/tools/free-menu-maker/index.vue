
<script setup>

    useHead({
        title: 'Free Digital Menu Maker: Create & Customize Your Menu Online',
        meta: [
            { name: 'description', content: 'Get your restaurant noticed! Design a stunning free digital menu online in minutes. No design skills needed. Easy to customize, mobile-friendly. Try it now!' }
        ],
    })

   const showPopup = ref(true);

    onMounted(() => {
        setTimeout(() => {
            showPopup.value = true;
        }, 1000);
    });

</script>   
<template>
    <div class="container py-10">
        <ClientOnly v-if="$route.query.menu_uid">
            <MenuDashboard></MenuDashboard>
        </ClientOnly>
        <template v-else>
            <div class="mb-10 md:mb-14 text-center">
                <h1 class="font-bold text-3xl mb-2">Design Your Free Digital Menu Online</h1>
                <h2 class="mb-8 text-lg font-normal">Create a professional menu for your restaurant, bar, or cafe in minutes!</h2>
            </div>
            <ClientOnly>
                <MenuList></MenuList>
            </ClientOnly>
            <MenuToolDescription></MenuToolDescription>
        </template>
    </div>
    <UModal v-model="showPopup">
        <UCard>
             <template #header>
                <div class="flex items-center justify-between">
                    <div class="text-xl font-bold">Depricated</div>
                    <UIcon name="i-ph-x" class="w-6 h-6 cursor-pointer" @click="showPopup = false" />
                </div>
            </template>
            <p>The Free Menu Maker app is being depricated soon.<br>Please, save your menu and use <a href="https://1food.menu" class="text-blue-500">1FoodMenu</a> instead.</p>
        </UCard>
    </UModal>
</template>