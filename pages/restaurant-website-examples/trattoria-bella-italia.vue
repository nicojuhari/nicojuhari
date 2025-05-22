<script setup>

import staticMenu from '@/assets/json/demo-menu.json'

const { menuData, groupedMenu, singleProduct, selectedProductID, menuCategories } = useMenu(staticMenu)

useHead({
    title: `Trattoria Bella Italia | Restaurant Website Example`,
    htmlAttrs: {
        class: 'scroll-smooth'
    },
})

const list = [
    {   
        id: 1,
        title: "We are open, on",
        value: 'Tue - Sun, 10:00 - 23:00',
        icon: 'i-ph-clock-light'
    },
    {
        id: 2,
        title: "We accept",
        value: 'Cash & Cards',
        icon: 'i-ph-credit-card-light'
    },
    {
        id: 3,
        title: "Our Address",
        value: '1234 Street Name, City Name',
        icon: 'i-ph-map-pin-light'
    }
]

const filteredCategories = ref([...menuCategories.value])

const selectedCategory = ref('')
watch(selectedCategory, (newVal) => {
  // Filter the categories based on the selected category
  if (newVal !== '') {
    filteredCategories.value = menuCategories.value.filter(item => item.uid === newVal);
  } else {
    filteredCategories.value = menuCategories.value; // Show all items if no category is selected
  }
});

//modal
const showModal = ref(false)
const openModal = (product_id) => {
    selectedProductID.value = product_id
    showModal.value = true
}

const singleProducAllergens = computed(() => {
    let pa = []
    if(singleProduct?.value?.allergens) {

        pa = singleProduct.value?.allergens.map((al) => {
            return menuData.value?.allergens.find(item => item.uid === al)
        })
    } 


    return JSON.parse(JSON.stringify(pa));
})

//Book a table Modal
const showBookTable = ref(false)

//Hero Image
//https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg
const heroImageUrl = 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg'
// const heroImageUrl = 'https://images.pexels.com/photos/27582711/pexels-photo-27582711/free-photo-of-a-pizza-with-cheese-pepperoni-and-other-toppings.jpeg'

