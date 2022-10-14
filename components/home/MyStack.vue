<script setup>
const myStack = ['JavaScript', 'Vue.js', 'Nuxt.js', 'Node.js', 'MySQL', 'Firebase', 'TailwindCSS', 'SASS', 'HTML', 'CSS', 'WordPress', 'Magento']

const myStack2 = [
    {
        name: 'Front End',
        tools: ['JavaScript', 'Vue.js', 'TailwindCSS', 'SASS', 'HTML', 'CSS']
    },
    {
        name: 'Back End',
        tools: ['Node.js', 'Nuxt.js', 'Firebase', 'PHP' ]
    },
    {
        name: 'Database',
        tools: ['MySQL', 'Firestore']
    },
    {
        name: 'CMS',
        tools: ['StoryBlok', 'WordPress', 'Magento' ]
    },
    {
        name: 'Other',
        tools: ['Git', 'PhotoShop']
    }
]
</script>
<template>
    <section>
        <div class="container">
            <h2 class="subtitle mt-20 md:mt-30 mb-5">My Stack</h2>
            <div v-for="item in myStack2" :key="item" class="flex gap-2 md:gap-4 flex-wrap mt-3">
                <div class="font-bold"> {{ item.name}}:</div>
                <div v-for="tool in item.tools" :key="tool">
                    {{ tool }}
                </div>
            </div>
        </div>
    </section>
</template>