<script setup>
    useHead({
        title: 'Scrolling/Marquee Banner - Shopify Section',
        meta: [
            { name: 'description', content: 'Eye-catching Shopify scrolling banner for promos, announcements, and key messages. Compact, mobile-friendly, and fast-pure CSS, no extra scripts.' },
            { property: 'og:title', content: 'Scrolling/Marquee Banner - Shopify Section' },
            { property: 'og:description', content: 'Eye-catching Shopify scrolling banner for promos, announcements, and key messages. Compact, mobile-friendly, and fast-pure CSS, no extra scripts.' },
            { property: 'og:image', content: 'https://www.nicojuhari.com/images/shopify/shopify-section__scrolling-marquee-banner.webp' },
        ],
})
</script>
<template>

<div class="container container-sm my-6 space-y-8 bg-white p-6 rounded shadow">
    <img src="/images/shopify/shopify-section__scrolling-marquee-banner.webp" alt="Scrolling Marquee Banner" class="w-full rounded-md"/>
    <h1 class="text-2xl font-bold">Scrolling/Marquee Banner - Shopify Section</h1>
    <p>Creates a continuous marquee with text, images, emojis. Pure CSS. No external scripts. Perfect for announcements, promotions, or highlighting key messages.</p>
    <div class="flex items-center space-x-4 justify-between p-4 bg-gray-100 rounded">
        <p class="font-semibold"> Use the password: 1</p>
        <UButton variant="outline" title="View Demo" target="_blank" to="https://nicojuhari.myshopify.com/pages/scrolling-marquee-banner">View Demo</UButton>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Features</h2>
        <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Continuous scrolling: text, images, emojis, custom HTML/SVG.</li>
            <li>Controls: speed, direction, duplicates, pause-on-hover.</li>
            <li>Styling: colors, gradients, fonts, sizes, spacing, borders.</li>
            <li>Responsive: separate desktop/mobile settings.</li>
        </ul>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-2">Benefits</h2>
        <ul class="list-disc list-inside space-y-1">
            <li>More visibility - higher clicks.</li>
            <li>Show many messages in one compact bar.</li>
            <li>Motion increases engagement and CTR.</li>
            <li>Pure CSS - no extra scripts to slow down your site.</li>
            <li>Easy to customize and reuse.</li>
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
                    <li>Create file: <code>component-nc-scrolling-banner.css</code></li>
                    <li>Copy &amp; paste the CSS code from the file</li>
                    <li>Save</li>
                </ul>
            </li>
            <li>
                <span class="font-semibold">Add Section File</span>
                <ul class="list-disc list-inside ml-6 space-y-1">
                    <li>In <b>Sections</b> folder, click <b>Add a new section</b></li>
                    <li>Create file: <code>nc-scrolling-banner.liquid</code></li>
                    <li>Copy &amp; paste the complete section code</li>
                    <li>Save</li>
                </ul>
            </li>
        </ul>
    </div>
    <UAlert variant="soft" title="The section has been tested in the Dawn theme only, but it should work with most Shopify themes."></UAlert>
</div>
</template>