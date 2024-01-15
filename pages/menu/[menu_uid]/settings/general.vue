<script setup>
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';

//state
const { menu } = storeToRefs(useMenuStore())

// import { menuStore } from '@/stores/menuStore';

const router = useRouter();
const route = useRoute();
const { deleteMenu } = useMenuStore();

const showDeleteInput = ref(false);
const confirmDeleteMenu = ref('')
const deleteMenuHandler = () => {

    if (!showDeleteInput.value) {
        showDeleteInput.value = true;
        return;
    }

    if (confirmDeleteMenu.value === 'delete') {
        deleteMenu(route?.params?.menu_id);
        router.push({ name: 'home' });
    }
}


</script>
<template>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div class="border rounded p-6">
           <div class="font-bold text-lg text-brand-error text-center">Danger zone </div>
           <div class="text-sm my-6">You can delete your <strong>FREE</strong> menu, which has been saved in this browser.</div>
           <div class="text-sm my-6">Before you delete it, please make a backup (export your menu). </div>

           <UButton @click="deleteMenuHandler" color="brand-red">Delete</UButton>
        </div>
    </div>
    <div class="py-4 border-b flex justify-between relative items-end">
        <div class="flex-1">
            <div class="font-bold text-lg text-brand-error">Danger zone </div>
            <div v-if="showDeleteInput" class="my-2 w-full flex-1">
                <Message severity="info" :closable="false" class="shrink-0 ">Only the menus from the <strong>FREE</strong>
                    plan can be deleted here.</Message>
                <input type="text" class="input-text" v-model="confirmDeleteMenu" />
                <div class="text-sm mb-4 italic">Please confirm, by typing the word <strong>delete</strong></div>
                <div class="flex gap-4">
                    <Button severity="danger" outlined @click="deleteMenuHandler">
                        Delete
                    </Button>
                    <Button @click="showDeleteInput = false">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
        <Button severity="danger" outlined @click="deleteMenuHandler" v-if="!showDeleteInput"> Delete menu </Button>
    </div>
</template>