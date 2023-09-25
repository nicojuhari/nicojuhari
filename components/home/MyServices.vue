<script setup>

    let myServices = [
        {
            title: 'Website Development',
            description: 'I will create a great website for your business to demonstrate its strength and generate leads.',
            icon: 'ph:code-thin'
        },
        {
            title: 'CRO',
            description: 'I will improve and optimize your website until the conversion rate at least doubles.',
            icon: 'ph:trend-up-thin'
        },
        {
            title: 'Maintenance & Support',
            description: 'I will resolve any JavaScript, CSS, or HTML issues, and tackle other small tasks.',
            icon: 'ph:gear-six-thin'
        }
    ]
</script>
<template>
    <section class="bg-white text-black">
        <div class="container">
            <div class="subtitle mb-10 text-center">My Services</div>
            <div class="grid grid-cols-1 md:grid-cols-3 justify-center gap-10">
                <div v-for="item in myServices" class="p-6 rounded bg-brand-gray bg-opacity-20 border border-brand-gray max-w-sm">
                    <div class="grid place-content-center py-11">
                        <Icon :name="item.icon" class="w-16 flex-shrink-0 h-16 text-brand-color"/>
                    </div>
                    <h3 class="font-medium text-center text-xl mb-6">{{ item.title }}</h3>
                    <p class="text-lg font-light">{{ item.description }}</p>
                </div>
            </div>
            <div class="mt-16 flex justify-center">
                <a href="https://forms.gle/UX2VPKUwyyFdSXbw9" class="btn btn-outline btn-light" target="blank" title="Let's work together">Let's work together</a>
            </div>
        </div>
    </section>
</template>  