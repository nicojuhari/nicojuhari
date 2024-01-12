<script setup lang="ts">
import { ref, watch } from 'vue';

const user = useUser()
const { getUserToken } = useAuth()

//from Local Storage
const allMenus = ref(JSON.parse(localStorage.getItem('oneFoodMenu') || '[]'));

//from Database
const { data, error, pending } = useFetch(`/api/menu/${user.value?.uid }`, {
    headers: { 'Authorization': await getUserToken() } as {}
})

watch(data, () => { allMenus.value = [...allMenus?.value, ...data?.value as [] ]})

watch(error, () => {
    console.log(error.value)
})

</script>
<template>
    <div class="mt-16 w-full mx-auto max-w-4xl">
        <div class="flex flex-col lg:flex-row gap-4 mb-4 items-center justify-between">
            <h1>Your Menus</h1>
        </div>
        <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <UCard class="grid place-items-center cursor-pointer hover:bg-gray-100 duration-300 h-60"
                @click="$router.push('/menu/new')">
                <div class="h-full flex gap-2 flex-row lg:flex-col items-center text-brand-primary justify-center">
                    <UIcon name="i-ph-plus" class="w-12 h-12" />
                    Add menu
                </div>
            </UCard>
            <NuxtLink :to="`/menu/${item.menu_uid}`" v-for="item in allMenus" :key="item.menu_uid">
                <UCard :ui="{ 'body': { 'base': 'flex flex-col h-full' } }" class="h-60 relative hover:bg-gray-100 duration-300">
                    <h2 class="title text-xl flex-shrink-0 truncate text-ellipsis justify-center text-center mt-4 capitalize">{{
                        item.configs.title }}</h2>
                    <div class="grid grid-cols-2 gap-2 text-center m-auto w-full">
                        <div class="my-4">
                            <div class="text-gray-500">Categories</div>
                            <div class="mt-4 font-bold text-lg">{{ item.categories.length }}</div>
                        </div>
                        <div class="my-4">
                            <div class="text-gray-500">Products</div>
                            <div class="mt-4 font-bold text-lg">{{ item.products.length }}</div>
                        </div>
                    </div>
                    <div class="mt-auto">
                        <UTooltip text="Your Plan">
                            <UBadge v-if="item.isFromLocal" size="xs">Free</UBadge>
                            <UBadge v-else size="xs" color="orange">Pro</UBadge>
                        </UTooltip>
                    </div>
                </UCard>
            </NuxtLink>
            <div v-if="pending"
                class="grid place-items-center cursor-pointer bg-gray-100 duration-300 h-60 rounded relative">
                <Loading class="!border-t-gray-300" />
            </div>
        </div>
    </div>
</template>