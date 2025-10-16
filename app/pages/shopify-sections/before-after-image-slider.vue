<script setup>
    useHead({
        title: 'Before and After Image Slider - Shopify Section',
        meta: [
            { name: 'description', content: 'Before & After Image Slider - interactive comparison tool with drag handle, keyboard accessibility, lazy loading, and full styling control.' },
            { property: 'og:title', content: 'Before and After Image Slider - Shopify Section' },
            { property: 'og:description', content: 'Before & After Image Slider - interactive comparison tool with drag handle, keyboard accessibility, lazy loading, and full styling control.' },
            { property: 'og:image', content: 'https://www.nicojuhari.com/images/shopify/shopify-section__before-after-image-slider.webp' },
        ],
         
})
</script>
<template>

<div class="container container-sm my-6 space-y-8 bg-white p-6 rounded shadow">
    <img src="/images/shopify/shopify-section__before-after-image-slider.webp" alt="Before and After Slider" class="w-full rounded-md"/>
    <h1 class="text-2xl font-bold">Before and After Image Slider - Shopify Section</h1>
    <p>Interactive before & after image slider to showcase transformations, results, and product improvements.</p>
    <div class="flex items-center space-x-4 justify-between p-4 bg-gray-100 rounded">
        <p class="font-semibold"> Use the password: 1</p>
        <UButton variant="outline" title="View Demo" target="_blank" to="https://nicojuhari.myshopify.com/">View Demo</UButton>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Features</h2>
        <ul class="list-disc list-inside space-y-1">
            <li>Draggable handle with click-to-position and touch support.</li>
            <li>Separate before &amp; after image uploads with alt text.</li>
            <li>Keyboard navigation and ARIA labels for accessibility.</li>
            <li>Responsive sizing, lazy-loading, and srcset for fast loads.</li>
            <li>Styling controls: height, border radius, labels, fonts, and colors.</li>
        </ul>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Benefits</h2>
        <ul class="list-disc list-inside space-y-1">
            <li>Shows transformations instantly and clearly.</li>
            <li>Increases engagement with interactive, hands-on content.</li>
            <li>Builds trust by proving real results.</li>
            <li>Mobile-friendly and fast - won't slow pages.</li>
            <li>Easy to update in Shopify without coding.</li>
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
                    <li>Create file: <code>component-before-after-slider.css</code></li>
                    <li>Copy &amp; paste the CSS code from the file</li>
                    <li>Save</li>
                </ul>
            </li>
            <li>
                <span class="font-semibold">Add Section File</span>
                <ul class="list-disc list-inside ml-6 space-y-1">
                    <li>In <b>Sections</b> folder, click <b>Add a new section</b></li>
                    <li>Create file: <code>nc-before-after-slider.liquid</code></li>
                    <li>Copy &amp; paste the complete section code</li>
                    <li>Save</li>
                </ul>
            </li>
        </ul>
    </div>
    <UAlert variant="soft" title="The section has been tested in the Dawn theme only, but it should work with most Shopify themes."></UAlert>
</div>
</template>