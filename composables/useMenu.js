import { ref, watch } from "vue";
import { groupProductsByCategory, searchInProducts } from "@/utils/menu";

export default function useMenu(staticMenu = {}) {
    const menuData = ref({ ...staticMenu } || null);
    const groupedMenu = ref(null);
    const singleProduct = ref(null);

    //events data
    const searchKey = ref("");
    const selectedCategoryID = ref(null);
    const selectedProductID = ref(null);

    if (menuData.value) {
        groupedMenu.value = groupProductsByCategory({ ...menuData.value });
    }

    //view a product details/in modal
    watch(selectedProductID, (newValue) => {
        if (newValue != "" && newValue != null) {
            singleProduct.value = menuData.value.products.find((product) => product.uid === newValue);
        } else {
            singleProduct.value = null;
        }
    });

    //search in products
    watch(searchKey, (newValue) => {
        let filteredProducts = [...menuData.value.products];

        if (newValue) {
            filteredProducts = searchInProducts(newValue, menuData.value.products);
        }

        groupedMenu.value = groupProductsByCategory({
            ...menuData.value,
            products: filteredProducts,
        });
    });

    //select a category
    watch(selectedCategoryID, (newValue) => {
        let filteredCategories = [...menuData.value.categories];

        if (newValue != "" && newValue != null) {
            filteredCategories = searchInProducts(newValue, menuData.value.categories);
        }

        groupedMenu.value = groupProductsByCategory({
            ...menuData.value,
            categories: filteredCategories,
        });
    });

    return {
        menuData,
        groupedMenu,
        selectedCategoryID,
        selectedProductID,
        singleProduct,
        searchKey,
    };
}
