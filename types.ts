export type Menu = {
value: any
    menu_uid: string,
    products: Array<unknown>,
    categories: Array<Category>,
    promos: Array<unknown>,
    bundles: Array<unknown>,
    allergens: Array<Allergen>,
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