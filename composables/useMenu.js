import { ref } from "vue";

const menu = ref(null)

export default function useMenu(staticMenu = {}) {
    menu.value = staticMenu

    
    
    return {
        menu
    }
    
}
