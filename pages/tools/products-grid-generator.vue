<script setup>
// products grid generator for shopify blog post, generates a grid of products with links to the product pages
useHead({
    title: 'Products Grid Generator for Shopify Blog',
    meta: [
        {
            name: 'description', content: 'Craft eye-catching product grids for your Shopify blog in seconds! Free tool: Add titles, images, & descriptions. Boost engagement & sales!'
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
const product = ref(emptyProduct)
const products = ref([
    {
        title: 'Product 1',
        image: 'https://images.unsplash.com/photo-1633869699811-cd4f63049b36',
        url: '#',
        price: '$199.99',
        description: 'This is a description for product 1'
    },
    {
        title: 'Product 2',
        image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84',
        url: '#',
        price: '$29.99',
    },
    {
        title: 'Product 3',
        image: 'https://images.unsplash.com/photo-1602734846297-9299fc2d4703',
        url: '#',
        price: '$39.99',
    },
    {
        title: 'Product 4',
        image: 'https://images.unsplash.com/photo-1598541264502-84dc6aa2fb87',
        url: '#',
        price: '$49.99',
    }
])

const selectedDesign = ref(1)

const addProduct = () => {
    products.value.push(product.value)
    product.value = emptyProduct
}

//copy to clipboard
const copyToClipboard = () => {
    loading.value = true
    navigator.clipboard.writeText(grid.value)
    setTimeout(() => {
        loading.value = false
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
    .nc-row-item__url {
        text-decoration: none;
        color: inherit;
    }
    .nc-row-item__content {
        padding: 1rem;
    }
    .nc-row-item__img {
        width: 100%;
        height: var(--nc-row-item-img-height);
        object-fit: cover;
        object-position: center; 
    }
    .nc-row-item__title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 12px;
    }
    .nc-row-item__price {
        font-size: 1rem;
        margin-top: 5px;
    }
    .nc-row-item__desc {
        font-size: 0.9rem;
        opacity: 0.8;
        margin-top: 5px;
    }

`


const gridStyles = {
    1: `
        .nc-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .nc-row-item {
            width: auto;
            border: 1px solid #ccc;
            border-radius: 6px;
            background-color: #fff;
            overflow: hidden;
            --nc-row-item-img-height: 200px;
        }
        @media (min-width: 768px) {
            .nc-row-item {
                --nc-row-item-img-height: 400px;
            }
        }
    `
}

</script>
<template>
    <section>
        <div class="container">
            <h1 class="text-center mb-2 page-title">Products Grid Generator for Shopify Blog</h1>
            <div class="mb-8 text-lg font-normal text-center">Increase Engagement and Sales with Eye-Catching Product
                Grids on Your Blog.
            </div>
        </div>
    </section>
    <div class="container py-10">
        <UCard class="max-w-[600px] m-auto">
            <h2 class="text-xl font-semibold mb-4 text-center">Product Form</h2>
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UFormGroup label="Title">
                        <UInput v-model="product.title" />
                    </UFormGroup>
                    <UFormGroup label="Price">
                        <UInput v-model="product.price" />
                    </UFormGroup>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UFormGroup label="Image URL">
                        <UInput v-model="product.image" />
                    </UFormGroup>
                    <UFormGroup label="Product URL">
                        <UInput v-model="product.url" />
                    </UFormGroup>
                </div>
                <UFormGroup label="Description">
                    <UTextarea v-model="product.description" :rows="2" class="min-h-[auto]"
                        :ui="{ base: 'h-14 min-h-14' }" />
                </UFormGroup>
                <UButton @click.prevent="addProduct">Add Product</UButton>
            </div>
        </UCard>
    </div>
    <div class="container py-10" v-if="grid">
        <div class="space-x-6 text-center">
            <UButton @click.prevent="clearAll" :loading="loading" color="red">Clear all</UButton>
            <UButton @click.prevent="copyToClipboard" :loading="loading">Copy the code</UButton>
        </div>
    </div>
    <section class="bg-gray-200">
        <div class="container" v-if="grid">
            <h2 class="text-xl font-semibold mb-4 text-center">Products Grid Preview</h2>
            <div v-html="grid"></div>
        </div>
        <div v-else>
            <div class="container py-10 text-center">No products added yet.</div>
        </div>
    </section>
    <section>
        <div class="container my-8 space-y-4">
            <h2 class="text-2xl pt-4 font-semibold">Spruce Up Your Shopify Blog with Stunning Product Grids (Free Tool!)
            </h2>

            <p>
                Struggling to make your Shopify blog visually appealing? Plain text product lists can leave readers
                uninspired. This is where our Free Product Grid Generator comes in!
            </p>

            <p>
                Effortlessly create beautiful and engaging product grids to showcase your offerings in seconds. No
                coding
                knowledge required!</p>
            <p>Simply enter your product titles, image URLs, product URLs, prices, and
                descriptions.</p>
            <p>Our tool will generate a neat and responsive product grid using HTML and CSS.
            </p>

            <p class="pt-4"><strong>Key benefits:</strong></p>
            <ul class="list-disc list-inside space-y-1.5">
                <li><strong>Boost engagement:</strong> Eye-catching product grids grab attention and keep readers
                    scrolling.</li>
                <li><strong>Increase sales:</strong> Well-presented products are more likely to convert into sales.</li>
                <li><strong>Easy to use:</strong> No coding skills needed! Our user-friendly interface makes creating
                    grids a breeze.</li>
                <li><strong>Safe & Secure:</strong> All styles are scoped, ensuring they won't affect your website's
                    existing design.</li>
            </ul>

            <p>Get started today and watch your blog posts transform!</p>

            <h4 class="text-2xl pt-4 pb-4 font-semibold">Frequently Asked Questions (FAQ)</h4>
            <p class="font-semibold">Do I need to know how to code to use this tool?</p>
            <p>
                No! Our tool is designed for everyone. Simply enter your product information and the tool generates
                the
                code for you.
            </p>
            <p class="font-semibold">Will this mess up my website's design?</p>
            <p>No. The generated code uses scoped styles, meaning it won't affect the styles of other content on your
                website.</p>

            <p class="font-semibold">Can I customize the look of the product grid?</p>
            <p>
                Currently, the tool offers one design option. However, the generated HTML and CSS code can be further
                customized if you have basic coding knowledge.
            </p>
            <p class="font-semibold">Is this tool free to use?</p>
            <p>Absolutely! Our product grid generator is completely free to use.</p>

            <p><strong class="pt-4">
                    Ready to create beautiful product grids for your Shopify blog? Start using our free tool today!
                </strong></p>
        </div>
    </section>
</template>