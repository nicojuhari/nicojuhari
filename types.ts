export type Menu = {
    menu_uid: string,
    products: Array<unknown>,
    categories: Category[],
    promos: Array<unknown>,
    bundles: Array<unknown>,
    allergens: Allergen[],
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

export type Allergen = AllergenWithName | AllergenWithIcon

type AllergenWithName = {
    name: string
    description: string,
}
type AllergenWithIcon = {
    icon: string
    description: string,
}