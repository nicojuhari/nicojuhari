<script setup>
const route = useRoute();
const filteredSections = ref([]);

let sections = [
    
    {
        title: "Scrolling/Marquee Banner",
        url: '/shopify-sections/scrolling-marquee-banner',
        img: '/images/shopify/shopify-section__scrolling-marquee-banner.webp',
    },
    {
        title: "Brand Logos Carousel",
        url: '/shopify-sections/brand-logos-carousel',
        img: '/images/shopify/shopify-section__brand-logos-carousel.webp',
    },
    {
        title: "Before-After Slider",
        url: '/shopify-sections/before-after-slider',
        img: '/images/shopify/shopify-section__before-after-slider.webp',
    },
];


watchEffect(() => {
    filteredSections.value = sections.filter(section => section.url !== route.path);
})

</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <NuxtLink :to="section.url" v-for="section in filteredSections" :key="section.title"
            class="space-y-4" :title="section.title">
            <img :src="section.img" :alt="section.title" class="object-cover" />
            <h3 class="font-bold text-center">{{ section.title }}</h3>
        </NuxtLink>
    </div>
</template>