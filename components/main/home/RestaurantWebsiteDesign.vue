<script setup>
const images = [
  {
    src: 'https://nicojuhari.b-cdn.net/demos/thumbnails/trattoria-bella-italia-restaurant-website-example.webp',
    alt: 'Restaurant Website Design Bella Italia'
  },
  {
    src: 'https://nicojuhari.b-cdn.net/demos/thumbnails/bella-cucina-restaurant-website-example.webp',
    alt: 'Restaurant Website Design Bella Cucina'
  },
  {
    src: 'https://nicojuhari.b-cdn.net/demos/thumbnails/la-famiglia-ristorante-website-example.webp',
    alt: 'Restaurant Website Design La Famiglia'
  },
  {
    src: 'https://nicojuhari.b-cdn.net/demos/thumbnails/mama-mia-italian-restaurant-website-example.webp',
    alt: 'Restaurant Website Design Mama Mia'
  },
]


</script>
<template>
    <UCard id="restaurant-website-design">
        <h2 class="title text-center mb-6">Restaurant Website Design</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="flex flex-col items-center justify-center">
                <p class="text-2xl mt-2 mb-4">Fully Functional Restaurant Website:</p>
                <ul class="list-disc text-lg list-inside mt-2 mb-6 space-y-2">
                    <li><span class="font-semibold">Menu Maker Integration:</span> Will save you time and money.</li>
                    <li><span class="font-semibold">Custom Menu Design:</span> Custom-built menus that reflect your brand.</li>
                    <li><span class="font-semibold">Responsive:</span> Perfect on any device.</li>
                    <li><span class="font-semibold">SEO Optimized:</span> Rank higher in search results.</li>
                    <li><span class="font-semibold">Clear CTAs:</span> Drive more reservations and orders.</li>
                    <li class="text-green-600"><span class="font-semibold">Risk-Free Guarantee:</span> No payment until you're 100% satisfied!</li>
                </ul>
                <div class="text-center">
                    <UButton to="/contact" color="success" class="px-6 justify-center" title="Let's do it!">Let's do it!</UButton>
                    
                </div>
            </div>
            <div class="w-full flex flex-col items-center justify-center">
                <UCarousel v-slot="{ item }" :ui="{ item: 'basis-4/5' }" :autoplay="{ delay: 3000 }" loop :items="images" class="w-full mx-auto">
                    <img :src="item.src" class="rounded-lg shadow" :alt="item.alt">
                </UCarousel>
                <div class="text-center mt-8">
                    <UButton to="/restaurant-website-examples" class="px-6 justify-center" variant="outline" title="View More Examples">View More Examples</UButton>
                </div>
            </div>
        </div>
    </UCard>    
</template>