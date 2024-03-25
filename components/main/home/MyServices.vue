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
    ]
</script>
<template>
    <section class="md-section">
        <div class="container">
            <div class="subtitle mb-10 text-center">My Services</div>
            <div class="m-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div class="bg-white border border-gray-300 rounded-xl p-6 md:p-8 flex flex-col shadow"
                    v-for="item in myServices" :key="item.title">
                    <div class="flex gap-6 items-center">
                        <UIcon v-if="item.icon" :name="item.icon" class="text-[32px] text-gray-400 hidden"></UIcon>
                        <span class="font-bold text-xl">{{ item.title }}</span>
                    </div>
                    <div class="mt-4 text-gray-600"> {{ item.description }}</div>
                </div>
            </div>
            <div class="mt-10 text-center">
                <UButton to="/demos" color="brand" variant="outline" size="lg" title="Website Demos"
                    class="w-full flex-grow sm:max-w-28 justify-center"> Demos
                </UButton>
            </div>
        </div>
    </section>
</template>  