const reviews = [
    {
        name: 'Emily',
        text: 'The pasta was divine and the ambiance perfect!'
    },
    {
        name: 'Mark',
        text: 'Best pizza in town—absolutely loved it!'
    },
    {
        name: 'Sofia',
        text: 'Every bite was a culinary delight—truly unforgettable!'
    }
]
</script>
<template>
    <div class="demos-restaurant-1">
        <div class="min-h-screen relative flex flex-1 flex-col text-white">
            <img class="absolute inset-0 object-cover block h-full w-full" :src="heroImageUrl"/>
                <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(6,6,6,0.6) 0%, rgba(6,6,6,0.6) 80%, rgba(6,6,6,1) 100%);"></div>
            <header class="container relative h-14 flex items-center justify-between">
                <svg class="h-5 text-white" viewBox="0 0 236 38" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor">
                    <path
                        d="M35.1752 13.0654C37.3433 26.5299 32.2471 32.2798 26.591 34.6608C25.3639 34.6144 24.4367 34.2187 23.8382 33.48C23.7 33.31 23.5837 33.1268 23.484 32.9368C27.7508 30.8797 32.1792 27.7156 32.2593 23.4239C32.3804 17.0366 30.0018 26.1963 23.1348 32.0008C22.8035 30.6799 23.0356 29.3487 23.0385 29.3311L23.0527 29.2568L23.0488 29.1821C22.5481 24.102 23.5373 24.102 18.8373 19.7728C18.8373 19.7728 21.1875 17.2989 26.6296 17.2989C32.0727 17.2984 33.206 15.1411 35.1752 13.0654Z" />
                    <path
                        d="M9.11817 26.3013C7.07373 17.7674 14.0952 32.5832 26.1234 35.9231L26.2006 35.2978C20.8655 35.141 21.9642 29.1777 21.9642 29.1777C21.4933 18.1924 9.40982 17.2501 9.40982 17.2501C2.66145 16.3087 0.052772 13.0127 0.052772 13.0127C-1.35953 43.7726 26.0443 36.5533 26.0443 36.5533L26.1015 36.099C20.209 35.2382 10.6848 32.8445 9.11817 26.3013Z" />
                    <path
                        d="M42.0002 0.299465C38.0188 1.67562 34.1468 6.18316 31.6232 9.68094V9.68191C28.4165 9.02633 23.3882 8.60327 17.7317 8.60327C8.04736 8.60327 0.196411 9.84117 0.196411 11.3678C0.196411 12.0024 1.554 12.5861 3.83146 13.0527C4.81631 12.2202 10.7039 11.5808 17.8231 11.5808C22.5118 11.5808 26.6633 11.8583 29.2348 12.2857L27.9813 12.8822C25.5485 12.5456 21.9779 12.3326 17.9975 12.3326C11.9272 12.3326 6.8119 12.828 5.22569 13.5036C8.95063 14.2603 19.0668 15.8196 30.2651 13.339C31.1698 13.2285 31.8489 13.0556 32.3193 12.9008C32.3784 12.8866 32.4405 12.8729 32.4976 12.8592C32.5577 12.8446 32.6188 12.8294 32.6769 12.8148C32.7477 12.7967 32.8132 12.7786 32.8811 12.7605C32.9422 12.7439 33.0042 12.7273 33.0633 12.7102C33.1273 12.6922 33.1884 12.6741 33.2494 12.656C33.3105 12.6379 33.3696 12.6199 33.4268 12.6013C33.483 12.5837 33.5386 12.5666 33.5919 12.5485C33.6569 12.5265 33.7189 12.5051 33.78 12.4831C33.822 12.4684 33.8659 12.4528 33.907 12.4381C34.0003 12.4025 34.0882 12.3673 34.1722 12.3316C34.2084 12.316 34.2431 12.3004 34.2773 12.2852C34.3286 12.2618 34.3804 12.2383 34.4292 12.2139C34.4624 12.1973 34.4952 12.1807 34.5264 12.1641C34.5723 12.1396 34.6173 12.1152 34.6583 12.0903C34.6852 12.0752 34.7125 12.0595 34.7375 12.0439C34.7888 12.0117 34.8366 11.9789 34.8806 11.9462C34.8918 11.9379 34.9036 11.931 34.9128 11.9227C34.9651 11.8827 35.0101 11.8416 35.0511 11.8011C35.0643 11.7879 35.076 11.7742 35.0882 11.7606C35.1141 11.7317 35.138 11.7024 35.1581 11.6736C35.1683 11.6589 35.1781 11.6433 35.1869 11.6282C35.205 11.5984 35.2182 11.5691 35.2299 11.5393C35.2357 11.5256 35.2421 11.5124 35.246 11.4982C35.2582 11.4557 35.267 11.4118 35.267 11.3683C35.267 11.3258 35.2582 11.2828 35.246 11.2403C35.2421 11.2271 35.2372 11.2144 35.2318 11.2022C35.2206 11.1714 35.2059 11.1411 35.1879 11.1103C35.1801 11.0967 35.1727 11.0835 35.1639 11.0703C35.138 11.0332 35.1087 10.9955 35.0731 10.9584C35.0692 10.954 35.0662 10.9496 35.0628 10.9457C35.0237 10.9052 34.9768 10.8651 34.9265 10.8255C34.9094 10.8119 34.8913 10.7992 34.8723 10.7855C34.8352 10.7576 34.7941 10.7303 34.7511 10.7024C34.7292 10.6887 34.7081 10.6751 34.6842 10.6614C34.631 10.6296 34.5733 10.5979 34.5132 10.5661C34.4981 10.5583 34.4854 10.551 34.4702 10.5432C34.4702 10.5432 34.4693 10.5427 34.4683 10.5427C37.0599 8.23786 40.2103 5.76206 40.2103 5.76206C47.4467 0.148513 42.0002 0.299465 42.0002 0.299465Z" />
                    <path
                        d="M69.0687 35.2113H62.7546V7.8816H54.5085V1.66174H77.3147V7.8816H69.0687V35.2113ZM84.6183 35.2113H78.6812V13.6303H84.6183V15.3737C86.3147 13.6774 88.8591 13.1119 90.5555 13.1119H91.9691L90.5555 19.002H89.6602C86.8801 19.002 84.6183 21.1695 84.6183 23.7611V35.2113ZM104.739 35.6354C101.77 35.6354 98.9429 34.5045 96.7753 32.3841C94.6549 30.2166 93.4769 27.3893 93.4769 24.4208C93.4769 21.4522 94.6549 18.625 96.7753 16.4575C98.8957 14.3371 101.723 13.2062 104.739 13.2062C106.718 13.2062 108.508 13.913 110.063 15.3266L110.299 15.5151V13.6303H116V35.2113H110.299V33.515L110.063 33.7506C108.367 35.3998 106.435 35.6354 104.739 35.6354ZM104.739 18.7192C101.723 18.7192 99.1785 21.358 99.1785 24.4208C99.1785 27.5307 101.723 30.1223 104.739 30.1223C107.754 30.1223 110.299 27.5307 110.299 24.4208C110.299 21.358 107.754 18.7192 104.739 18.7192ZM136.639 35.2113H130.985C128.911 35.2113 126.979 34.4103 125.566 32.9966C124.105 31.5359 123.351 29.6511 123.351 27.5778V18.625H120.335V13.7716H123.351V5.29H128.958V13.7716H135.225V18.625H128.958V27.4836C128.958 28.6616 129.995 29.7454 131.032 29.7454H135.131L136.639 35.2113ZM154.874 35.2113H149.22C147.147 35.2113 145.215 34.4103 143.801 32.9966C142.341 31.5359 141.587 29.6511 141.587 27.5778V18.625H138.571V13.7716H141.587V5.29H147.194V13.7716H153.461V18.625H147.194V27.4836C147.194 28.6616 148.231 29.7454 149.267 29.7454H153.367L154.874 35.2113ZM167.927 35.7296C165.005 35.7296 162.131 34.5516 159.916 32.4312C157.796 30.2166 156.618 27.3422 156.618 24.4208C156.618 21.4522 157.796 18.5779 159.916 16.4104C162.084 14.3371 164.911 13.1591 167.927 13.1591C171.037 13.1591 173.864 14.3371 175.89 16.4104C178.058 18.5779 179.236 21.4051 179.236 24.4208C179.236 27.4365 178.058 30.2637 175.89 32.4312C173.77 34.5516 170.942 35.7296 167.927 35.7296ZM167.927 18.5308C164.77 18.5308 162.178 21.1695 162.178 24.4208C162.178 27.6721 164.77 30.3108 167.927 30.3108C171.131 30.3108 173.723 27.6721 173.723 24.4208C173.723 21.1695 171.131 18.5308 167.927 18.5308ZM189.461 35.2113H183.524V13.6303H189.461V15.3737C191.157 13.6774 193.702 13.1119 195.398 13.1119H196.811L195.398 19.002H194.503C191.722 19.002 189.461 21.1695 189.461 23.7611V35.2113ZM207.508 35.2113H201.382V13.6303H207.508V35.2113ZM204.445 11.0387C202.419 11.0387 200.77 9.38945 200.77 7.4104C200.77 6.42088 201.147 5.5256 201.853 4.86591C202.56 4.15911 203.455 3.78215 204.445 3.78215C206.424 3.78215 208.073 5.43135 208.073 7.4104C208.073 9.38945 206.424 11.0387 204.445 11.0387ZM223.953 35.6354C220.984 35.6354 218.157 34.5045 215.989 32.3841C213.869 30.2166 212.691 27.3893 212.691 24.4208C212.691 21.4522 213.869 18.625 215.989 16.4575C218.11 14.3371 220.937 13.2062 223.953 13.2062C225.932 13.2062 227.722 13.913 229.277 15.3266L229.513 15.5151V13.6303H235.214V35.2113H229.513V33.515L229.277 33.7506C227.581 35.3998 225.649 35.6354 223.953 35.6354ZM223.953 18.7192C220.937 18.7192 218.392 21.358 218.392 24.4208C218.392 27.5307 220.937 30.1223 223.953 30.1223C226.968 30.1223 229.513 27.5307 229.513 24.4208C229.513 21.358 226.968 18.7192 223.953 18.7192Z" />
                </svg>
                <nav>
                    <ul class="items-center gap-6 hidden md:flex text-gray-300">
                        <li><a href="#about" class="px-4 py-2">About</a></li>
                        <li><a href="#gallery" class="px-4 py-2">Gallery</a></li>
                        <li><a href="#contacts">Contacts</a></li>
                    </ul>
                    <UIcon name="i-ph-list-light" class="h-8 w-8 cursor-pointer block md:hidden"></UIcon>
                </nav>
            </header>
            <div class="container flex flex-col flex-1">
                <div class="text-center my-auto relative z-10">
                    <h1 class="text-6xl md:text-7xl leading-tight font-bold">Trattoria<br class="md:hidden"> Bella
                        Italia</h1>
                    <div class="text-xl text-gray-300 mt-2">A Taste of Italy in Every Bite.</div>
                    <div class="flex gap-8 items-center justify-center mt-8 md:mt-12 text-lg">
                        <a href="#our-menu"
                            class="py-1.5 w-[165px] text-center rounded-full border text-white border-white">Menu</a>
                        <button @click="showBookTable = true"
                            class="py-1.5 w-[165px] text-center rounded-full border border-[#8f0707] text-white bg-[#8f0707]">Book a Table</button>
                    </div>
                </div>
            </div>
            <UCarousel v-slot="{ item }" :items="reviews" fade loop :autoplay="{ delay: 4000 }" class="w-full max-w-xl mx-auto pb-8 lg:pb-12 px-6">
                <div class="text-center flex justify-center gap-1 mx-auto mb-2">
                    <UIcon name="i-ph-star-fill" v-for="item in 5" class="w-5 h-5 text-yellow-500" />
                </div>
                <div class="text-center">
                   <div class="text-xl my-4">{{ item.text }}</div> 
                    <div class="italic">{{ item.name }}</div>
                </div>
            </UCarousel>
        </div>
        <div class="bg-white py-8">
            <div class="grid grid-cols-1 lg:flex justify-evenly gap-8 container">
                <div v-for="item in list" :key="item.name"
                    class="items-center gap-4 flex">
                    <Icon :name="item.icon"
                        class="w-10 h-10 text-[#060606]/50" />
                    <div>
                        <!-- <div class=" text-gray-600"> {{ item.title }}</div> -->
                        <div class="text-lg">{{ item.value }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container pt-16" id="our-menu">
            <h2 class="text-center mb-8 title">Our Menu</h2>
            <div class="flex gap-4 my-6 lg:justify-center overflow-auto">
                <div v-for="category in [{ uid: '', name: 'View All' }, ...menuCategories]" :key="category.uid" @click="selectedCategory = category.uid"
                    :class="{ '!border-[#060606] !text-white !bg-[#060606]': selectedCategory == category.uid }"
                    class="border border-[#060606] text-[#060606] py-2 px-4 h-10 inline-flex items-center rounded-full cursor-pointer flex-shrink-0 duration-500"
                    :data-category-tab="category.uid"> {{ category.name }}
                </div>
            </div>
            <!-- <DemosCategoryTabs :categories="menuCategories" :alignCenter="true" /> -->
            <div class="my-8 overflow-hidden relative" v-for="category in filteredCategories"
                :data-category-section="category.uid" :key="category.uid">
                <h3 class="text-2xl font-bold">{{ category.name }}</h3>
                <div v-if="category.description" class="my-2 text-gray-600">{{ category.description }}</div>
                <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 mt-2 px-0.5">
                    <div v-for="product in groupedMenu.products[category.uid]" :key="product.uid"
                        @click.prevent="() => openModal(product.uid)"
                        class="snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-72 p-4">
                        <img :src="product?.imageUrl" class="w-full h-full aspect-square object-cover rounded-lg" :alt="product.title" />

                        <div class="pt-4 flex flex-col flex-grow">
                            <div class="font-semibold mb-4 hs-12">
                                <span class="line-clamp-1">{{ product.name }}</span>
                                <!-- <span v-for="item in product.allergens"
                                    class="cursor-pointer font-medium flex-shrink-0 text-gray-600 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                                    {{ menuData.allergens.find((al) => al.uid == item).name }}
                                </span> -->
                            </div>
                            <!-- <div class="text-gray-600 line-clamp-1 w-full">{{ product.description}}</div> -->
                            <div class="mt-auto">
                                <div v-if="product.options?.[0]"
                                    class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-200 py-0">
                                    <div class="text-gray-400 text-sm">{{ product.options?.[0]?.size }}</div>
                                    <div class="flex gap-2 items-center">
                                        <div v-if="product.options?.[0].salePrice" class="text-lg">
                                            ${{ product.options?.[0].salePrice }}
                                        </div>
                                        <div v-if="product.options?.[0].salePrice"
                                            class="text-[#8f0707] line-through opacity-70 text-sm">
                                            ${{ product.options?.[0].price }}
                                        </div>
                                        <div v-else class="text-lg">
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
            <div v-if="!menuCategories?.length"
                class="grid place-content-center bg-gray-500 text-2xl h-72 my-4 rounded">
                No products found
            </div>
            <!-- Allergens -->
            <!-- <div class="my-6">
                <h3 class="text-2xl font-bold text-center">Allergens</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 p-6 rounded-xl border border-gray-200">
                    <div v-for="allergen in menuData.allergens" class="flex gap-4 items-center">
                        <div
                            class="grid place-content-center w-8 h-8 shrink-0 bg-[#175676]/5 text-[#060606] rounded-full text-lg">
                            {{ allergen.name }}</div>
                        <div class="min-h-[48px] grid place-content-center">{{ allergen.description }}
                        </div>
                    </div>
                </div>
            </div> -->
            <UModal v-model:open="showModal" :title="singleProduct.name"
                :ui="{ content: 'sm:max-w-[375px]', overlay: 'bg-gray-700/50' }">
                <template #body>
                    
                    <DemosViewProductModal :product="singleProduct" :allergens="menuData.allergens" @close="showModal = false" />
                </template>
            </UModal>
        </div>
        <div id="about" class="container pt-16">
            <h2 class="text-center my-8 title">About</h2>
            <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1e1f23] rounded-lg overflow-hidden">
                <div class="grid place-content-center p-4 lg:p-8 !py-10 text-white">
                    <h3 class="text-center my-8 subtitle">We are the BEST!</h3>
                    <div class="text-xl font-light">
                        <p>It is a long established fact that a reader will be distracted by the readable content of a
                            page when looking at its layout.</p>
                        <p class="mt-6">The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                            of letters, as opposed.</p>
                        <p class="mt-6">There are many variations of passages of Lorem Ipsum available, but the
                            majority.</p>
                    </div>
                    <div class="text-center mt-10">
                        <a href="#" class="py-1.5 w-[165px] block mx-auto text-lg text-center rounded-full border text-white border-white">Read More</a>
                    </div>
                </div>
                <div>
                    <img src="https://images.pexels.com/photos/1653702/pexels-photo-1653702.jpeg" loading="lazy"
                            alt="Italian Restaurant" class="w-full h-full object-cover object-top aspect-square lg:aspect-auto" />
                </div>
            </div>
        </div>
        <div id="gallery" class="container pt-16 relative">
                <h2 class="text-center my-8 title">Gallery</h2>
                <div
                    class="grid md:grid-cols-4 md:grid-rows-[repeat(2,300px)] gap-4 grid-cols-2 grid-rows-[repeat(4,200px)]">
                    <div class="row-span-2 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/1741285/pexels-photo-1741285.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded-lg">
                    </div>
                    <div class="row-span-2 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded-lg">
                    </div>
                    <div
                        class="row-span-1 md:col-start-3 md:col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/4431588/pexels-photo-4431588.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded-lg">
                    </div>
                    <div
                        class="row-span-1 md:col-start-4 col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/2899737/pexels-photo-2899737.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded-lg">
                    </div>
                    <div
                        class="row-span-1 md:col-start-3 col-span-2 md:row-start-2 row-start-4 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded-lg">
                    </div>
                </div>
            </div>
        <div id="contacts" class="container pt-12 relative contacts-section">
            <h2 class="text-center my-8 title">Contacts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden shadow bg-[#1e1f23] text-white">
                <div class="order-2 md:-order-1">
                    <iframe class="aspect-square lg:aspect-auto" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85202.50648522568!2d16.31816273283411!3d48.13765471089203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da908a754311d%3A0x428d931fe45f5cc0!2sNick%20-%20Freelancer%20and%20Full-Stack%20Web%20Developer!5e0!3m2!1sen!2sat!4v1740352332713!5m2!1sen!2sat" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <!-- <img src="https://images.pexels.com/photos/6192571/pexels-photo-6192571.jpeg" alt="about us"
                        class="w-full h-full object-cover" /> -->
                </div>
                <div class="p-6 py-12 md:px-12 grid place-content-center grid-cols-1">
                    <div class="text-center">
                        <div class="mb-4 text-lg text-gray-200">We are open</div>
                        <div class="font-bold text-3xl">Tue - Sun, 10:00 - 23:00</div>
                    </div>
                    <hr class="my-12 opacity-20" />
                    <div class="text-center">
                        <div class="mb-4 text-lg text-gray-200">Call us</div>
                        <a href="tel:0 123 456 789" class="font-bold text-3xl"> 0 123 456 789</a>
                    </div>
                    <hr class="my-12 opacity-20" />
                    <div class="font-bold text-3xl text-center mb-8">Message us</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <UFormField label="Name">
                            <UInput type="text" class="w-full" size="lg" />
                        </UFormField>
                        <UFormField label="Email">
                            <UInput type="email" class="w-full" size="lg" />
                        </UFormField>
                    </div>
                    <UFormField label="Your message" class="mt-8">
                            <UTextarea class="w-full" />
                        </UFormField>
                    <div class="mt-8">
                         <button
                            class="py-1.5 w-full text-center rounded border border-[#8f0707] text-white bg-[#8f0707]">Send</button>
                    
                    </div>
                </div>
            </div>
        </div>
        <footer class="border-t border-gray-100 mt-6 bg-white">
            <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
                <svg class="h-6 text-[#060606]" viewBox="0 0 236 38" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor">
                    <path
                        d="M35.1752 13.0654C37.3433 26.5299 32.2471 32.2798 26.591 34.6608C25.3639 34.6144 24.4367 34.2187 23.8382 33.48C23.7 33.31 23.5837 33.1268 23.484 32.9368C27.7508 30.8797 32.1792 27.7156 32.2593 23.4239C32.3804 17.0366 30.0018 26.1963 23.1348 32.0008C22.8035 30.6799 23.0356 29.3487 23.0385 29.3311L23.0527 29.2568L23.0488 29.1821C22.5481 24.102 23.5373 24.102 18.8373 19.7728C18.8373 19.7728 21.1875 17.2989 26.6296 17.2989C32.0727 17.2984 33.206 15.1411 35.1752 13.0654Z" />
                    <path
                        d="M9.11817 26.3013C7.07373 17.7674 14.0952 32.5832 26.1234 35.9231L26.2006 35.2978C20.8655 35.141 21.9642 29.1777 21.9642 29.1777C21.4933 18.1924 9.40982 17.2501 9.40982 17.2501C2.66145 16.3087 0.052772 13.0127 0.052772 13.0127C-1.35953 43.7726 26.0443 36.5533 26.0443 36.5533L26.1015 36.099C20.209 35.2382 10.6848 32.8445 9.11817 26.3013Z" />
                    <path
                        d="M42.0002 0.299465C38.0188 1.67562 34.1468 6.18316 31.6232 9.68094V9.68191C28.4165 9.02633 23.3882 8.60327 17.7317 8.60327C8.04736 8.60327 0.196411 9.84117 0.196411 11.3678C0.196411 12.0024 1.554 12.5861 3.83146 13.0527C4.81631 12.2202 10.7039 11.5808 17.8231 11.5808C22.5118 11.5808 26.6633 11.8583 29.2348 12.2857L27.9813 12.8822C25.5485 12.5456 21.9779 12.3326 17.9975 12.3326C11.9272 12.3326 6.8119 12.828 5.22569 13.5036C8.95063 14.2603 19.0668 15.8196 30.2651 13.339C31.1698 13.2285 31.8489 13.0556 32.3193 12.9008C32.3784 12.8866 32.4405 12.8729 32.4976 12.8592C32.5577 12.8446 32.6188 12.8294 32.6769 12.8148C32.7477 12.7967 32.8132 12.7786 32.8811 12.7605C32.9422 12.7439 33.0042 12.7273 33.0633 12.7102C33.1273 12.6922 33.1884 12.6741 33.2494 12.656C33.3105 12.6379 33.3696 12.6199 33.4268 12.6013C33.483 12.5837 33.5386 12.5666 33.5919 12.5485C33.6569 12.5265 33.7189 12.5051 33.78 12.4831C33.822 12.4684 33.8659 12.4528 33.907 12.4381C34.0003 12.4025 34.0882 12.3673 34.1722 12.3316C34.2084 12.316 34.2431 12.3004 34.2773 12.2852C34.3286 12.2618 34.3804 12.2383 34.4292 12.2139C34.4624 12.1973 34.4952 12.1807 34.5264 12.1641C34.5723 12.1396 34.6173 12.1152 34.6583 12.0903C34.6852 12.0752 34.7125 12.0595 34.7375 12.0439C34.7888 12.0117 34.8366 11.9789 34.8806 11.9462C34.8918 11.9379 34.9036 11.931 34.9128 11.9227C34.9651 11.8827 35.0101 11.8416 35.0511 11.8011C35.0643 11.7879 35.076 11.7742 35.0882 11.7606C35.1141 11.7317 35.138 11.7024 35.1581 11.6736C35.1683 11.6589 35.1781 11.6433 35.1869 11.6282C35.205 11.5984 35.2182 11.5691 35.2299 11.5393C35.2357 11.5256 35.2421 11.5124 35.246 11.4982C35.2582 11.4557 35.267 11.4118 35.267 11.3683C35.267 11.3258 35.2582 11.2828 35.246 11.2403C35.2421 11.2271 35.2372 11.2144 35.2318 11.2022C35.2206 11.1714 35.2059 11.1411 35.1879 11.1103C35.1801 11.0967 35.1727 11.0835 35.1639 11.0703C35.138 11.0332 35.1087 10.9955 35.0731 10.9584C35.0692 10.954 35.0662 10.9496 35.0628 10.9457C35.0237 10.9052 34.9768 10.8651 34.9265 10.8255C34.9094 10.8119 34.8913 10.7992 34.8723 10.7855C34.8352 10.7576 34.7941 10.7303 34.7511 10.7024C34.7292 10.6887 34.7081 10.6751 34.6842 10.6614C34.631 10.6296 34.5733 10.5979 34.5132 10.5661C34.4981 10.5583 34.4854 10.551 34.4702 10.5432C34.4702 10.5432 34.4693 10.5427 34.4683 10.5427C37.0599 8.23786 40.2103 5.76206 40.2103 5.76206C47.4467 0.148513 42.0002 0.299465 42.0002 0.299465Z" />
                    <path
                        d="M69.0687 35.2113H62.7546V7.8816H54.5085V1.66174H77.3147V7.8816H69.0687V35.2113ZM84.6183 35.2113H78.6812V13.6303H84.6183V15.3737C86.3147 13.6774 88.8591 13.1119 90.5555 13.1119H91.9691L90.5555 19.002H89.6602C86.8801 19.002 84.6183 21.1695 84.6183 23.7611V35.2113ZM104.739 35.6354C101.77 35.6354 98.9429 34.5045 96.7753 32.3841C94.6549 30.2166 93.4769 27.3893 93.4769 24.4208C93.4769 21.4522 94.6549 18.625 96.7753 16.4575C98.8957 14.3371 101.723 13.2062 104.739 13.2062C106.718 13.2062 108.508 13.913 110.063 15.3266L110.299 15.5151V13.6303H116V35.2113H110.299V33.515L110.063 33.7506C108.367 35.3998 106.435 35.6354 104.739 35.6354ZM104.739 18.7192C101.723 18.7192 99.1785 21.358 99.1785 24.4208C99.1785 27.5307 101.723 30.1223 104.739 30.1223C107.754 30.1223 110.299 27.5307 110.299 24.4208C110.299 21.358 107.754 18.7192 104.739 18.7192ZM136.639 35.2113H130.985C128.911 35.2113 126.979 34.4103 125.566 32.9966C124.105 31.5359 123.351 29.6511 123.351 27.5778V18.625H120.335V13.7716H123.351V5.29H128.958V13.7716H135.225V18.625H128.958V27.4836C128.958 28.6616 129.995 29.7454 131.032 29.7454H135.131L136.639 35.2113ZM154.874 35.2113H149.22C147.147 35.2113 145.215 34.4103 143.801 32.9966C142.341 31.5359 141.587 29.6511 141.587 27.5778V18.625H138.571V13.7716H141.587V5.29H147.194V13.7716H153.461V18.625H147.194V27.4836C147.194 28.6616 148.231 29.7454 149.267 29.7454H153.367L154.874 35.2113ZM167.927 35.7296C165.005 35.7296 162.131 34.5516 159.916 32.4312C157.796 30.2166 156.618 27.3422 156.618 24.4208C156.618 21.4522 157.796 18.5779 159.916 16.4104C162.084 14.3371 164.911 13.1591 167.927 13.1591C171.037 13.1591 173.864 14.3371 175.89 16.4104C178.058 18.5779 179.236 21.4051 179.236 24.4208C179.236 27.4365 178.058 30.2637 175.89 32.4312C173.77 34.5516 170.942 35.7296 167.927 35.7296ZM167.927 18.5308C164.77 18.5308 162.178 21.1695 162.178 24.4208C162.178 27.6721 164.77 30.3108 167.927 30.3108C171.131 30.3108 173.723 27.6721 173.723 24.4208C173.723 21.1695 171.131 18.5308 167.927 18.5308ZM189.461 35.2113H183.524V13.6303H189.461V15.3737C191.157 13.6774 193.702 13.1119 195.398 13.1119H196.811L195.398 19.002H194.503C191.722 19.002 189.461 21.1695 189.461 23.7611V35.2113ZM207.508 35.2113H201.382V13.6303H207.508V35.2113ZM204.445 11.0387C202.419 11.0387 200.77 9.38945 200.77 7.4104C200.77 6.42088 201.147 5.5256 201.853 4.86591C202.56 4.15911 203.455 3.78215 204.445 3.78215C206.424 3.78215 208.073 5.43135 208.073 7.4104C208.073 9.38945 206.424 11.0387 204.445 11.0387ZM223.953 35.6354C220.984 35.6354 218.157 34.5045 215.989 32.3841C213.869 30.2166 212.691 27.3893 212.691 24.4208C212.691 21.4522 213.869 18.625 215.989 16.4575C218.11 14.3371 220.937 13.2062 223.953 13.2062C225.932 13.2062 227.722 13.913 229.277 15.3266L229.513 15.5151V13.6303H235.214V35.2113H229.513V33.515L229.277 33.7506C227.581 35.3998 225.649 35.6354 223.953 35.6354ZM223.953 18.7192C220.937 18.7192 218.392 21.358 218.392 24.4208C218.392 27.5307 220.937 30.1223 223.953 30.1223C226.968 30.1223 229.513 27.5307 229.513 24.4208C229.513 21.358 226.968 18.7192 223.953 18.7192Z" />
                </svg>
                <div class="gap-2.5 flex items-center text-center justify-center">Created with <UIcon name="i-ph-heart-fill" class="text-red-600 h-4"></UIcon><nuxt-link to="https://nicojuhari.com/">by Nick</nuxt-link></div>
                <!-- <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">me</NuxtLink>
                </div> -->
            </div>
        </footer>
        <UModal v-model:open="showBookTable" title="Book a Table" :ui="{ overlay: 'bg-[#060606]/50'}">
            <template #body>
                <div class="flex flex-col gap-8 flex-grow w-full">
                        <UFormField label="Name">
                            <UInput class="w-full"/>
                        </UFormField>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <UFormField label="Email">
                                <UInput type="email" class="w-full" />
                            </UFormField>
                            <UFormField label="Phone">
                                <UInput type="phone" class="w-full" />
                            </UFormField>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <UFormField label="Date & Time">
                                <UInput type="datetime-local" class="w-full" />
                            </UFormField>
                            <UFormField label="Number of guests">
                                <UInput type="number" class="w-full" />
                            </UFormField>
                        </div>
                        <UFormField label="Something else?">
                            <UTextarea class="w-full" />
                        </UFormField>
                        <button
                            class="py-1.5 w-full text-center rounded border border-[#8f0707] text-white bg-[#8f0707]">Book</button>
                    </div>
            </template>
        </UModal>
    </div>
</template>
<style>
    .contacts-section label, .contacts-section span {
        color: #fff;
    }

    .contacts-section input, .contacts-section textarea {
        --tw-bg-opacity: .1;
        color: #fff;
        box-shadow: none;
        background: rgb(255 255 255 / 10%);
    }
</style>