<script setup>
import gsap from 'gsap'
import { SplitText } from 'gsap/all';
const thisYear = new Date().getFullYear();

onMounted(() => {
    gsap.registerPlugin(SplitText);
    const tl = gsap.timeline()

    const splitHeroSubtitle = new SplitText('[data-hero-subtitle]', { type: 'words' });
    
    // Set the wrapper back to visible after splitting
    gsap.set('[data-hero-subtitle]', { opacity: 1 });
    
    tl.fromTo('[data-hero-title]', 
        { duration: 1, ease: 'power2.out', y: 20, opacity: 0 }, 
        { y: 0, opacity: 1 }
    )
    tl.from(splitHeroSubtitle.words, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
    })
    tl.fromTo('[data-cta]', 
        { duration: 1, ease: 'power2.out', y: 20, opacity: 0 }, 
        { y: 0, opacity: 1 }
    , "-=0.5")
    
    
})

</script>

<template>
    <div class="container container-sm">
        <!-- Hero Section -->
        <div class="text-center py-16">
            <p class="text-lg text-gray-500 mb-4">👋 Hello, I am Nick</p>
            <div class="flex justify-center mb-6">
                <img src="/assets/nick-profile-photo.webp" class="w-24 h-24 rounded-full object-cover border-4 shrink-0" alt="nick profile photo" />
            </div>
            <h1 class="opacity-0 text-3xl md:text-4xl font-bold mb-6 leading-tight" data-hero-title>
                Shopify & JavaScript Developer
            </h1>
            <p class="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed opacity-0" data-hero-subtitle>
                I create pixel-perfect, fast, and SEO-friendly web apps<br class="hidden sm:block"> using Shopify and modern JavaScript / Vue / Nuxt.
            </p>
            <div class="flex justify-center gap-4 mb-12">
                <UButton 
                    data-cta 
                    to="/#contact-me" 
                    color="secondary"
                    class="px-8 justify-center w-full max-w-[160px] opacity-0"
                >
                    Hire me
                </UButton>
            </div>
            <div class="inline-flex items-center gap-4 justify-center border rounded-lg px-6 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 128 128"><path fill="#176CC7" d="M69.09 4.24c-1.08.96-9.48 17.63-9.48 17.63l-6.25 25.21l24.32-2.23S97.91 7.23 98.32 6.36c.73-1.58 1.12-2.23-1.67-2.23c-2.79-.01-26.55-.79-27.56.11"/><path fill="#FCC11A" d="M81.68 43.29c-1.21-.65-36.85-1.21-37.69 0c-.76 1.1-.33 6.87-.04 7.56c.52 1.2 11.97 5.85 11.97 5.85v2.89s.78.32 7.46.32s8.01-.34 8.01-.34l.05-2.78s9.94-5.12 10.46-5.83c.46-.59.99-7.02-.22-7.67m-10.34 9.14s.14-1.38-.55-1.72c-.69-.35-12.62-.29-13.56-.24s-.94 1.73-.94 1.73l-7.47-3.95l-.13-1.32l27.94.15l.06 1.78z"/><path fill="#FDFFFF" d="M59.04 51.84c-.94 0-1.65 1.06-1.65 2.74c0 1.58.54 2.88 1.73 2.81c1.13-.06 1.67-1.49 1.59-2.83c-.1-1.57-.48-2.72-1.67-2.72"/><path fill="#F8932A" d="M29.31 92.09c0 23.96 21.71 33.93 36.12 33.5c16.79-.5 34.85-13.24 33.36-36.1c-1.4-21.45-19.69-31.69-35.47-31.57c-18.34.13-34.01 13.24-34.01 34.17"/><path fill="#FCC11A" d="M64.52 121.29c-.25 0-.51 0-.76-.01c-7.5-.25-15.12-3.08-20.54-8.33c-5.8-5.62-9.38-12.73-9.4-20.9c-.05-21.46 18.34-29.35 30.17-29.35h.1c16.03.07 29.88 12.05 30.24 28.94c.16 7.52-2.92 15.48-8.96 21.42c-5.63 5.53-13.94 8.23-20.85 8.23"/><path fill="#2E9DF4" d="M25.51 3.72c-.63.58 23.46 43.48 23.46 43.48s4.04.52 13.06.6s13.49-.52 13.49-.52S56.79 4.15 55.67 3.72c-.55-.22-7.97-.3-15.22-.38c-7.26-.09-14.34-.18-14.94.38"/><path fill="#FEFFFA" d="M52.29 67.35c-1.46-1.25-8.89 2.52-14.11 11.15c-3.5 5.79-3.8 13.2-1.57 13.32s2.2-7.21 7.05-13.62c5.86-7.71 10.74-9.04 8.63-10.85"/><path fill="#F8932A" d="M64.37 66.9c-1.95 0-4.99 12.89-7.38 14.48s-14.77.07-14.91 1.81s9.19 8.98 10.28 11.65s-4.71 14.62-3.11 15.78c1.59 1.16 11.58-7.17 14.91-7.17c3.47 0 12.41 8.89 13.9 7.67c1.57-1.28-3.47-12.96-2.68-15.64c.8-2.68 11.65-8.4 11.22-11c-.43-2.61-13.03-.65-15.35-2.82S66.47 66.9 64.37 66.9"/></svg>
                <span class="text-xl sm:text-2xl font-bold text-gray-900">{{ thisYear - 2019 + 1}}+ years of experience</span>
            </div>
        </div>
    </div>
</template>