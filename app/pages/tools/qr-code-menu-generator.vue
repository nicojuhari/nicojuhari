<script setup>
    useHead({
        title: 'QR Code Menu Generator | Free Online Tool',
        meta: [
            { name: 'description', content: 'Easily create a free QR code menu for your restaurant\'s website. No sign-up required! Download high-quality QR code images in seconds. Get yours today!' }
        ],
    })
</script>
<template>
    <div class="container">
        <h1 class="title mb-2">QR Code Menu Generator</h1>
        <h2 class="mb-8">Create printable QR menus in seconds! Simply enter your website URL below.</h2>
        <ClientOnly>
            <QrCodeGenerator />
            <template #fallback>
            <!-- this will be rendered on server side -->
            <Loading class="mx-auto my-12"/>
          </template>
        </ClientOnly>
        <div class="space-y-4 mt-6">
            <p>Quickly turn your menu into a scannable QR code so guests can view it on their phones.</p>
            <p>Create a digital menu with this <NuxtLink to="https://1food.menu/" target="_blank" title="Online Menu Maker">Online Menu Maker</NuxtLink> and add it to your website, and make sure the page is mobile-friendly and easy to navigate.</p>
            <p>Paste the menu link into the generator, choose colors and size, then download the QR image and print it on table tents, stickers, or signs (keep codes at least 2 x 2 inches).</p>
            <p>Use high contrast between the code and background, and test printed codes with several phones and browsers before you deploy.</p>
            <p>Add a short, trackable URL or UTM to measure scans and see which menus or items receive traction.</p>
            <p>The result: faster service, fewer printing costs, and menus that stay accurate and up-to-date.</p>
        </div>
    </div>
</template>