<script setup>
// import { SubHeader } from './SubHeader.vue'
import { gsap } from "gsap";
const bgImgURL = 'https://1FoodMenu.b-cdn.net/demos/italian-restaurant/home-hero-bg.jpg'

defineEmits(['showBookTableModal']);
onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: .7 } });
    const toOptions = { opacity: 1, y: 0}
    const imageOptions = { opacity: 1, y: 0, x: "35rem", duration: 3, ease: "power3.out"}
    
    tl.to('[data-gsap-title]', { ...toOptions })
        .to('[data-gsap-subtitle]', { ...toOptions }, '-=0.3')
        .to('[data-gsap-btn]', { ...toOptions ,stagger: .2 }, '-=0.3')
        .to('[data-gsap-ingredients]', { ...imageOptions, stagger: .2 })
        .to('[data-gsap-pizza]', { rotate: -180, duration: 1.4, x: 0 }, '-=2.5')
});

</script>

<template>
    <div class="relative bg-center bg-no-repeat bg-cover" :style="`background-image:url(${bgImgURL})`">
        <div class="absolute top-0 left-0 h-full w-full bg-black opacity-40"></div>
        <div class="container relative text-white py-4 flex items-center justify-between h-16">
            <div class="shrink-0">
                <svg width="32" height="32" viewBox="0 0 512 512">
                    <path
                        d="M164.852 279.939l61.834-60.251L73.72 71.706c-33.626 32.764-33.626 86.677 0 119.44l91.132 88.793z"
                        fill="currentColor" />
                    <path
                        d="M312.389 241.88c33.636 14.802 80.283 4.232 113.91-29.593 41.222-40.165 49.909-98.303 17.363-128.96-31.465-31.71-91.131-23.245-132.354 16.921-34.718 33.825-45.566 79.276-30.374 110.986-47.739 47.568-211.552 207.173-211.552 207.173L99.759 448l149.71-145.866L399.177 448l30.374-29.593-149.709-145.869 32.547-30.658z"
                        fill="currentColor" />
                </svg>
            </div>

            <nav class="hidden md:flex items-center gap-6 justify-end">
                <a href="#our-menu">Menu</a>
                <a href="#gallery">Gallery</a>
                <a href="#about">About</a>
            </nav>
            <div class="md:hidden">
                <svg width="32" height="32" viewBox="0 0 24 24">
                    <g fill="none">
                        <path
                            d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                        <path fill="currentColor"
                            d="M20 18a1 1 0 0 1 .117 1.993L20 20H4a1 1 0 0 1-.117-1.993L4 18h16Zm0-7a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm0-7a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2h16Z" />
                    </g>
                </svg>
            </div>
        </div>
        <div class="container flex items-center justify-center flex-col min-h-[calc(100svh-4rem)] md:h-[85vh]">
            <div class="relative mt-[120px] md:mt-[200px]">
                <div class="mask relative z-10">
                    <h1 data-gsap-title class="text-6xl md:text-9xl font-bold text-center tracking-wider text-white opacity-0 translate-y-24">Mama Mia</h1>
                </div>
                <div class="mask">
                    <h2 data-gsap-subtitle class="uppercase text-sm text-center font-semibold tracking-[8px] md:tracking-[12px] text-[#e07c0c] opacity-0 -translate-y-24">Italian Restaurant</h2>
                </div>
                <div class="flex gap-4 items-center justify-center mt-6">
                    <a data-gsap-btn class="bg-[#0C7C59] text-white min-w-[156px] tracking-wider py-2 px-4 inline-flex items-center justify-center rounded-full uppercase opacity-0 translate-y-10"
                        href="#our-menu">View Menu</a>
                        <button data-gsap-btn @click="$emit('showBookTableModal')" class="bg-[#6D2E46] text-white min-w-[156px] tracking-wider py-2 px-4 inline-flex items-center justify-center rounded-full uppercase opacity-0 translate-y-10">Book a Table</button>
                </div>
                <div class="mask w-full max-w-sm mx-auto relative flex justify-center mt-10 h-20">
                    <img data-gsap-ingredients src="https://nicojuhari.b-cdn.net/1/home-hero-flour.webp" class="h-20 -translate-x-96 absolute"/>
                    <img data-gsap-ingredients src="https://nicojuhari.b-cdn.net/1/home-hero-tomato.png" class="h-20 -translate-x-96 absolute"/>
                    <img data-gsap-ingredients src="https://nicojuhari.b-cdn.net/1/home-hero-cheese.png" class="h-20 -translate-x-96 absolute"/>
                    <img data-gsap-ingredients src="https://nicojuhari.b-cdn.net/1/home-hero-pepperoni.png" class="h-20 -translate-x-96 absolute"/>
                    <img data-gsap-pizza src="https://nicojuhari.b-cdn.net/1/home-hero-pizza.png" class="h-20 translate-x-96 absolute"/>
                </div>
            </div>
            
            <div class="mt-24 md:mt-auto w-full">
                <DemosItalianSubHeader/>
            </div>
        </div>
    </div>
</template>