import { defineStore } from "pinia";
// import { getAPI, updateAPI } from "../utils/API";
import { type Menu } from '~/types'


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

    const fetchMenu = async (menu_id: string) => {
        //get menu from local storage
        let localMenu = getMenuFromLocalStorage(menu_id);

        if (localMenu && Object.keys(localMenu).length) {
            menu.value = localMenu;
            return;
        }

        if(menu.value === null) {
            //redirect to home page
            
            const router = useRouter()
            router.push('/')
        }
    };

    const resetMenu = () => (menu.value = null);

    //save on local automatically
    watch(
        menu,
        (newVal, oldVal) => {
            if (menu.value?.isFromLocal) {
                addMenuToLocalStorage(menu.value);
            }
        },
        { deep: true }
    );

    const deleteMenu = async (id: string) => {
        //from localStorage
        if (menu?.value?.isFromLocal) {
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
        menuBundles: computed(() => menu?.value?.bundles || []),
        menuPromos: computed(() => menu?.value?.promos || []),
        isLoading
    };
});
