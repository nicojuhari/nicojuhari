<script setup>

import { gsap } from "gsap";
const bgImgURL = 'https://images.unsplash.com/photo-1600628421060-939639517883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340';

// const heroTitle = ref(null)
//     gsap.from(heroTitle.value, {
//         opacity: 0,
//         y: 100,
//         duration: 1,
//         delay: 0.5,
//         ease: "power3.out",
//     });
// });

const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroCTA = ref(null)
const viewMenu = ref(null)

onMounted(() => {
    gsap.to(heroTitle.value, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
    });

    gsap.to(heroSubtitle.value, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
    });

    gsap.to(heroCTA.value, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        scale: 1,
        ease: "power3.out",
    });

    gsap.to(viewMenu.value, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.3,
        scale: 1,
        ease: "power3.out",
    });
});

</script>

<template>
    <div>
        <Body class="bg-gray-100" />
        <div class="relative bg-center bg-no-repeat bg-cover" :style="`background-image:url(${bgImgURL})`">
            <div class="absolute top-0 left-0 h-full w-full bg-black opacity-70"></div>
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
            <div class="container flex items-center justify-center flex-col h-[calc(100vh-4rem)] md:h-[70vh] relative">
                <h1 class="text-6xl md:text-8xl font-bold text-center tracking-wider text-white opacity-0 translate-y-24" ref="heroTitle">Mama Mia</h1>
                <div class="uppercase text-sm text-center font-semibold tracking-[8px] md:tracking-[10px] text-[#e07c0c] opacity-0" ref="heroSubtitle">Italian Restaurant</div>
                <div class="flex gap-4 items-center">
                    <a class="bg-[#0C7C59] text-white tracking-wider py-2 px-4 mt-10 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold opacity-0 translate-y-10"
                        href="#our-menu" ref="viewMenu">View Menu</a>
                        <button class="bg-[#6D2E46] text-white tracking-wider py-2 px-4 mt-10 inline-flex items-center justify-center rounded-full uppercase text-base font-semibold opacity-0 translate-y-10"
                        ref="heroCTA">Book a Table</button>
                </div>
                
            </div>
            <div class="text-white relative">
                <div class="md:h-24 container py-4 flex flex-col md:flex-row gap-6">
                    <div class="flex flex-1 gap-4 items-center justify-center md:justify-normal flex-col md:flex-row">
                        <Icon name="ph:clock-light" class="w-10 h-10 text-[#0C7C59]"/>
                        <div class="text-center md:text-left">
                            <div class="">Working hours</div>
                            <div class="text-gray-300 font-bold">
                                10:00 - 23:00
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-1 gap-4 items-center justify-center md:justify-normal flex-col md:flex-row">
                        <Icon name="ph:credit-card-light" class="w-10 h-10 text-[#0C7C59]"/>
                        <div class="text-center md:text-left">
                            <div class="">We accept:</div>
                            <div class="text-gray-300 font-bold">
                                Cash and Cards
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-1 gap-4 items-center justify-center md:justify-normal flex-col md:flex-row">
                        <Icon name="ph:map-pin-light" class="w-10 h-10 text-[#0C7C59]"/>
                        <div class="text-center md:text-left">
                            <div class="">Our address:</div>
                            <div class="text-gray-300 font-bold">
                                City, Street, 123
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>