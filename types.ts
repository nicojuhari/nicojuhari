export type Menu = {
    menu_uid: string,
    products: Product[],
    categories: Category[],
    promos: Array<unknown>,
    bundles: Bundle[],
    allergens: Allergen[],
    configs: Configs,
    isFromLocal?: boolean
}

export type Product = {
    uid: string,
    name: string,
    options: unknown[],
    categoryId: string,
    description?: string,
    imageUrl?: string,
    tags?: string[],
    allergens?: Allergen[],
    inStock?: boolean | null
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
export type Bundle = {
    uid: string;
    name: string;
    description: string;
    items: {
        qty: number;
        uid: string;
        option: string;
        itemPrice: number | null;
    }[];
    bundlePrice: number | null;
}