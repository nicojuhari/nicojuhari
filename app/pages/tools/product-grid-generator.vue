<script setup>
// products grid generator for shopify blog post, generates a grid of products with links to the product pages
useHead({
    title: 'Product Grid Generator for Shopify Blogs',
    meta: [
        {
            name: 'description', content: 'Build beautiful product grids for your Shopify blog fast and free. Add images, titles, and descriptions to increase clicks and sales.'
        }
    ],
})

const emptyProduct = {
    title: '',
    image: '',
    url: '',
    price: '',
    description: ''
}
const loading = ref(false)
const loadingClipboard = ref(false)
const product = ref(emptyProduct)
const products = ref([
    {
        title: 'Product Title',
        image: 'https://nicojuhari.b-cdn.net/tools/grid/product-1.webp',
        url: '#',
        price: '$19.99',
        description: 'Product description, some text'
    },
    {
        title: 'Product Title',
        image: 'https://nicojuhari.b-cdn.net/tools/grid/product-2.webp',
        url: '#',
        price: '$29.99',
    },
    {
        title: 'Product Title',
        image: 'https://nicojuhari.b-cdn.net/tools/grid/product-3.webp',
        url: '#',
        price: '$39.99',
    },
    {
        title: 'Product Title',
        image: 'https://nicojuhari.b-cdn.net/tools/grid/product-4.webp',
        url: '#',
        price: '$49.99',
    }
])

const selectedDesign = ref(2) //1: square grid, 2: carousel grid

const addProduct = () => {
    //validate
    if (!product.value.title || !product.value.image || !product.value.url) {
        alert('Please fill in the Title, Image URL, and Product URL fields.')
        return
    }
    products.value.push(product.value)
    product.value = emptyProduct
}

//copy to clipboard
const copyToClipboard = () => {
    loadingClipboard.value = true
    navigator.clipboard.writeText(grid.value)
    setTimeout(() => {
        loadingClipboard.value = false
    }, 1000)
}

const clearAll = () => {
    products.value = []
}

const grid = computed(() => {
    if (!products.value.length) return ''
    let productsHTML = products.value.map(product => {
        return `
            <div class="nc-row-item">
                <a href="${product.url}" class="nc-row-item__url" title="${product.title}">
                    <img src="${product.image}" class="nc-row-item__img" alt="${product.title}" loading="lazy">
                    <div class="nc-row-item__content">
                        <div class="nc-row-item__title">${product.title}</div>
                        ${ product.description ? `<p class="nc-row-item__desc"> ${product?.description}</p>` : '' }
                        ${ product.price ? `<p class="nc-row-item__price"> ${product?.price}</p>` : '' }
                    </div>
                </a>
            </div>
        `
    }).join('')

    return `
        <div class="nc-row">${productsHTML}</div>
        <style>${commonStyles} ${gridStyles[selectedDesign.value]}</style>
    `;
})

const commonStyles = `
    .nc-row {
        padding: .5rem 0;
        gap: 1.5rem;
    }
    .nc-row-item {
        border-radius: 6px;
        background-color: #fff;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1);
        overflow: hidden;
    }
    .nc-row-item__url {
        text-decoration: none;
        color: inherit;
    }
    .nc-row-item__content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    .nc-row-item__img {
        width: 100%;
        object-fit: cover;
        object-position: center; 
        aspect-ratio: 1/1;
    }
    .nc-row-item__title {
        font-size: 1.2rem;
        font-weight: 600;
    }
    .nc-row-item__price {
        font-size: 1rem;
        margin-top: auto;
    }
    .nc-row-item__desc {
        font-size: 0.75rem;
        opacity: 0.8;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

`


const gridStyles = {
    1: `
        .nc-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        .nc-row-item {
            width: auto;
        }
    `,
    2: `
        .nc-row {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-left: .25rem;
            padding-right: .25rem;
        }
        
        .nc-row-item {
            width: 18rem;
            scroll-snap-align: center;
            flex-shrink: 0;
        }
    `
}
const showModal = ref(false)


