export type Menu = {
value: any
    menu_uid: string,
    products: Array<unknown>,
    categories: Array<Category>,
    promos: Array<unknown>,
    bundles: Array<unknown>,
    allergens: Array<unknown>,
    configs: Configs,
    isFromLocal?: boolean
}

export type Category = {
    uid: string,
    name: string,
    description: string
}

export type Configs = {
    title: string
}