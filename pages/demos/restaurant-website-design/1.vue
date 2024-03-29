<script setup>
import { gsap } from "gsap";
import staticMenu from '@/assets/json/demo-menu.json'

const { menuData, groupedMenu, singleProduct, selectedProductID } = useMenu(staticMenu)

const pageTitle = 'Trattoria Bella Italia'
useHead({
    title: `${pageTitle} - Restaurant Website Example`,
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Restaurant Website Example - ${pageTitle}, modern and clean design. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and our Free Menu Maker` },
    ],
    htmlAttrs: {
        class: 'scroll-smooth'
    },
})

const list = [
    {   
        id: 1,
        title: "Working Hours",
        value: 'Tue - Sun, 10:00 - 23:00',
        icon: 'ph:clock-light'
    },
    {
        id: 2,
        title: "Payment Methods",
        value: 'Cash & Cards',
        icon: 'ph:credit-card-light'
    },
    {
        id: 3,
        title: "Our Address",
        value: '1234 Street Name, City Name',
        icon: 'ph:map-pin-light'
    }
]

// 56E39F green
onMounted(() => {
    const tl = gsap.timeline();

    tl.from('[data-gsap-icons] svg', { x: 0, y: 0, stagger: 0.15, duration: 1.2, rotate: -360, autoAlpha: 0 } )
})

//modal
const showModal = ref(false)
const openModal = (product_id) => {
    selectedProductID.value = product_id
    showModal.value = true
}

</script>
<template>
    <div class="demos-restaurant-1">
        <div class="min-h-screen relative pt-16 flex flex-1 flex-col mb-10">
            <div class="border-b border-gray-100 absolute w-full top-0">
                <header class="container py-4 md:py-6 flex items-center justify-between">
                    <svg class="h-6 text-[#175676]" viewBox="0 0 236 38" xmlns="http://www.w3.org/2000/svg"
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
                        <ul class="items-center gap-6 hidden md:flex">
                            <li><a href="#about" class="px-4 py-2">About</a></li>
                            <li><a href="#gallery" class="px-4 py-2">Gallery</a></li>
                            <li><a href="#contacts">Contacts</a></li>
                        </ul>
                        <UIcon name="i-ph-list-light" class="h-8 w-8 cursor-pointer block md:hidden"></UIcon>
                    </nav>
                </header>
            </div>
            <div class="container py-8 flex flex-col flex-1">
                <div data-gsap-icons
                    class="absolute w-0 h-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-opacity-75 flex items-center justify-center opacity-70">
                    <svg data-gsap-icons xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10 text-orange-400 absolute rotate-45 invisible translate-x-[160px] -translate-y-[220px] md:translate-x-[330px] md:-translate-y-[200px]"
                        viewBox="0 0 256 256" fill="currentColor">
                        <path
                            d="M224 106h-10.23a86 86 0 0 0-171.54 0H32a6 6 0 0 0-6 6a102.35 102.35 0 0 0 56 91.06V208a14 14 0 0 0 14 14h64a14 14 0 0 0 14-14v-4.94A102.35 102.35 0 0 0 230 112a6 6 0 0 0-6-6m-49.76-51.71a74.15 74.15 0 0 1 8.15 7.6A85.89 85.89 0 0 0 130.84 106h-33.5A74.24 74.24 0 0 1 168 54c2.08 0 4.17.11 6.24.29m16.06 17.85A73.49 73.49 0 0 1 201.74 106h-57.26a73.89 73.89 0 0 1 45.82-33.86M128 38a73.68 73.68 0 0 1 26.8 5a86.32 86.32 0 0 0-69.94 63h-30.6A74.09 74.09 0 0 1 128 38m37.5 155.84a6 6 0 0 0-3.5 5.46v8.7a2 2 0 0 1-2 2H96a2 2 0 0 1-2-2v-8.7a6 6 0 0 0-3.5-5.46A90.35 90.35 0 0 1 38.2 118h179.6a90.35 90.35 0 0 1-52.3 75.84" />
                    </svg>
                    <svg data-gsap-icons xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10 text-green-400 absolute rotate-12 invisible translate-x-[120px] translate-y-[100px] md:translate-x-[300px] md:translate-y-[110px]"
                        viewBox="0 0 256 256" fill="currentColor">
                        <path
                            d="M237.6 78.9a13.9 13.9 0 0 0-3.7-18.9a181.9 181.9 0 0 0-211.8 0a13.9 13.9 0 0 0-3.7 18.9l97.8 153.7a14 14 0 0 0 23.6 0l58.4-91.8h.1ZM29.1 69.7a170.1 170.1 0 0 1 197.8 0a2.1 2.1 0 0 1 .6 2.8l-9.8 15.3a149.9 149.9 0 0 0-179.4 0l-9.8-15.3a2.1 2.1 0 0 1 .6-2.8Zm35.6 59.7a22 22 0 1 1 20.7 32.5Zm65 96.8a2.1 2.1 0 0 1-3.4 0l-33.9-53.3a34 34 0 1 0-34.7-54.5L44.7 98a137.9 137.9 0 0 1 166.6 0l-19.4 30.4a34 34 0 1 0-36.5 57.3Zm32.2-50.7A22 22 0 0 1 172 134a21.5 21.5 0 0 1 13.4 4.6Z" />
                    </svg>
                    <svg data-gsap-icons xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10 text-blue-400 absolute -rotate-12 invisible -translate-x-[140px] translate-y-[120px] md:-translate-x-[240px] md:translate-y-[140px]"
                        viewBox="0 0 256 256" fill="currentColor">
                        <path
                            d="m244.2 43.8l-32-32a5.8 5.8 0 0 0-8.4 0a5.8 5.8 0 0 0 0 8.4l3.1 3.2l-57.4 43l-38.7 7.7a5.4 5.4 0 0 0-3 1.7l-84.7 84.6a22 22 0 0 0 0 31.2l41.3 41.3a22 22 0 0 0 31.2 0l84.6-84.7a5.4 5.4 0 0 0 1.7-3l7.7-38.7l43-57.4l3.2 3.1a5.9 5.9 0 1 0 8.4-8.4ZM104 207.5L48.5 152L96 104.5l55.5 55.5Zm-31.1 16.9l-41.3-41.3a9.9 9.9 0 0 1 0-14.2l8.4-8.4L95.5 216l-8.4 8.4a10.1 10.1 0 0 1-14.2 0Zm106.3-124a6.6 6.6 0 0 0-1.1 2.4l-7.6 38.2l-10.5 10.5L104.5 96L115 85.5l38.2-7.6a6.6 6.6 0 0 0 2.4-1.1l59.8-44.9l8.7 8.7Z" />
                    </svg>
                    <svg data-gsap-icons xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10 text-red-400 absolute -rotate-45 invisible -translate-x-[160px] -translate-y-[220px] md:-translate-x-[360px] md:-translate-y-[220px]"
                        viewBox="0 0 256 256" fill="currentColor">
                        <path
                            d="M248 82H8a6 6 0 0 0-6 6a126 126 0 0 0 252 0a6 6 0 0 0-6-6M74.46 150L122 102.48v67.28A81.66 81.66 0 0 1 74.46 150M66 141.54A81.66 81.66 0 0 1 46.24 94h67.28Zm68-39.06L181.54 150A81.66 81.66 0 0 1 134 169.76Zm56 39.06L142.48 94h67.28A81.66 81.66 0 0 1 190 141.54M128 202A114.14 114.14 0 0 1 14.16 94h20a94 94 0 0 0 187.6 0h20A114.14 114.14 0 0 1 128 202" />
                    </svg>
                </div>
                <div class="text-center py-40 relative my-auto z-10">
                    <h1 class="text-5xl md:text-7xl leading-tight font-bold">Trattoria<br class="md:hidden"> Bella
                        Italia</h1>
                    <div class="text-lg text-gray-600 mt-4">A Taste of Italy in Every Bite. The Best Restaurant in Your
                        City.</div>
                    <div class="flex gap-6 items-center justify-center mt-8 md:mt-8 text-lg">
                        <a href="#our-menu"
                            class="py-1.5 w-[165px] text-center rounded-full border-2 text-[#175676] border-[#175676]">View
                            Menu</a>
                        <a href="#contacts"
                            class="py-1.5 w-[165px] text-center rounded-full border-2 border-[#8B0000] text-white bg-[#8B0000]">Book
                            a table</a>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-auto pts-8s">
                    <div v-for="item in list" :key="item.name"
                        class="cursor-pointer items-center gap-6 border-gray-200 rounded-md flex">
                        <Icon :name="item.icon"
                            class="w-12 h-12 text-[#175676] p-2 bg-[#175676] rounded-full bg-opacity-10" />
                        <div>
                            <div class="font-semibold mb-1"> {{ item.title }}</div>
                            <div class="text-gray-600">{{ item.value }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <section class="md-section" id="our-menu">
            <div class="container">
                <h2 class="text-center mb-8 title">Our Menu</h2>
            </div>
            <DemosCategoryTabs :categories="menuData.categories" :alignCenter="true" />
            <div class="container">
                <div class="my-6 overflow-hidden relative" v-for="category in groupedMenu?.categories"
                    :data-category-section="category.uid" :key="category.uid">
                    <div :id="category.uid" class="h-0 w-0 opacity-0 -z-10 -translate-y-[90px]"></div>
                    <h2 class="text-2xl font-bold">{{ category.name }}</h2>
                    <div v-if="category.description" class="mt-2 text-gray-600">{{ category.description }}</div>
                    <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-1">
                        <div v-for="product in groupedMenu.products[category.uid]" :key="product.uid"
                            @click.prevent="() => openModal(product.uid)"
                            class="snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-72">
                            <div class="h-52 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                                <div class="image-bg h-full w-full rounded-t-xl"
                                    :style="`background-image: url(${product.imageUrl})`"></div>
                            </div>
                            <div class="p-4 flex flex-col flex-grow">
                                <div class="font-bold pb-4 inline-flex flex-wrap gap-2 items-center">
                                    <span class="line-clamp-2">{{ product.name }}</span>
                                    <span v-for="item in product.allergens"
                                        class="cursor-pointer font-medium flex-shrink-0 text-gray-600 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                                        {{ menuData.allergens.find((al) => al.uid == item).name }}
                                    </span>
                                </div>
                                <div class="text-gray-600 line-clamp-2 w-full">{{ product.description}}</div>
                                <div class="pt-4 mt-auto">
                                    <div v-if="product.options?.[0]"
                                        class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-200 py-0">
                                        <div class="text-gray-400 text-sm">{{ product.options?.[0]?.size }}</div>
                                        <div class="flex gap-2 items-center">
                                            <div v-if="product.options?.[0].salePrice" class="text-lg">
                                                $ {{ product.options?.[0].salePrice }}
                                            </div>
                                            <div v-if="product.options?.[0].salePrice"
                                                class="text-red-400 line-through opacity-70 text-sm">
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
                <div v-if="!groupedMenu?.categories?.length"
                    class="grid place-content-center bg-gray-500 text-2xl h-72 my-4 rounded">
                    No products found
                </div>
                <div class="my-6">
                    <h3 class="text-2xl font-bold">Allergens</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div v-for="allergen in menuData.allergens" class="flex gap-4 items-center">
                            <div
                                class="grid place-content-center w-12 h-12 shrink-0 bg-[#175676] bg-opacity-5 text-[#175676] rounded-full text-xl">
                                {{ allergen.name }}</div>
                            <div class="min-h-[48px] grid place-content-center text-gray-600">{{ allergen.description }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UModal v-model="showModal"
                :ui="{ width: 'sm:max-w-[375px]', overlay: { background: 'bg-gray-600 bg-opacity-70' } }">
                <DemosViewProductModal :product="singleProduct" :allergens="menuData.allergens" @close="showModal = false" />
            </UModal>
        </section>
        <section>
            <div id="about"
                class="container relative grid grid-cols-1 md:grid-cols-2 shadow overflow-hidden rounded bg-[#1e1f23] text-white">
                <div class="px-6 md:px-20 py-14  grid place-content-center">
                    <h2 class="text-center mb-8 title">About</h2>
                    <div class="text-lg font-light">
                        <p>It is a long established fact that a reader will be distracted by the readable content of a
                            page when looking at its layout.</p>
                        <p class="mt-4">The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                            of letters, as opposed.</p>
                        <p class="mt-4">There are many variations of passages of Lorem Ipsum available, but the
                            majority.</p>
                    </div>
                    <a href="#"
                        class="mx-auto mt-16 py-1.5 w-[165px] text-center rounded-full border-2 border-white text-white">Read
                        more</a>
                </div>
                <div class="md:h-[640px]">
                    <img src="https://images.pexels.com/photos/6192571/pexels-photo-6192571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="about us" class="w-full h-full object-cover" />
                </div>
            </div>
        </section>
        <section class="md-section">
            <div id="gallery" class="container relative">
                <h2 class="text-center mb-8 title">Gallery</h2>
                <div
                    class="grid md:grid-cols-4 md:grid-rows-[repeat(2,300px)] gap-4 grid-cols-2 grid-rows-[repeat(4,200px)]">
                    <div class="row-span-2 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/1741285/pexels-photo-1741285.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded">
                    </div>
                    <div class="row-span-2 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded">
                    </div>
                    <div
                        class="row-span-1 md:col-start-3 md:col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/4431588/pexels-photo-4431588.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded">
                    </div>
                    <div
                        class="row-span-1 md:col-start-4 col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/2899737/pexels-photo-2899737.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded">
                    </div>
                    <div
                        class="row-span-1 md:col-start-3 col-span-2 md:row-start-2 row-start-4 hover:-translate-y-2 duration-700">
                        <img src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg"
                            alt="Italian Restaurant Gallery" class="w-full h-full object-cover rounded">
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div id="contacts" class="container relative contacts-section">
                <h2 class="text-center mb-8 title">Contacts</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 rounded overflow-hidden shadow bg-[#1e1f23] text-white">
                    <div class="md:h-ss[800px] order-2 md:-order-1">
                        <img src="https://images.pexels.com/photos/6605646/pexels-photo-6605646.jpeg" alt="about us"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="p-6 py-12 md:px-12 grid place-content-center grid-cols-1">
                        <div class="text-center">
                            <div class="mb-4 text-lg text-gray-200">Call us</div>
                            <a href="tel:0 123 456 789" class="font-bold text-3xl"> 0 123 456 789</a>
                        </div>
                        <UDivider label="OR" class="my-16" />
                        <div class="text-center mb-4 text-lg text-gray-200">Reserve a table</div>
                        <div class="flex flex-col gap-8 text-white flex-grow w-full">
                            <UFormGroup label="Name">
                                <UInput />
                            </UFormGroup>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <UFormGroup label="Email">
                                    <UInput type="email" />
                                </UFormGroup>
                                <UFormGroup label="Phone">
                                    <UInput type="phone" />
                                </UFormGroup>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <UFormGroup label="Date & Time">
                                    <UInput type="datetime-local" />
                                </UFormGroup>
                                <UFormGroup label="Number of guests">
                                    <UInput type="number" />
                                </UFormGroup>
                            </div>
                            <UFormGroup label="Message">
                                <UTextarea />
                            </UFormGroup>
                            <UButton class="justify-center bg-[#8B0000] hover:bg-opacity-90" size="md">Reserve</UButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="border-t border-r-gray-100">
            <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
                <svg class="h-6 text-[#175676]" viewBox="0 0 236 38" xmlns="http://www.w3.org/2000/svg"
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
                <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">me</NuxtLink>
                </div>
            </div>
        </footer>
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
    }
</style>