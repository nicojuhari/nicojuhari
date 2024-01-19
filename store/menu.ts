import { defineStore } from "pinia";
// import { getAPI, updateAPI } from "../utils/API";
import { type Menu } from '~/types'


export const useMenuStore = defineStore("menu", () => {
    //state

    const menu = ref<Menu | null>(null);
    const menuChanged = ref(false);
    const isLoading = ref(false);

    const { getUserToken } = useAuth()

    const fetchMenu = async (menu_id: string) => {
        //get menu from local storage
        let localMenu = getMenuFromLocalStorage(menu_id);

        if (localMenu && Object.keys(localMenu).length) {
            menu.value = localMenu;
            return;
        }

        
        //get from DB
        try {
            const result= await $fetch(`/api/menu/${menu_id}`, {
                headers: { 'Authorization': await getUserToken() } as {}
            });

            if(result) {
                let { id,  created_at, updated_at, ...rest } = result

                if(rest) menu.value = JSON.parse(JSON.stringify(rest))
                menuChanged.value = false
                
            }
        } catch (err) {
            console.log(err);
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
            } else {
                if(oldVal != null) {
                    menuChanged.value = true
                }
            }
        },
        { deep: true }
    );

    //save menu in db
    const saveMenu = async () => {
        try {
            isLoading.value = true;
            if (menu.value)   {
                let result = await $fetch(`/api/menu/${menu.value.menu_uid}`, {
                                    method: 'PUT',
                                    headers: { 'Authorization': await getUserToken() } as {},
                                    body: menu.value,
                                })

                menuChanged.value = false;
                return result;
            }
            
        } catch (err) {
            console.log(err);
            return err;
        } finally {
            setTimeout(() => {
                isLoading.value = false;
            }, 1200)
        }
    };

    const deleteMenu = async (id: string) => {
        //from localStorage
        if (menu?.value?.isFromLocal) {
            removeMenuFromLocalStorage(id);
        } else {
            alert("Please cancel your subscription and your menu will be deleted after!");
        }
    };

    return {
        fetchMenu,
        resetMenu,
        deleteMenu,
        saveMenu,
        menu,
        menuChanged,
        menuCategories: computed(() => menu?.value?.categories || []),
        menuProducts: computed(() => menu?.value?.products || []),
        menuAllergens: computed(() => menu?.value?.allergens || []),
        menuBundles: computed(() => menu?.value?.bundles || []),
        isLoading
    };
});
