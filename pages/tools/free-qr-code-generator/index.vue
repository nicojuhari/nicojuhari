<script setup>
    useHead({
        title: 'Free QR Code Generator for you application or website',
        meta: [
            { name: 'description', content: 'Generate free QR codes for your applications or website URLs effortlessly with our user-friendly QR Code Generator tool. Try it now!' }
        ],
    })
</script>
<template>
    <section>
        <div class="container">
            <h1 class="text-center mb-10 page-title">Free QR Code Generator</h1>
            <ClientOnly>
                <QrCodeGenerator />
            </ClientOnly>
        </div>
    </section>
</template>