<script setup>
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';

//state
const { menu } = storeToRefs(useMenuStore())

const router = useRouter();

//change menu title


//delete menu from local
const isModalDeleteOpen = ref(false)
const deleteMenu = async () => {
    let menu_uid = menu.value.menu_uid
    removeMenuFromLocalStorage(menu_uid)

    // Redirect
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push('/tools/free-menu-maker')
}

//import menu
const importLoading = ref(false)
const importMenu = async () => {
    try {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.click();

        input.onchange = async () => {
            importLoading.value = true;
            const file = input.files[0];

            // Read file content
            const text = await file.text();
            const importMenu = JSON.parse(text);

            // Validate JSON schema
            // ...

            // Update menu state
            updateMenu(importMenu);

            // Hide loading state
            await new Promise((resolve) => setTimeout(resolve, 1400));
            importLoading.value = false;
        };
    } catch (error) {
        console.error(error);
        // Show error notification
    }
};


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

    // Create blob with menu data
    const menuBlob = new Blob([JSON.stringify(menu.value)], { type: "application/json" });

    // Generate filename with menu ID
    const filename = "menu_" + menu.value.menu_uid + ".json";

    // Create object URL from blob
    const url = URL.createObjectURL(menuBlob);

    // Create anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // Click to trigger download
    a.click();

    // Revoke object URL
    setTimeout(() => {
        URL.revokeObjectURL(url);
        downloadLoading.value = false;
    }, 1400);
}



</script>
<template>
    <div class="grid gap-12 divide-y grid-cols-1 max-w-[600px] pb-10">
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div class="font-bold text-lg mb-2">Menu Title</div>
            <UFormGroup class="m-auto w-full">
                <UInput v-model="menu.configs.title"></UInput>
            </UFormGroup>
        </div>
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 pt-6">
            <div>
                <div class="font-bold text-lg mb-2">Export menu</div>
                <div class="text-sm mb-8">
                    Export the menu so it can be imported into our app later or as a backup.
                </div>
            </div>
            <div class="border bg-slate-100 p-10 rounded flex cursor-pointer relative mt-auto"
                @click.prevent="downloadMenu">
                <Loading v-if="downloadLoading" class="m-auto !border-t-gray-500" />
                <UIcon v-else name="i-ph-download-simple-light" class="m-auto w-14 h-14 text-brand-600"></UIcon>
            </div>
        </div>
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 pt-6">
            <div>
                <div class="font-bold text-lg mb-2">Import menu</div>
                <div class="text-sm mb-2"> Import a menu that you exported as a.json file from our app.</div>
                <div class="text-green text-sm mb-8">You cannot import other types of files (such as PDF) or menus.
                </div>
            </div>
            <div class="border bg-slate-100 p-10 rounded flex cursor-pointer relative mt-auto" @click.prevent="importMenu">
                <Loading v-if="importLoading" class="m-auto !border-t-gray-500" />
                <UIcon v-else name="i-ph-upload-simple-light" class="m-auto w-14 h-14 text-brand-600"></UIcon>
            </div>
        </div>
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 pt-6">
            <div>
                <div class="font-bold text-lg text-green mb-2">Danger zone </div>
                <div class="text-sm mb-2">You can delete your <strong>FREE</strong> menu, which has been saved in this
                    browser.</div>
                <div class="text-sm mb-8">Before you delete it, please make a backup (export your menu). </div>
            </div>
            <div class="grid place-content-center">
                <UButton @click="() => isModalDeleteOpen = true" color="red">Delete</UButton>
            </div>
            <UModal v-model="isModalDeleteOpen">
                <div class="p-8 flex flex-col gap-6">
                    <div class="text-center">Would you like to delete the menu?</div>
                    <div class="flex gap-4 items-center justify-center">
                        <UButton color="blue" class="px-10" @click.prevent="() => isModalDeleteOpen = false">No
                        </UButton>
                        <UButton color="red" class="px-10" @click.prevent="deleteMenu">Yes</UButton>
                    </div>
                </div>
            </UModal>
    </div>
</div></template>