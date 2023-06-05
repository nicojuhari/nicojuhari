<script setup>
import { ref } from "vue";
// import { createMenu } from "https://cdn.jsdelivr.net/npm/1food-menu/dist/1food-menu.mjs"
definePageMeta({ layout: 'demos' })

useHead({
    title: 'Demo - Italian Restaurant Website',
    meta: [
        { name: 'keywords', content: 'demo project, restaurant website design, freelance web developer, digital food menu' },
        { name: 'description', content: `Demo - Italian Restaurant Website: modern and clean design, fast website. Created with nuxt.js, TailwindCSS and 1FoodMenu app` },
    ],
    htmlAttrs: {
        class: 'scroll-smooth'
    },
})



</script>
<template>
    <DemosItalianHeader/>
    <DemosItalianMenu/>
    <div id="gallery" class="container relative pt-10">
        <h2 class="text-4xl md:text-6xl text-[#e07c0c] font-bold text-center my-8 md:my-12">Gallery</h2>
        <div class="grid md:grid-cols-4 md:grid-rows-[repeat(2,218px)] gap-4 grid-cols-2 grid-rows-[repeat(4,180px)]">
            <div class="w-full h-full bg-cover bg-no-repeat row-span-2 hover:-translate-y-2 duration-700" style="background-image:url('https://images.pexels.com/photos/1741285/pexels-photo-1741285.jpeg');"></div>
            <div class="w-full h-full bg-cover bg-no-repeat row-span-2 hover:-translate-y-2 duration-700" style="background-image:url('https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg');"></div>
            <div class="w-full h-full bg-cover bg-no-repeat row-span-1 md:col-start-3 md:col-span-1 row-start-3 hover:-translate-y-2 duration-700" style="background-image:url('https://images.pexels.com/photos/4431588/pexels-photo-4431588.jpeg');"></div>
            <div class="w-full h-full bg-cover bg-no-repeat row-span-1 md:col-start-4 col-span-1 row-start-3 hover:-translate-y-2 duration-700" style="background-image:url('https://images.pexels.com/photos/2899737/pexels-photo-2899737.jpeg');"></div>
            <div class="w-full h-full bg-cover bg-no-repeat row-span-1 md:col-start-3 col-span-2 row-start-4 hover:-translate-y-2 duration-700" style="background-image:url('https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg');"></div>

        </div>

    </div>
    
    <div id="about" class="container relative pt-10 pb-36 md:pb-40">
            <h2 class="text-4xl md:text-6xl text-[#e07c0c] font-bold text-center my-8 md:my-12">About us</h2>
            <div class="flex flex-col md:flex-row bg-white rounded-md overflow-hidden relative z-10">
                <div class="h-[300px] md:h-auto md:w-1/2 shrink-0 bg-no-repeat bg-cover bg-center"
                    style="background-image:url('https://images.pexels.com/photos/4819658/pexels-photo-4819658.jpeg')">

                </div>
                <div class="p-10">
                    <div class="leading-relaxed text-gray-600 flex flex-col gap-2">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                        <p>Culpa vel ratione ex quisquam tempora,
                        vitae
                        exercitationem ducimus ullam esse nulla fugiat, quis nisi sequi deserunt molestias provident!</p>
                        <p>Nulla, ea
                        architecto.</p>
                        Lorem ipsum dolor sit amet consectetur...
                    </div>
                    <a class="bg-[#0C7C59] text-white tracking-wider py-2 px-4 mt-10 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold"
                            href="#">Read More</a>
                </div>
        </div>
        <img src="https://cdn.webshopapp.com/shops/92230/files/417462778/mint-a-bundle.jpg" class="h-[300px] rotate-45  absolute md:-right-20 bottom-0 -z-1" />
    </div>
    <DemosItalianFooter/>
</template>