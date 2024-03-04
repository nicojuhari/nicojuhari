<script setup>

    let myServices = [
        {
            title: 'Business Website Design',
            description: 'I will create a top-notch website for your business to effectively generate leads.',
            icon: 'i-ph-code-light'
        },
        {
            title: 'Restaurant Website Design',
            description: 'I will create a great restaurant website that converts food lovers into clients.',
            icon: 'i-ph-bowl-food-light'
        },
        {
            title: 'Conversion Rate Opimisation',
            description: 'I will improve and optimize your website until the conversion rate doubles.',
            icon: 'i-ph-trend-up-light'
        },
    ]
</script>
<template>
    <section class="md-section">
        <div class="container">
            <div class="subtitle mb-10 text-center">My Services</div>
            <div class="grid grid-cols-1 md:grid-cols-3 justify-center gap-6 md:gap-8">
                <div v-for="item in myServices" class="p-8 md:p-10 rounded-lg bg-white border border-gray-400 text-center">
                    <div class="grid place-content-center mb-8">
                        <UIcon :name="item.icon" class="w-12 flex-shrink-0 h-12 text-brand-400"/>
                    </div>
                    <h2 class="mb-4 text-xl">{{ item.title }}</h2>
                    <div class="text-gray-600">{{ item.description }}</div>
                </div>
            </div>
        </div>
    </section>
</template>  