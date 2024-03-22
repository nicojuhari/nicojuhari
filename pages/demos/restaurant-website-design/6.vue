<script setup>
import { ref } from "vue";
import { gsap } from "gsap";
import menuData from '@/assets/json/demo-menu.json'

const bgImgURL = 'https://1FoodMenu.b-cdn.net/demos/italian-restaurant/home-hero-bg.jpg'

const pageTitle = 'Mama Mia'
useHead({
    title: `${pageTitle} - Restaurant Website Example`,
    bodyAttrs: {
        class: 'bg-gray-50 demo-italian-restuarant'
    },
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Restaurant Website Example - ${pageTitle}, modern and clean design. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and our Free Menu Maker` },
    ],
    htmlAttrs: {
        class: 'scroll-smooth'
    },
})

//HEO Section
onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const toOptions = { opacity: 1, y: 0 }

    tl.to('[data-gsap-title]', { ...toOptions })
        .to('[data-gsap-subtitle]', { ...toOptions }, '-=0.3')
        .to('[data-gsap-btn]', { ...toOptions, stagger: .2 }, '-=0.3')
});


const selectedCategory = ref('')
const viewProduct = ref(null)
const showSearchBar = ref(false)

const menuNav = ref(null)
const menuNavYPosition = ref(0)

const getMenuPosition = () => {
    // get element positio on page
    menuNavYPosition.value = menuNav.value.getBoundingClientRect().top
}

onMounted(() => {
    //add scroll event listener
    window.addEventListener('scroll', getMenuPosition)
})

onBeforeUnmount(() => {
    //remove scroll event listener
    window.removeEventListener('scroll', getMenuPosition)
})


const productsByCategory = ref({
    categories: [],
    products: []
})

productsByCategory.value = groupProductsByCategory(menuData)

const scrollTo = (category_id) => {
    let targetBlock = document.getElementById(category_id);
    targetBlock.scrollIntoView({ behavior: 'smooth' });
}

const filterProducts = (ev) => {
    let products = searchInProducts(ev.target.value, [...menuData.products])
    productsByCategory.value = groupProductsByCategory({ categories: [...menuData.categories], products })
}

const toggleSearchBar = (open = true) => {
    showSearchBar.value = open
    productsByCategory.value = groupProductsByCategory(menuData)
    selectedCategory.value = ''
}

const showModal = ref(false)
const showViewProductModal = (product_id) => {
    viewProduct.value = menuData.products.find(product => product.uid === product_id)
    showModal.value = true;
}


const showBookTableModal = ref(false)


</script>
<template>
    <div class="relative bg-center bg-no-repeat bg-cover" :style="`background-image:url(${bgImgURL})`">
        <div class="absolute inset-0 bg-black opacity-40"></div>
        <header class="container relative text-white py-4 flex items-center justify-between h-16">
            <UIcon name="i-fluent-emoji-high-contrast-pizza" dynamic class="w-8 h-8 cursor-pointer shrink-0"></UIcon>
            <nav class="hidden md:flex items-center gap-6 justify-end">
                <a href="#our-menu">Menu</a>
                <a href="#gallery">Gallery</a>
                <a href="#about">About</a>
            </nav>
            <div class="md:hidden">
                <UIcon name="i-ph-list" class="w-8 h-8 cursor-pointer"></UIcon>
            </div>
        </header>
        <!-- Hero Section -->
        <div class="container flex items-center justify-center flex-col min-h-[calc(100svh-4rem)]">
            <div class="relative grid place-content-center flex-grow">
                <div class="mask relative z-10">
                    <h1 data-gsap-title
                        class="text-6xl md:text-9xl font-bold text-center tracking-wider text-white opacity-0 translate-y-24">
                        Mama Mia</h1>
                </div>
                <div class="mask">
                    <h2 data-gsap-subtitle
                        class="uppercase text-sm text-center font-semibold tracking-[8px] md:tracking-[12px] text-[#e07c0c] opacity-0 -translate-y-24">
                        Italian Restaurant</h2>
                </div>
                <div class="flex gap-4 items-center justify-center mt-6">
                    <a data-gsap-btn
                        class="bg-[#0C7C59] text-white min-w-[156px] tracking-wider py-2 px-4 inline-flex items-center justify-center rounded-full uppercase opacity-0 translate-y-10"
                        href="#our-menu">View Menu</a>
                    <button data-gsap-btn @click="$emit('showBookTableModal')"
                        class="bg-[#6D2E46] text-white min-w-[156px] tracking-wider py-2 px-4 inline-flex items-center justify-center rounded-full uppercase opacity-0 translate-y-10">Book
                        a Table</button>
                </div>
            </div>
            <div class="mt-24 md:mt-auto w-full">
                <!-- <DemosRestaurant6SubHeader/> -->
            </div>
        </div>
        <!-- Hero Section END -->
    </div>
    <!-- Menu Start -->
    <section class="!pt-0" id="our-menu">
        <div class="sticky top-0 z-50 bg-white" ref="menuNav" :class="menuNavYPosition <= 0 && 'shadow'">
            <!-- Categories -->
            <div class="container overflow-y-hidden relative">
                <div class="overflow-x-auto text-sm">
                    <div class="inline-flex gap-4 mx-auto py-4">
                        <div @click.prevent="toggleSearchBar"
                            class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-gray-600 bg-opacity-10 text-black rounded-full cursor-pointer">
                            <svg class="w-6 h-6" viewBox="0 0 20 20">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div v-for="category in productsByCategory?.categories" :key="category.uid"
                            @click="scrollTo(category.uid)"
                            :class="{ '!bg-[#0C7C59] bg-opacity-70 text-white': selectedCategory == category.uid }"
                            class="bg-white shadow py-2 px-4 h-10 inline-flex items-center rounded-full cursor-pointer flex-shrink-0 duration-500">
                            {{
                            category.name }}</div>
                    </div>
                </div>
                <Transition name="fade">
                    <div class="flex items-center gap-4 absolute left-0 w-full py-4 top-0 bg-white"
                        v-if="showSearchBar">
                        <div @click.prevent="toggleSearchBar(false)"
                            class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-gray-600 bg-opacity-10 text-black rounded-full cursor-pointer">
                            <svg class="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z" />
                            </svg>
                        </div>
                        <div class="w-full max-w-sm relative">
                            <input type="text" @input="filterProducts" placeholder="Search ..."
                                class="h-10 border rounded-full px-4 w-full" ref="searchBar" />
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        <!-- Products START -->
        <div class="container">
            <div class="my-6 overflow-hidden relative" v-for="category in productsByCategory?.categories">
                <!-- for scrolling -->
                <div :id="category.uid" class="h-0 w-0 opacity-0 -z-10 -translate-y-[90px]"></div>
                <h2 class="text-2xl font-bold">{{ category.name }}</h2>
                <div v-if="category.description" class="my-2">{{ category.description }}</div>
                <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-1">
                    <div v-for="product in productsByCategory.products[category.uid]" :key="product.uid"
                        @click.prevent="() => showViewProductModal(product.uid)"
                        class="snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-72">
                        <div class="h-52 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                            <div class="image-bg h-full w-full rounded-t-xl"
                                :style="`background-image: url(${product.imageUrl})`"></div>
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="font-bold pb-2 inline-flex flex-wrap gap-2 items-center">
                                <span class="flex-shrink-0">{{ product.name }}</span>
                                <span v-for="item in product.allergens"
                                    class="cursor-pointer font-medium flex-shrink-0 text-gray-500 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                                    {{ menuData.allergens.find((al) => al.uid == item).name }}
                                </span>
                            </div>
                            <div class="opacity-60 leading-tight line-clamp-2 w-full mt-auto">{{ product.description }}
                            </div>
                            <div class="pt-4">
                                <div v-if="product.options?.[0]"
                                    class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-300 py-0">
                                    <div class="text-gray-500 text-sm">{{ product.options?.[0]?.size }}</div>
                                    <div class="flex gap-2 items-center">
                                        <div v-if="product.options?.[0].salePrice"
                                            class="text-gray-700 font-medium text-lg">
                                            $ {{ product.options?.[0].salePrice }}
                                        </div>
                                        <div v-if="product.options?.[0].salePrice"
                                            class="text-red-400 line-through opacity-70 text-sm">
                                            ${{ product.options?.[0].price }}
                                        </div>
                                        <div v-else class="text-gray-700 font-medium text-lg">
                                            ${{ product.options?.[0].price }}
                                        </div>
                                        <span v-if="product.options?.[1]"
                                            class="arrow-down rounded bg-slate-200"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!productsByCategory?.categories?.length"
                class="grid place-content-center bg-gray-100 text-2xl h-72 my-4 rounded">
                No products found
            </div>
            <div class="my-6">
                <h3 class="text-2xl font-bold">Allergens</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 pt-6 gap-3 p-6 bg-white rounded shadow-md my-6">
                    <div v-for="allergen in menuData.allergens" class="flex gap-4">
                        <div class="grid place-content-center w-12 bg-gray-200 rounded text-2xl">{{ allergen.name }}
                        </div>
                        <div class="min-h-[48px] grid place-content-center">{{ allergen.description }}</div>
                    </div>
                </div>
            </div>
        </div>
        <UModal v-model="showModal" :ui="{ width: 'sm:max-w-[375px]' }">
            <div class="flex flex-col cursor-pointer flex-shrink-0 relative">
                <UButton square color="gray" variant="soft" icon="i-ph-x-bold"
                    class="absolute rounded-full bg-opacity-60 right-3 top-3 font-bold text-gray-950"
                    @click="showModal = false" />

                <div class="h-72 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                    <div class="image-bg h-full w-full rounded-t-xl"
                        :style="`background-image: url(${viewProduct.imageUrl})`"></div>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <div class="font-bold pb-2 inline-flex flex-wrap gap-2 items-center">
                        <span class="flex-shrink-0">{{ viewProduct.name }}</span>
                        <span v-for="item in viewProduct.allergens"
                            class="cursor-pointer font-medium flex-shrink-0 text-gray-500 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                            {{ menuData.allergens.find((al) => al.uid == item).name }}
                        </span>
                    </div>
                    <div class="opacity-60 leading-tight w-full mt-auto">{{ viewProduct.description }}</div>
                    <div class="pt-2">
                        <div v-for="option in viewProduct.options"
                            class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-300 py-2">
                            <div class="text-gray-500 text-sm">{{ option?.size }}</div>
                            <div class="flex gap-2 items-center">
                                <div v-if="option.salePrice" class="text-gray-700 font-medium text-lg">
                                    $ {{ option.salePrice }}
                                </div>
                                <div v-if="option.salePrice" class="text-red-400 line-through opacity-70 text-sm">
                                    ${{ option.price }}
                                </div>
                                <div v-else class="text-gray-700 font-medium text-lg">
                                    ${{ option.price }}
                                </div>
                                <!-- <span v-if="viewProduct.options?.[1]" class="arrow-down rounded bg-slate-200"></span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UModal>
    </section>
    <!-- Menu End -->
    <section>
        <div id="gallery" class="container relative">
            <h2 class="text-3xl md:text-5xl text-[#221919] font-semibold text-center mb-6 md:mb-8">Gallery</h2>
            <div
                class="grid md:grid-cols-4 md:grid-rows-[repeat(2,218px)] gap-4 grid-cols-2 grid-rows-[repeat(4,180px)]">
                <div class="row-span-2 hover:-translate-y-2 duration-700">
                    <img src="https://images.pexels.com/photos/1741285/pexels-photo-1741285.jpeg"
                        alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
                </div>
                <div class="row-span-2 hover:-translate-y-2 duration-700">
                    <img src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg"
                        alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
                </div>
                <div
                    class="row-span-1 md:col-start-3 md:col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                    <img src="https://images.pexels.com/photos/4431588/pexels-photo-4431588.jpeg"
                        alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
                </div>
                <div
                    class="row-span-1 md:col-start-4 col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                    <img src="https://images.pexels.com/photos/2899737/pexels-photo-2899737.jpeg"
                        alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
                </div>
                <div
                    class="row-span-1 md:col-start-3 col-span-2 md:row-start-2 row-start-4 hover:-translate-y-2 duration-700">
                    <img src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg"
                        alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
                </div>
            </div>
        </div>
    </section>
    <section>
        <div id="about" class="container relative">
            <h2 class="text-3xl md:text-5xl text-[#221919] font-semibold text-center mb-6 md:mb-8">About us</h2>
            <div class="flex flex-col md:flex-row bg-white rounded-md overflow-hidden relative z-10 shadow">
                <div class="h-[300px] md:h-[450px] md:w-1/2 shrink-0 bg-no-repeat bg-cover bg-center"
                    style="background-image:url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">

                </div>
                <div class="p-10 flex flex-col justify-center gap-6">
                    <div class="leading-relaxed text-gray-600 flex flex-col gap-2">
                        <p class="font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                        <p>Culpa vel ratione ex quisquam tempora,
                            vitae
                            exercitationem ducimus ullam esse nulla fugiat, quis nisi sequi deserunt molestias
                            provident!</p>
                        <p>Nulla, ea
                            architecto.</p>
                        Lorem ipsum dolor sit amet consectetur...
                    </div>
                    <div>
                        <a class="border-[#0C7C59] text-[#0C7C59] border tracking-wider py-2 px-4 mt-6 inline-flex items-center justify-center rounded-full uppercase"
                            href="#">Read More</a>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <h2 class="text-3xl md:text-5xl text-[#221919] font-semibold text-center mb-6 md:mb-8">Contacts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-md overflow-hidden">
                <div class="p-10 flex flex-col justify-center gap-6">
                    <a class="flex gap-4 items-center" href="tel:+43123456789">
                        <div class="bg-[#0C7C59] bg-opacity-10 rounded-full p-2">
                            <UIcon name="i-ph-phone-light" class="text-[#0C7C59] w-8 h-8 inline-block" />
                        </div>
                        <span class="text-gray-600 text-xl font-medium ">+ 43 123 456 789</span>
                    </a>
                    <a class="flex gap-4 items-center" href="mailto:contact@example.com">
                        <div class="bg-[#0C7C59] bg-opacity-10 rounded-full p-2">
                            <UIcon name="i-ph-envelope-light" class="text-[#0C7C59] w-8 h-8 inline-block" />
                        </div>
                        <span class="text-gray-600 text-xl font-medium ">contact@example.com</span>
                    </a>
                    <div class="flex gap-4 items-center">
                        <div class="bg-[#0C7C59] bg-opacity-10 rounded-full p-2">
                            <UIcon name="i-ph-map-pin-light" class="text-[#0C7C59] w-8 h-8 inline-block" />
                        </div>
                        <span class="text-gray-600 text-xl font-medium ">1234 Street Name, City Name</span>
                    </div>
                    <div>
                        <button @click.prevent="showBookTableModal = true"
                            class="bg-[#6D2E46] text-white tracking-wider py-2 px-4 mt-6 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold">Book
                            a Table</button>
                    </div>
                </div>
                <IncludesGMaps class="h-[450px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1667.5459847272448!2d16.38995774311557!3d48.14111989888702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da908a754311d%3A0x428d931fe45f5cc0!2sFreelance%20Web%20Developer%20in%20Vienna!5e0!3m2!1sen!2sat!4v1711108396501!5m2!1sen!2sat" />
            </div>
        </div>
    </section>
    <footer class="border-t border-r-gray-100">
        <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
            <div class="font-bold">Mama Mia</div>
            <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">me</NuxtLink>
            </div>
        </div>
    </footer>
    <!-- <DemosItalianFooter /> -->
    <!-- <UModal v-model="showBookTableModal">
        
        
    </UModal> -->
</template>
<style>
.demo-italian-restuarant section {
    padding-bottom: 4rem;
    padding-top: 4rem;
}

.demo-italian-restuarant section+section {
    padding-top: 2rem;
}
</style>