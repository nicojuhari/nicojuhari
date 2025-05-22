export function groupProductsByCategory(menu) {
    let products = {};
    let categories = [];

    menu?.categories?.length &&
        menu.categories.forEach((category) => {
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

export function searchInProducts(term, data) {
    let filteredData = [];

    if (!term) {
        return data;
    }

    term = term.toLocaleLowerCase().trim();

    filteredData = [...data].filter((obj) => {
        return Object.values(obj).join(" ").toLocaleLowerCase().includes(term);
    });

    return filteredData;
}

export function filterEmptyCategories(categories, products) {
   return categories.filter((category) => {
       // Check if the category has any associated products
       return products.some((product) => product.categoryId === category.uid);
   });
}
