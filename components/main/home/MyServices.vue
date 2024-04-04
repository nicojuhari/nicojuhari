<script setup>

    let myServices = [
        {
            title: 'Business Website Design',
            description: 'I create business websites that are tailored to your industry and target market and turn visitors into paying clients.',
            icon: 'i-ph-code-light'
        },
        {
            title: 'Restaurant Website Design',
            description: 'I create simple restaurant websites that improve online presence, highlight culinary imagination, attract new customers and keep regulars coming back.',
            benefits: [
                'Pixel perfect and fast pages',
                'Eye-catching and clean design',
                'Easy navigation',
                'SEO-friendly',
                'Interactive and tourist-friendly menu',
                'Clear and simple CTAs',
            ],
            icon: 'i-ph-bowl-food-light',
            link: '/demos'
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
                    <!-- <div class="mt-6 font-medium text-lg">What you can get:</div>
                    <div class="flex flex-col gap-2 mt-2">
                        <div v-for="benefit in item.benefits" class="flex items-center gap-1.5">
                            <UIcon name="i-ph-check-light" class="w-3 h-3 text-green-600" /> {{ benefit }}
                        </div>
                    </div> -->

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