<script setup>
useHead({
    title: 'Restaurant Website Design Example - GUD Restaurant',
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Demo website for GUD Restaurant, modern and clean design. Created with LOVE using Nuxt.js, TailwindCSS and Free Menu Maker` },
    ],
    htmlAttrs: {
        class: 'scroll-smooth'
    },
})

const list = [
    {
        name: 'Lucia',
        review: 'Cel mai gustos burger din lume',
    },
    {
        name: 'Nicolae',
        review: 'Eu am mai mîncat, dar așa de GUD niciodată',
    },
    {
        name: 'Constantin',
        review: 'Mai gustos decît la mama acasă',
    },
    {
        name: 'Ana',
        review: 'Cel mai gustos burger din lume',
    }
]

const currentReview = ref(0)

onMounted(() => {
    setInterval(() => {
        currentReview.value = (currentReview.value + 1) % list.length
    }, 4000)
})
</script>
<template>
    <div class="absolute top-0 left-0 w-full z-10">
        <div class="container flex items-center justify-between h-16 text-white">
            <div class="font-bold text-2xl">GUD</div>
            <div class="flex items-center gap-4">
                <a href="#our-menu" class="bg-[#c08133] text-white px-4 py-2 rounded-full text-sm cursor-pointer">Menu</a>
            </div>
        </div>
    </div>
     <div class="relative h-screen !p-0">
        <div class="flex relative w-full h-full">
            <img src="https://nicojuhari.b-cdn.net/demos/2/gut-restaurant-hero-bg.jpg" alt="gud-restaurant-hero-bg" class="w-full md:w-1/2 h-full ml-auto object-cover"/>
            <div class="absolute top-0 left-0 gud-hero-gradient h-full w-full hiddesn md:block"></div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full">
            <div class="container text-white h-full w-full flex">
                <div class="mt-auto mb-10 md:my-auto flex-shrink-0 w-full">
                    <h1 class="md:text-6xl text-3xl"><span class="text-8xl md:text-[10rem] font-bold">GUD</span><br>by Alexandru Comerzan</h1>
                    <div class="my-10 md:text-2xl text-xl text-[#c08133]">Restaurant | Bar | Terrace</div>
                    <div class="flex items-center gap-4 mb-10 w-full text-base md:text-xl">
                        <span>Rezervați o masă:</span>
                        <a class="inline-flex items-center border border-opacity-50 border-white rounded-full gap-4 h-12 pr-6" href="tel:+37369454994"> 
                            <div class="bg-white bg-opacity-20 h-12 w-12 inline-flex items-center justify-center rounded-full"><Icon name="ph:phone" class="w-6 h-6"/></div>
                            <span>069 454 994</span>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3">
        <div>
            <img src="https://1foodmenu-demos.b-cdn.net/gud/gud-grid-3.png" alt=" " class="w-full object-cover"/>
        </div>
        <div class="flex px-6 min-h-[320px]">
            <div class="m-auto flex items-center justify-center flex-col gap-6 text-xl">
                <div>
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]"/>
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]"/>
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]"/>
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]"/>
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]"/>

                </div>
                <div class="font-bold text-center">{{ list[currentReview].review }}</div>
                <div class="text-center">{{ list[currentReview].name }}</div>
            </div>
        </div>
        <div>
             <img src="https://1foodmenu-demos.b-cdn.net/gud/gud-grid-2.png" alt=" " class="w-full object-cover"/>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="flex px-6 min-h-[320px]">
            <div class="m-auto flex items-center justify-center flex-col gap-4 text-2xl">
                <Icon name="ic:sharp-access-time" class="w-14 h-14 text-[#c08133]"/>
                <div class="font-bold text-center">Luni - Duminică</div>
                <div class="text-center">11:00 - 23:00</div>
            </div>
        </div>
        <div>
            <img src="https://1foodmenu-demos.b-cdn.net/gud/gud-grid-1.png" alt=" " class="w-full object-cover"/>
        </div>
        <div class="flex px-6 min-h-[320px]">
            <div class="m-auto flex items-center justify-center flex-col gap-4 text-2xl">
                <Icon name="material-symbols:location-on-outline-rounded" class="w-14 h-14 text-[#c08133]"/>
                <div class="font-bold text-center">Strada Mihail Sadoveanu 19</div>
                <div class="text-center">Chişinău 2075, Moldova</div>
            </div>
        </div>
    </div>
    <DemosRestaurant2Menu />
    <!-- <DemosGudHero/>
    <DemosGudGrid/>
    <DemosGudMenu/> -->
    <footer class="border-t border-r-gray-100">
        <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
            <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">me</NuxtLink></div>
        </div>
    </footer>
</template>
<style>
.gud-hero-gradient {
        background: rgb(14,12,6);
        background: linear-gradient(0deg, rgba(14,12,6,1) 0%, rgba(14,12,6,1) 25%, rgba(14,12,6,0) 65%);
    }

    @media (min-width: 768px) {
       .gud-hero-gradient {
            background: rgb(14,12,6);
            background: linear-gradient(90deg, rgba(14,12,6,1) 0%, rgba(14,12,6,1) 50%, rgba(14,12,6,0) 75%);
        }
    }
</style>