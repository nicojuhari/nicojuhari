import { defineStore } from "pinia";
// import { getAPI, updateAPI } from "../utils/API";
import { type Menu } from '~/types'
// import { useLocalStorage } from '@vueuse/core';
// import { useStorage } from '@vueuse/core'

export const useMenuStore = defineStore("menu", () => {
    //state

    const menu = ref<Menu | null>(null);
    const viewObjectId = ref(false);
    const isLoading = ref(false);
    const designConfig = ref({
        version: 1,
        priceSymbol: '$',
        allergens: {
            title: 'Allergens',
            show: true
        },
        promos: true,
        bundles: true,
    })

    const fetchMenu = async (menu_uid: string) => {
        //get menu from local storage
        let localMenu = getMenuFromLocalStorage(menu_uid);
        // console.log(localMenu);

        if (localMenu && Object.keys(localMenu).length) {
            menu.value = localMenu;
        } else {
            const router = useRouter();
            router.push({ path: '/tools/free-menu-maker', replace: true })
        }
    };

    //save on local automatically
    watch( menu,
        () => {
            if (menu.value) {
                addMenuToLocalStorage(menu.value);
            }
        },
        { deep: true }
    );

    const resetMenu = () => (menu.value = null);
    const deleteMenu = async (id: string) => {
        //from localStorage
        if (menu.value) {
            removeMenuFromLocalStorage(id);
        }
    };

    return {
        fetchMenu,
        resetMenu,
        deleteMenu,
        menu,
        viewObjectId,
        designConfig,
        menuCategories: computed(() => menu?.value?.categories || []),
        menuProducts: computed(() => menu?.value?.products || []),
        menuAllergens: computed(() => menu?.value?.allergens || []),
        isLoading
    };
});
