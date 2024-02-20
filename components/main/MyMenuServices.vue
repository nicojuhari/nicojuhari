<script setup>

    const list = [
        { 
            title: 'Menu design',
            description: ' I will design your menu to match your website identity.'
        },
        {
            title: 'App integration',
            description: ' I will integrate this menu maker app into your project, with custom fields and design.'
        },
        {
            title: 'Website design and development',
            description: ' I will create fully functional restaurant website, app integration and custom design.'
        }
    ]

</script>
<template>
    <div>
        <h3 class="text-xl font-medium mb-6 text-center">I could help you, with:</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div v-for="item in list" :key="item.title" class="bg-brand-color text-white p-6 duration-300 rounded-xl">
                <div class="text-lg font-bold">{{item.title }}</div>
                <div class="mt-6">{{ item.description }}</div>  
            </div>
        </div>
        <div class="my-6 text-center">
            <UButton to="/contact" variant="outline" color="brand-blue" class="m-auto" title="Contact me">Contact me</UButton>
        </div>
        
    </div>
</template>