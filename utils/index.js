export function groupProductsByCategory(menu) {
    let products = {};
    let categories = [];


    menu?.categories?.length && menu.categories.forEach((category) => {
        //this should run only once for each category
        if (!products?.[category.uid]) products[category.uid] = [];

        //add products to the category
        products[category.uid] = [
            ...menu.products.filter((p) => p.categoryId === category.uid),
        ];

        //add category to the categories array if it has products
        if (products[category.uid].length) categories.push(category);
    });

    return { products, categories };
}