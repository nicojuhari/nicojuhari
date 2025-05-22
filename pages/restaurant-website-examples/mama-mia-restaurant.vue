<script setup>
import { ref } from "vue";
import { gsap } from "gsap";
import staticMenu from '@/assets/json/demo-menu.json'

const { menuData, groupedMenu, menuCategories, selectedProductID, singleProduct } = useMenu(staticMenu);

const bgImgURL = 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

useHead({
    title: `Mama Mia - Restaurant Website Example`,
    bodyAttrs: {
        class: 'demo-italian-restuarant'
    },
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

//modal
const showModal = ref(false)
const openModal = (product_id) => {
    selectedProductID.value = product_id
    showModal.value = true
}

const showBookTableModal = ref(false)

const gallery = [
    'https://images.pexels.com/photos/1741285/pexels-photo-1741285.jpeg',
    'https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg',
    'https://images.pexels.com/photos/590477/pexels-photo-590477.jpeg',
    'https://images.pexels.com/photos/8753679/pexels-photo-8753679.jpeg',
]


</script>
<template>
    <div>
        <div class="relative bg-center bg-no-repeat bg-cover" :style="`background-image:url(${bgImgURL})`">
            <div class="absolute inset-0 bg-black opacity-60"></div>
            <header class="container relative text-white py-4 flex items-center justify-between h-16">
                <UIcon name="i-fluent-emoji-high-contrast-pizza" dynamic class="w-8 h-8 cursor-pointer shrink-0">
                </UIcon>
                <nav class="hidden md:flex items-center gap-6 justify-end">
                    <a href="#our-menu">Menu</a>
                    <a href="#about">About</a>
                    <a href="#contacts">Contacts</a>
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
                            class="uppercase text-sm text-center font-bold tracking-[8px] md:tracking-[12px] text-[#e07c0c] opacity-0 -translate-y-24">
                            Italian Restaurant</h2>
                    </div>
                    <div class="flex gap-4 items-center justify-center mt-6">
                        <a data-gsap-btn
                            class="bg-[#0C7C59] text-white min-w-[156px] tracking-wider py-2 px-4 inline-flex items-center justify-center rounded-full uppercase opacity-0 translate-y-10"
                            href="#our-menu">View Menu</a>
                        <button data-gsap-btn @click.prevent="showBookTableModal = true"
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
            <DemosCategoryTabs :categories="menuCategories" />
            <!-- Products START -->
            <div class="container">
                <div class="my-6 overflow-hidden relative" v-for="category in groupedMenu?.categories">
                    <!-- for scrolling -->
                    <div :id="category.uid" class="h-0 w-0 opacity-0 -z-10 -translate-y-[90px]"></div>
                    <h2 class="text-2xl font-bold">{{ category.name }}</h2>
                    <div v-if="category.description" class="my-2">{{ category.description }}</div>
                    <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-1">
                        <div v-for="product in groupedMenu.products[category.uid]" :key="product.uid"
                            @click.prevent="() => openModal(product.uid)"
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
                                <div class="opacity-60 leading-tight line-clamp-2 w-full mt-auto">{{ product.description
                                    }}
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
                <div v-if="!groupedMenu?.categories?.length"
                    class="grid place-content-center bg-gray-100 text-2xl h-72 my-4 rounded">
                    No products found
                </div>
                <div class="my-6">
                    <h3 class="text-2xl font-bold">Allergens</h3>
                    <div class="flex flex-wrap items-center md:justify-center gap-8 my-6">
                        <div v-for="allergen in menuData.allergens" class="flex shrink-0 gap-4">
                            <div class="grid place-content-center w-12 bg-gray-200 rounded text-2xl">{{ allergen.name }}
                            </div>
                            <div class="min-h-[48px] grid place-content-center">{{ allergen.description }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <UModal v-model:open="showModal" title="title" description="desc"
                :ui="{ content: 'sm:max-w-[375px]'}">
                <template #content>
                    <DemosViewProductModal :product="singleProduct" :allergens="menuData.allergens"
                        @close="showModal = false" />
                </template>
            </UModal>
        </section>
        <!-- Menu End -->
        <section>
            <div id="about" class="container relative">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="item in gallery" class="aspect-square rounded overflow-hidden group">
                            <img :src="item" alt="Italian Restaurant Gallery"
                                class="object-cover w-full h-full group-hover:scale-110 duration-500" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-6">
                        <div class="leading-relaxed ">
                            <h2 class="text-3xl md:text-5xl text-[#221919] font-semibold text-center mb-6 md:mb-8">About
                                us</h2>
                            <div class="text-gray-600 font-light text-lg flex flex-col gap-2.5">
                                <p> Welcome to Mama Mia, your cozy Italian dining destination! Nestled in the heart of
                                    town,
                                    Mama Mia brings the flavors of Italy right to your table.</p>
                                <p> With a passion for authentic
                                    Italian cuisine, our chefs craft each dish with care and love. From classic pasta
                                    dishes
                                    to mouthwatering pizzas, every bite is a taste of Italy's rich culinary heritage.
                                </p>
                                <p>At Mama Mia, we believe in warm hospitality and creating memorable dining experiences
                                    for our guests.</p>
                                <p>Whether you're joining us for a family dinner or a romantic evening out, we
                                    invite you to relax, indulge, and savor the flavors of Italy at Mama Mia Italian
                                    Restaurant.</p>
                            </div>

                        </div>
                        <div class="text-center md:text-left mt-4">
                            <button
                                class="text-[#0C7C59] border-[#0C7C59] border-2 tracking-wider py-2 px-4 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold">
                                Read More</button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container" id="contacts">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h2 class="text-3xl md:text-5xl text-[#221919] font-semibold text-center mb-6 md:mb-8">Contact
                            us</h2>
                        <div class="py-6 flex flex-col justify-center gap-6">
                            <a class="flex gap-4 items-center" href="tel:+43123456789">
                                <UIcon name="i-ph-phone-light" class="text-[#0C7C59] w-8 h-8" />
                                <span class="text-gray-600 text-lg">+ 43 123 456 789</span>
                            </a>
                            <a class="flex gap-4 items-center" href="mailto:contact@example.com">
                                <UIcon name="i-ph-envelope-light" class="text-[#0C7C59] w-8 h-8" />
                                <span class="text-gray-600 text-lg">contact@example.com</span>
                            </a>
                            <div class="flex gap-4 items-center">
                                <UIcon name="i-ph-map-pin-light" class="text-[#0C7C59] w-8 h-8" />
                                <span class="text-gray-600 text-lg">1234 Street Name, City Name</span>
                            </div>
                            <div class="text-center md:text-left mt-4">
                                <button @click.prevent="showBookTableModal = true"
                                    class="text-[#6D2E46] border-[#6D2E46] border-2 tracking-wider py-2 px-4 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold">Book
                                    a Table</button>
                            </div>
                        </div>
                    </div>

                    <LazyIncludesGMaps class="border border-gray-200 rounded h-[450px]"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1667.5459847272448!2d16.38995774311557!3d48.14111989888702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da908a754311d%3A0x428d931fe45f5cc0!2sFreelance%20Web%20Developer%20in%20Vienna!5e0!3m2!1sen!2sat!4v1711108396501!5m2!1sen!2sat" />
                </div>
            </div>
        </section>
        <footer class="border-t border-gray-100 bg-white">
            <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
                <div class="font-bold">Mama Mia</div>
                <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">Nick</NuxtLink>
                </div>
            </div>
        </footer>
        <UModal v-model:open="showBookTableModal" title="Reserve a Table">
            <template #body>
                <div class="flex flex-col gap-8 text-white flex-grow w-full">
                    <UFormField label="Name">
                        <UInput class="w-full" />
                    </UFormField>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <UFormField label="Email">
                            <UInput type="email" class="w-full"  />
                        </UFormField>
                        <UFormField label="Phone">
                            <UInput type="phone" class="w-full"  />
                        </UFormField>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <UFormField label="Date & Time">
                            <UInput type="datetime-local" class="w-full"  />
                        </UFormField>
                        <UFormField label="Number of guests">
                            <UInput type="number" class="w-full"  />
                        </UFormField>
                    </div>
                    <UFormField label="Message">
                        <UTextarea class="w-full"  />
                    </UFormField>
                    <UButton class="justify-center bg-[#6D2E46] hover:bg-opacity-90" size="md">Reserve</UButton>
                </div>
            </template>
        </UModal>
    </div>
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