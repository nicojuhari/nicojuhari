<script setup lang="ts">
import { type Menu } from '~/types'
//from Local Storage
const isLoading = ref(false);
const router = useRouter();

const allMenus = ref(JSON.parse(localStorage.getItem('oneFoodMenu') || '[]'));
const newMenuSchema = ref < Menu > ({
    menu_uid: '',
    products: [],
    categories: [],
    allergens: [],
    configs: {
        title: 'Default Menu Title',
    }
})

const createMenu = async () => {
    isLoading.value = true;
    const menuIdLocal = "oneFoodMenu";
    const oneFoodMenu = JSON.parse(localStorage.getItem(menuIdLocal) || "[]");
    const newMenuId = uid();

    newMenuSchema.value.menu_uid = newMenuId;
    newMenuSchema.value.isFromLocal = true;

    oneFoodMenu.push(newMenuSchema.value);
    localStorage.setItem(menuIdLocal, JSON.stringify(oneFoodMenu));

    setTimeout(() => {
        isLoading.value = false;
        router.push(`/tools/free-menu-maker?menu_uid=${newMenuId}&view=dashboard`);
    }, 600);
}
</script>
<template>
    <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
        <UCard class="cursor-pointer hover:bg-gray-100 duration-300 h-60">
            <div class="grid place-items-center h-full">
                <div v-if="!isLoading" class="h-full w-full flex gap-2 flex-row lg:flex-col items-center text-brand-primary justify-center" @click="createMenu">
                    <UIcon name="i-ph-plus" class="w-12 h-12" />
                    Add menu
                </div>
                <div v-else class="grid place-items-center cursor-pointer bg-gray-100 bg-opacity-10 duration-300 rounded relative">
                    <Loading class="!border-t-gray-300" />
                </div>
            </div>
        </UCard>
        <NuxtLink :to="`/tools/free-menu-maker?menu_uid=${item.menu_uid}&view=dashboard`" v-for="item in allMenus" :key="item.menu_uid">
            <UCard class="h-60 relative bg-gray-50 hover:bg-gray-100 duration-300">
                <h2 class="text-xl flex-shrink-0 truncate text-ellipsis justify-center text-center mt-4 capitalize">{{
                    item.configs.title }}</h2>
                <div class="grid grid-cols-2 gap-2 text-center m-auto w-full">
                    <div class="my-4">
                        <div class="text-gray-600">Categories</div>
                        <div class="mt-4 font-bold text-lg">{{ item.categories.length }}</div>
                    </div>
                    <div class="my-4">
                        <div class="text-gray-600">Products</div>
                        <div class="mt-4 font-bold text-lg">{{ item.products.length }}</div>
                    </div>
                </div>
            </UCard>
        </NuxtLink>
    </div>
</template>