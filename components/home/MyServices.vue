<script setup>

    let myServices = [
        { 
            title: 'Restaurant website',
            description: 'Excellent website for increasing sales and attracting new customers for your restaurant.',
            icon: 'restaurant-website.png'
        },
        {
            title: 'Business website',
            description: 'Great website for your company to demonstrate its strength and generate leads.',
            icon: 'business-website.png'
        },
        {
        title: 'Maintenance & Support',
        description: 'I will fix any JavaScript, CSS, or HTML error, website updates, and other minor tasks.',
        icon: 'maintenance-support.png'
    }
    ]
</script>
<template>
    <section>
        <div class="container">
            <div class="subtitle my-10 text-center">Services</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-6 pt-20">
                <div v-for="item in myServices" class=" p-6 rounded-xl card-box-shadow hover:-translate-y-3 duration-700">
                    <div class="flex flex-col gap-6 -mt-20">
                        <img :src="'/' + item.icon" :alt="item.title" :title="item.title" class="h-40 m-auto"/>
                        <h3 class="font-medium text-center text-2xl text-brand-color">{{ item.title }}</h3>
                        <p class="text-lg font-light text-center">{{ item.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>