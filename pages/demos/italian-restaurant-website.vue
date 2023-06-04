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
})

const foodMenu = ref(null)

if (process.client) {
    import("https://cdn.jsdelivr.net/npm/1food-menu/dist/1food-menu.mjs").then(({ createMenu }) => {
        fetch('https://api.1food.menu/v1/menus/l9zwcpvlanynrmthvmb')
            .then(res => res.json())
            .then(menuData => {
                foodMenu.value = menuData
                createMenu({
                    menu: menuData,
                    version: 2,
                    priceSymbol: '$',
                })

            })
            .catch(e => {
                console.log(e)
                // loading.value = false
            })

    })
}

</script>
<template>
    <DemosItalianHeader/>
    <!-- <DemosItalianMenu/> -->
    <div class="container">
        <h2 class="text-4xl md:text-6xl text-[#e07c0c] font-bold text-center">Our Menu</h2>
        <div id="OneFoodMenu"></div>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/1food-menu/dist/style.css"/>
    <section class="overflow-hidden h-auto">
        <div class="container my-10 md:my-20 relative">
                <h2 class="text-4xl md:text-6xl text-[#e07c0c] font-bold text-center">About us</h2>
                <div class="flex flex-col md:flex-row bg-white mt-20 rounded-md overflow-hidden relative z-10">
                    <div class="h-[300px] md:h-auto md:w-1/2 shrink-0 bg-no-repeat bg-cover bg-center"
                        style="background-image:url('https://media-public.canva.com/MADOrCJgfqU/1/thumbnail_large-1.jpg')">

                    </div>
                    <div class="py-20 px-10">
                        <div class="leading-relaxed text-gray-600">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa vel ratione ex quisquam tempora,
                            vitae
                            exercitationem ducimus ullam esse nulla fugiat, quis nisi sequi deserunt molestias provident!
                            Nulla, ea
                            architecto.
                            Lorem ipsum dolor sit amet consectetur...
                        </div>
                        <a class="bg-black text-white tracking-wider py-2 px-4 mt-8 inline-flex items-center justify-center rounded-full uppercase text-sm font-semibold"
                            href="#">Read more</a>
                    </div>

            </div>
            <img src="https://cdn.webshopapp.com/shops/92230/files/417462778/mint-a-bundle.jpg" class="h-[300px] rotate-45  absolute md:-right-20 top-[80%] md:top-[70%]  -z-1" />
        </div>
    </section>
</template>