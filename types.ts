export type Menu = {
    menu_uid: string,
    products: Product[],
    categories: Category[],
    promos: Promo[],
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
        size: number;
    }[];
    price: number | null;
}

export type Promo = {
    uid: string;
    name?: string;
    description?: string;
    extraInfo?: string;
    bgColor?: string;
    textColor?: string; 
    bgImage?: string;
}