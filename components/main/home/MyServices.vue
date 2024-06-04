<script setup>

    let myServices = [
        {
            title: 'Powerful Shopify Stores',
            description: 'Get a user-friendly ecommerce website that turns visitors into buyers.',
            benefits: [
                'Beautiful Design', 'Easy Checkout', 'SEO Optimized', 'Targeted Marketing',
            ],
            icon: 'i-ph-shopify-light'
        },
        {
            title: 'Effective Business Website',
            description: 'Showcase your brand with a modern website that guides visitors to take action.',
            benefits: [
                'Modern Design', 'Clear CTA', 'Fast Loading', 'Easy Updates (CMS)',
            ],
            icon: 'i-ph-code-light'
        },
        {
            title: 'Custom Web Applications',
            description: 'Save time and boost efficiency with custom web apps built on JavaScript or Vue.js.',
            benefits: [
                'Automate Tasks', 'Data-Driven Decisions', 'Secure & Scalable', 'System Integration'
            ],
            icon: 'i-ph-bowl-food-light',
        },
    ]
</script>
<template>
    <section class="md-section">
        <div class="container">
            <div class="subtitle mb-10 text-center">My Services</div>
            <div class="m-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div class="bg-white border border-gray-400 rounded-xl px-6 py-10 md:px-8 md:py-12 flex flex-col gap-8"
                    v-for="item in myServices" :key="item.title">
                    <div class="flex gap-6 items-center justify-center text-center">
                        <!-- <UIcon v-if="item.icon" :name="item.icon" class="text-[32px] text-gray-400"></UIcon> -->
                        <span class="font-medium text-xl text-center">{{ item.title }}</span>
                    </div>
                    <div class=" text-gray-600 text-center text-sm"> {{ item.description }}</div>
                    <!-- <div class="mt-6 font-medium text-lg">What you can get:</div> -->
                    <div class="flex flex-col gap-2 mt-2">
                        <div v-for="benefit in item.benefits" class="flex items-center gap-1.5">
                            <UIcon name="i-ph-check-light" class="w-3 h-3 text-green-600" /> {{ benefit }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-8 text-center">
                <UButton to="/contact" class="w-36 flex-grow justify-center" color="brand" size="lg"
                    title="Hire me">Hire me</UButton>
            </div>
        </div>
    </section>
</template>  