</script>
<template>
    <div class="container container-sm">
        <h1 class="title mb-2">Product Grid Generator for Shopify Blogs</h1>
        <h2 class="mb-8">Increase conversions with attractive product grids on your blog.</h2>

        <div>
            <div class="text-right">
                <UButton @click="showModal = true" size="md" icon="i-ph-plus-light" class="mb-4">New Product</UButton>
            </div>
            <p class="text-xl font-semibold mb-4 text-center">Preview</p>
            <div v-if="grid">
                
                <div class="text-gray-800 text-center flex items-center gap-4 justify-between">
                    
                    <div class="space-x-2.5">
                        <UButton variant="soft" color="neutral" square title="Sqaure Grid" @click="selectedDesign = 1" :class="{'bg-gray-900 text-white': selectedDesign === 1}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 11H5.563a2.5 2.5 0 0 1-2.5-2.5V5.564a2.5 2.5 0 0 1 2.5-2.5H8.5a2.5 2.5 0 0 1 2.5 2.5V8.5A2.5 2.5 0 0 1 8.5 11M5.563 4.064a1.5 1.5 0 0 0-1.5 1.5V8.5a1.5 1.5 0 0 0 1.5 1.5H8.5A1.5 1.5 0 0 0 10 8.5V5.564a1.5 1.5 0 0 0-1.5-1.5ZM18.436 11H15.5A2.5 2.5 0 0 1 13 8.5V5.564a2.5 2.5 0 0 1 2.5-2.5h2.934a2.5 2.5 0 0 1 2.5 2.5V8.5a2.5 2.5 0 0 1-2.498 2.5M15.5 4.064a1.5 1.5 0 0 0-1.5 1.5V8.5a1.5 1.5 0 0 0 1.5 1.5h2.934a1.5 1.5 0 0 0 1.5-1.5V5.564a1.5 1.5 0 0 0-1.5-1.5Zm-7 16.872H5.564a2.5 2.5 0 0 1-2.5-2.5V15.5a2.5 2.5 0 0 1 2.5-2.5H8.5a2.5 2.5 0 0 1 2.5 2.5v2.936a2.5 2.5 0 0 1-2.5 2.5M5.564 14a1.5 1.5 0 0 0-1.5 1.5v2.936a1.5 1.5 0 0 0 1.5 1.5H8.5a1.5 1.5 0 0 0 1.5-1.5V15.5A1.5 1.5 0 0 0 8.5 14Zm12.872 6.936H15.5a2.5 2.5 0 0 1-2.5-2.5V15.5a2.5 2.5 0 0 1 2.5-2.5h2.934a2.5 2.5 0 0 1 2.5 2.5v2.936a2.5 2.5 0 0 1-2.498 2.5M15.5 14a1.5 1.5 0 0 0-1.5 1.5v2.936a1.5 1.5 0 0 0 1.5 1.5h2.934a1.5 1.5 0 0 0 1.5-1.5V15.5a1.5 1.5 0 0 0-1.5-1.5Z"/></svg>
                        </UButton>
                        <UButton variant="soft" color="neutral" square title="Carousel Grid" @click="selectedDesign = 2" :class="{'bg-gray-900 text-white': selectedDesign === 2}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" square viewBox="0 0 24 24"><path fill="currentColor" d="M18.436 20.937H15.5a2.5 2.5 0 0 1-2.5-2.5V5.565a2.5 2.5 0 0 1 2.5-2.5h2.933a2.5 2.5 0 0 1 2.5 2.5v12.872a2.5 2.5 0 0 1-2.497 2.5M15.5 4.065a1.5 1.5 0 0 0-1.5 1.5v12.872a1.5 1.5 0 0 0 1.5 1.5h2.933a1.5 1.5 0 0 0 1.5-1.5V5.565a1.5 1.5 0 0 0-1.5-1.5Zm-7 16.872H5.564a2.5 2.5 0 0 1-2.5-2.5V5.565a2.5 2.5 0 0 1 2.5-2.5H8.5a2.5 2.5 0 0 1 2.5 2.5v12.872a2.5 2.5 0 0 1-2.5 2.5M5.564 4.065a1.5 1.5 0 0 0-1.5 1.5v12.872a1.5 1.5 0 0 0 1.5 1.5H8.5a1.5 1.5 0 0 0 1.5-1.5V5.565a1.5 1.5 0 0 0-1.5-1.5Z"/></svg>
                        </UButton>
                    </div>
                </div>
                <div class="p-1.5" v-html="grid"></div>
                <div class="flex justify-between mt-6">
                    <UButton @click.prevent="clearAll" variant="soft" icon="i-ph-trash-light" color="error" title="Clear All" label="Delete"></UButton>
                    <UButton @click.prevent="copyToClipboard" variant="soft" class="overflow-auto" icon="i-ph-copy-simple-light" :loading="loadingClipboard">Copy the Code</UButton>
                </div>
            </div>
            <UiEmptyBlock v-else>
                No products added yet
            </UiEmptyBlock>
        </div>
        <div class="mt-6 space-y-4">
            <p>Create simple and elegant product grids for your Shopify blog in seconds — no coding required.</p>
            <p>Paste product titles, image URLs, links, prices, and descriptions, and the tool outputs responsive HTML/CSS you can drop into a post.</p>
            <p>Styles are scoped so the grid won't break your theme, and layouts are mobile-friendly to boost engagement on phones.</p>
            <p>Better visuals keep readers scrolling and drive more clicks to product pages, improving conversion potential.</p>
            <p>Free to use, instant output, and easy to customize if you want to tweak the look.</p>
        </div>
        <UModal v-model:open="showModal" title="Add new product">
            <template #body>
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UFormField label="Title" required>
                            <UInput v-model="product.title" class="w-full"/>
                        </UFormField>
                        <UFormField label="Price">
                            <UInput v-model="product.price" class="w-full"/>
                        </UFormField>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UFormField label="Image URL" required>
                            <UInput v-model="product.image" class="w-full" />
                        </UFormField>
                        <UFormField label="Product URL" required>
                            <UInput v-model="product.url" class="w-full"/>
                        </UFormField>
                    </div>
                    <UFormField label="Description">
                        <UTextarea v-model="product.description" class="w-full"
                            :ui="{ base: 'h-24 min-h-24 max-h-24' }" />
                    </UFormField>
                    <div class="text-right">
                        <UButton @click.prevent="addProduct">Add Product</UButton>
                    </div>
                </div>
            </template>
        </UModal>
    </div>
</template>