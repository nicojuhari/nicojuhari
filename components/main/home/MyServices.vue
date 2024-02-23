<script setup>

    let myServices = [
        {
            title: 'Business Website design',
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
    <section>
        <div class="container">
            <div class="subtitle mb-10 text-center">My Services</div>
            <div class="grid grid-cols-1 md:grid-cols-3 justify-center gap-10">
                <div v-for="item in myServices" class="p-6 rounded-lg bg-white border border-brand-cssolor border-opacity-50 max-w-sm">
                    <div class="grid place-content-center py-11">
                        <UIcon :name="item.icon" class="w-12 flex-shrink-0 h-12 text-brand-700"/>
                    </div>
                    <h3 class="text-center text-xl mb-6">{{ item.title }}</h3>
                    <p class="font-light text-center">{{ item.description }}</p>
                </div>
            </div>
            <!-- <div class="mt-16 flex justify-center">
                <a href="https://forms.gle/UX2VPKUwyyFdSXbw9" class="btn btn-outline btn-light" target="blank" title="Let's work together">Hire me</a>
            </div> -->
        </div>
    </section>
</template>  