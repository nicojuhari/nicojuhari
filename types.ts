export type Menu = {
    menu_uid: string,
    products: Array<unknown>,
    categories: Array<unknown>,
    promos: Array<unknown>,
    bundles: Array<unknown>,
    allergens: Array<unknown>,
    configs: Object,
    isFromLocal?: boolean
}