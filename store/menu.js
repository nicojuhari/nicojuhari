import { defineStore } from "pinia";
// import { getAPI, updateAPI } from "../utils/API";

export const useMenuStore = defineStore("menu", () => {
    //state
    const menu = ref(null);

    const fetchMenu = async (menu_id) => {

        //get menu from local storage
        let localMenu = getMenuFromLocalStorage(menu_id);

        if (localMenu && Object.keys(localMenu).length) {
            menu.value = localMenu;
            return;
        }

        //get from DB
        // const { data, error } = await getAPI(`/menus/${menu_id}`);

        // if (error) {
        //     window.location.href = "/";
        // }
        // menu.value = JSON.parse(JSON.stringify(data));
        // menuBeforeSave.value = JSON.stringify(data);
    };

    const resetMenu = () => menu.value = null;

    //save on local automatically
    watch(
        menu,
        () => {
            if (menu?.value?.isFromLocal) {
                addMenuToLocalStorage(menu.value)
            }
        },
        { deep: true }
    );

    //save menu in db
    const saveMenuInDatabase = async (menuId, menuObj) => {
        try {
            // if (menuId && menuObj) return await updateAPI(`/menus/${menuId}`, menuObj);
            // else {
            //     return await updateAPI(`/menus/${menu.value.menu_uid}`, menu.value);
            // }
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    const deleteMenu = async (id) => {
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
        saveMenuInDatabase,
        deleteMenu,
        menu,
        menuCategories: computed(() => menu?.value?.categories || [])
    };
});
