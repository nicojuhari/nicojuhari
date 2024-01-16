<script setup>
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';

//state
const { menu } = storeToRefs(useMenuStore())

const router = useRouter();

//delete menu from local
const isModalDeleteOpen = ref(false)
const deleteMenu = () => {
    let menu_uid = menu.value.menu_uid
    removeMenuFromLocalStorage(menu_uid)

    setTimeout(() => {
        router.push('/')
    }, 600)
   
}

//import menu
const importLoading = ref(false)
const importMenu = () => {
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.click();

    input.onchange = () => {
        importLoading.value = true;
        const file = input.files[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            const content = readerEvent.target.result;
            const importMenu = JSON.parse(content);

            updateMenu(importMenu);

            setTimeout(() => {
                importLoading.value = false;
            }, 1400);
        }
    }

    
}

const updateMenu = (importMenu) => {
    menu.value.products = importMenu.products;
    menu.value.categories = importMenu.categories;
    menu.value.bundles = importMenu.bundles;
    menu.value.configs = importMenu.configs;
    menu.value.allergens = importMenu.allergens;
    menu.value.promos = importMenu.promos;
}

//export menu
const downloadLoading = ref(false);
const downloadMenu = () => {
    downloadLoading.value = true;

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(menu.value)], { type: `text/json` }));
    a.download = '1FoodMenu_' + menu.value.menu_uid + '.json';
    a.click();

    setTimeout(() => {
        downloadLoading.value = false;
    }, 1400);
}


</script>
<template>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <UCard :ui="{ 'body': { 'base': 'flex flex-col h-full' } }">
            <div class="font-bold text-lg mb-2">Export menu</div>
            <div class="text-sm mb-8">
               Export the menu so it can be imported into our app later or as a backup.
            </div>
            <div class="border bg-slate-100 p-10 rounded flex cursor-pointer relative mt-auto" @click.prevent="downloadMenu">
                <Loading v-if="downloadLoading" class="m-auto !border-t-gray-500"/>
                <UIcon v-else name="i-ph-download-simple-light" class="m-auto w-14 h-14 text-brand-primary"></UIcon>
            </div>
        </UCard>
        <UCard :ui="{ 'body': { 'base': 'flex flex-col h-full' } }">
            <div class="font-bold text-lg mb-2">Import menu</div>
            <div class="text-sm"> Import a menu that you exported as a.json file from our app.</div>
            <div class="text-brand-error text-sm mb-8">You cannot import other types of files (such as PDF) or menus.</div>
            <div class="border bg-slate-100 p-10 rounded flex cursor-pointer relative mt-auto" @click.prevent="importMenu">
                <Loading v-if="importLoading" class="m-auto !border-t-gray-500"/>
                <UIcon v-else name="i-ph-upload-simple-light" class="m-auto w-14 h-14 text-brand-primary"></UIcon>
            </div>
        </UCard>
        <UCard>
               <div class="font-bold text-lg text-brand-error mb-2">Danger zone </div>
               <div class="text-sm">You can delete your <strong>FREE</strong> menu, which has been saved in this browser.</div>
               <div class="text-sm mb-8">Before you delete it, please make a backup (export your menu). </div>
               <UButton @click="() => isModalDeleteOpen = true" color="brand-red">Delete</UButton>
               <UModal v-model="isModalDeleteOpen">
                    <div class="p-8 flex flex-col gap-6">
                        <div>Would you like to delete the menu?</div>
                        <div class="flex gap-4 items-center justify-end">
                            <UButton color="brand-blue" class="px-10" @click.prevent="() => isModalDeleteOpen = false">No</UButton>
                            <UButton color="brand-red" class="px-10" @click.prevent="deleteMenu">Yes</UButton>
                        </div>
                    </div>
                </UModal>
            </UCard>
    </div>
</template>