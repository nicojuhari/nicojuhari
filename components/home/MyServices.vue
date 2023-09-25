<script setup>

    let myServices = [
        {
            title: 'Business Website',
            description: 'I can create a great website for your company to demonstrate its strength and generate leads.',
            icon: 'ph:code-thin'
        },
        {
            title: 'Maintenance & Support',
            description: 'I can resolve any JavaScript, CSS, or HTML issues, perform website updates, and tackle other small tasks.',
            icon: 'ph:gear-six-thin'
        }
    ]
</script>
<template>
    <section class="bg-white text-black">
        <div class="container">
            <div class="subtitle mb-10 text-center">My Services</div>
            <div class="flex flex-col md:flex-row justify-center gap-10">
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