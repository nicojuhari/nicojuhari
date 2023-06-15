<script setup>
import { ref } from "vue";
import Modal from '@/components/demos/italian/Modal.vue'
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

const showBookTableModal = ref(false)


</script>
<template>
    <DemosItalianHeader @showBookTableModal="showBookTableModal = true"/>
    <DemosItalianMenu/>
    <div id="gallery" class="container relative">
        <h2 class="text-4xl md:text-6xl text-[#e07c0c] font-bold text-center my-8 md:my-12">Gallery</h2>
        <div class="grid md:grid-cols-4 md:grid-rows-[repeat(2,218px)] gap-4 grid-cols-2 grid-rows-[repeat(4,180px)]">
            <div class="row-span-2 hover:-translate-y-2 duration-700">
                <img src="https://images.pexels.com/photos/1741285/pexels-photo-1741285.jpeg" alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
            </div>
            <div class="row-span-2 hover:-translate-y-2 duration-700">
                <img src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg" alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
            </div>
            <div class="row-span-1 md:col-start-3 md:col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                <img src="https://images.pexels.com/photos/4431588/pexels-photo-4431588.jpeg" alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
            </div>
            <div class="row-span-1 md:col-start-4 col-span-1 md:row-start-1 row-start-3 hover:-translate-y-2 duration-700">
                <img src="https://images.pexels.com/photos/2899737/pexels-photo-2899737.jpeg" alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
            </div>
            <div class="row-span-1 md:col-start-3 col-span-2 md:row-start-2 row-start-4 hover:-translate-y-2 duration-700">
                <img src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg" alt="Italian Restaurant Gallery" class="w-full h-full object-cover">
            </div>
        </div>
    </div>
    
    <div id="about" class="container relative pt-10">
            <h2 class="text-4xl md:text-6xl text-[#e07c0c] font-bold text-center my-8 md:my-12">About us</h2>
            <div class="flex flex-col md:flex-row bg-white rounded-md overflow-hidden relative z-10 shadow">
                <div class="h-[300px] md:h-[450px] md:w-1/2 shrink-0 bg-no-repeat bg-cover bg-center"
                    style="background-image:url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">

                </div>
                <div class="p-10 flex flex-col justify-center gap-6">
                    <div class="leading-relaxed text-gray-600 flex flex-col gap-2">
                        <p class="font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                        <p>Culpa vel ratione ex quisquam tempora,
                        vitae
                        exercitationem ducimus ullam esse nulla fugiat, quis nisi sequi deserunt molestias provident!</p>
                        <p>Nulla, ea
                        architecto.</p>
                        Lorem ipsum dolor sit amet consectetur...
                    </div>
                    <a class="bg-[#0C7C59] text-white tracking-wider py-2 px-4 mt-6 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold"
                            href="#">Read More</a>
                </div>
        </div>
        <!-- <img src="https://cdn.webshopapp.com/shops/92230/files/417462778/mint-a-bundle.jpg" class="h-[300px] rotate-45  absolute md:-right-20 bottom-0 -z-1" /> -->
    </div>
    <section>
        <div class="container">
            <h2 class="text-4xl md:text-6xl text-[#e07c0c] font-bold text-center my-8 md:my-12">Contacts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-md overflow-hidden">
                <div class="p-10 flex flex-col justify-center gap-6">
                    <a class="flex gap-4 items-center" href="tel:+43123456789">
                        <div class="bg-[#0C7C59] bg-opacity-10 rounded-full p-2">
                            <Icon name="ph:phone-light" class="text-[#0C7C59] w-8 h-8 inline-block" />
                        </div>
                        <span class="text-gray-600 text-xl font-medium ">+ 43 123 456 789</span>
                    </a>
                    <a class="flex gap-4 items-center" href="mailto:contact@example.com">
                        <div class="bg-[#0C7C59] bg-opacity-10 rounded-full p-2">
                            <Icon name="ph:envelope-light" class="text-[#0C7C59] w-8 h-8 inline-block" />
                        </div>
                        <span class="text-gray-600 text-xl font-medium ">contact@example.com</span>
                    </a>
                    <div class="flex gap-4 items-center">
                            <div class="bg-[#0C7C59] bg-opacity-10 rounded-full p-2">
                                <Icon name="ph:map-pin-light" class="text-[#0C7C59] w-8 h-8 inline-block" />
                            </div>
                            <span class="text-gray-600 text-xl font-medium ">1234 Street Name, City Name</span>
                        </div>
                    <button @click.prevent="showBookTableModal = true" class="bg-[#6D2E46] text-white tracking-wider py-2 px-4 mt-6 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold">Book a Table</button>
                </div>
                <div>
                    <IncludesGmaps
                        class="h-[450px]"
                        src="https://www.google.com/maps/embed/v1/place?q=Freelance+Web+Developer+in+Vienna,+Dieselgasse,+Vienna,+Austria&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                    />
                </div>
            </div>
        </div>
    </section>
    <DemosItalianFooter/>
    <Modal modalTitle="Book a Table" v-if="showBookTableModal" @close="showBookTableModal = false">
        <template #modalHeader="{ closeModal }">
            <div class="px-6 pt-4 pb-0 flex justify-between">
                <h3 class="text-2xl">Book a Table</h3>
                <Icon name="ph:x-light" class="w-8 h-8 cursor-pointer" @click="closeModal"/>
            </div>
        </template>
        <DemosItalianModalsTableBook/>
    </Modal>
</template>