<script setup>
    useHead({
        title: 'Brand Logos Carousel - Shopify Section',
        meta: [
            { name: 'description', content: 'Brand Logos Carousel - Shopify Section. Infinite logo carousel to showcase partners and clients. Fast, responsive and compatible with any Shopify theme.' },
            { property: 'og:title', content: 'Brand Logos Carousel - Shopify Section' },
            { property: 'og:description', content: 'Brand Logos Carousel - Shopify Section. Infinite logo carousel to showcase partners and clients. Fast, responsive and compatible with any Shopify theme.' },
            { property: 'og:image', content: 'https://www.nicojuhari.com/images/shopify/shopify-section__brand-logos-carousel.webp' },
        ],
         
})
</script>
<template>

<div class="container container-sm my-6 space-y-8 bg-white p-6 rounded shadow">
    <img src="/images/shopify/shopify-section__brand-logos-carousel.webp" alt="Brand Logos Carousel" class="w-full rounded-md"/>
    <h1 class="text-2xl font-bold">Brand Logos Carousel - Shopify Section</h1>
    <p>A smooth, infinite carousel that displays partner, client, or certification logos to build trust quickly. Compact and visually clean.</p>
    <div class="flex items-center space-x-4 justify-between p-4 bg-gray-100 rounded">
        <p class="font-semibold"> Use the password: 1</p>
        <UButton variant="outline" title="View Demo" target="_blank" to="https://nicojuhari.myshopify.com/pages/brand-logos-carousel">View Demo</UButton>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Features</h2>
        <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Infinite horizontal scroll with smooth CSS animation (or disabled animation).</li>
            <li>Add multiple logos with links and alt text.</li>
            <li>Grayscale-to-color hover effect and pause-on-hover.</li>
            <li>Controls: logo size, spacing, speed, duplicates, and toggle animation.</li>
            <li>Lazy-loading, responsive srcset, and namespaced CSS (nc-) - no external scripts.</li>
        </ul>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Benefits</h2>
        <ul class="list-disc list-inside space-y-1">
            <li>Builds instant trust with partner/client logos.</li>
            <li>Shows many brands in a compact, polished block.</li>
            <li>Eye-catching motion boosts attention without slowing pages.</li>
            <li>Mobile-friendly and accessible (alt text, pause on hover).</li>
            <li>Easy admin updates - add/remove logos without code.</li>
        </ul>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">How to Install</h2>
        <p class="my-4">Go to <b>Online Store &gt; Themes &gt; Actions &gt; Edit Code</b></p>
        <ul class="list-decimal list-inside space-y-2">
            <li>
                <span class="font-semibold">Add CSS File</span>
                <ul class="list-disc list-inside ml-6 space-y-1">
                    
                    <li>In <b>Assets</b> folder, click <b>Add a new asset</b></li>
                    <li>Create file: <code>component-brand-logos-carousel.css</code></li>
                    <li>Copy &amp; paste the CSS code from the file</li>
                    <li>Save</li>
                </ul>
            </li>
            <li>
                <span class="font-semibold">Add Section File</span>
                <ul class="list-disc list-inside ml-6 space-y-1">
                    <li>In <b>Sections</b> folder, click <b>Add a new section</b></li>
                    <li>Create file: <code>nc-brand-logos-carousel.liquid</code></li>
                    <li>Copy &amp; paste the complete section code</li>
                    <li>Save</li>
                </ul>
            </li>
        </ul>
    </div>
    <UAlert variant="soft" title="The section has been tested in the Dawn theme only, but it should work with most Shopify themes."></UAlert>
</div>
</template>