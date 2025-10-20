<script setup>
    useHead({
        title: 'Hero Banner | Fast and Responsive - Shopify Section',
        meta: [
            { name: 'description', content: 'A lightweight Shopify hero banner section with split/full layouts, responsive image handling, custom fonts, dual CTAs and built-in CRO' },
            { property: 'og:title', content: 'Hero Banner | Fast and Responsive - Shopify Section' },
            { property: 'og:description', content: 'A lightweight Shopify hero banner section with split/full layouts, responsive image handling, custom fonts, dual CTAs and built-in CRO' },
            { property: 'og:image', content: 'https://www.nicojuhari.com/images/shopify/shopify-section__hero-banner.webp' },
        ],
         
})
</script>
<template>

<div class="container container-sm my-6 space-y-8 bg-white p-6 rounded shadow">
    <img src="/images/shopify/shopify-section__hero-banner.webp" alt="Hero Banner" class="w-full rounded-md"/>
    <h1 class="text-2xl font-bold">Hero Banner Section for Shopify — Speed, Flexibility, Conversions</h1>
    <p>Powerful hero banner with flexible layouts and rich content options to maximize conversions and showcase your brand.</p>
    <div class="flex items-center space-x-4 justify-between p-4 bg-gray-100 rounded">
        <p class="font-semibold"> Use the password: 1</p>
        <UButton variant="outline" title="View Demo" target="_blank" to="https://nicojuhari.myshopify.com/">View Demo</UButton>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Features</h2>
        <ul class="list-disc list-inside space-y-1">
            <li>Two layouts: split (image + content) or full-width background.</li>
            <li>Separate desktop and mobile ordering, height, and font controls.</li>
            <li>Rich content: eyebrow, headline, subtext, and two CTAs.</li>
            <li>Performance-friendly and namespaced CSS.</li>
        </ul>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Benefits</h2>
        <ul class="list-disc list-inside space-y-1">
            <li>Faster conversions with a focused, clickable hero.</li>
            <li>Perfect look on any device thanks to mobile-specific settings.</li>
            <li>Clear hierarchy that guides visitors to the CTA.</li>
            <li>Easy to edit in Shopify — no code needed.</li>
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
                    <li>Create file: <code>component-nc-hero-banner.css</code></li>
                    <li>Copy &amp; paste the CSS code from the file</li>
                    <li>Save</li>
                </ul>
            </li>
            <li>
                <span class="font-semibold">Add Section File</span>
                <ul class="list-disc list-inside ml-6 space-y-1">
                    <li>In <b>Sections</b> folder, click <b>Add a new section</b></li>
                    <li>Create file: <code>nc-hero-banner.liquid</code></li>
                    <li>Copy &amp; paste the complete section code</li>
                    <li>Save</li>
                </ul>
            </li>
        </ul>
    </div>
    <UAlert variant="soft" title="The section has been tested in the Dawn theme only, but it should work with most Shopify themes."></UAlert>
</div>
</template>