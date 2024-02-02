<script setup>
    useHead({
        title: 'Free QR Code Generator',
        meta: [
            { name: 'description', content: 'Free QR Code Generator for you application or website url' }
        ],
    })
</script>
<template>
    <div class="container py-10 md:pt-20">
        <h1 class="text-2xl md:text-4xl font-semibold text-center mb-10 md:mb-20">Free QR Code Generator</h1>
        <ClientOnly>
            <QrCodeGenerator />
        </ClientOnly>
    </div>
</template>