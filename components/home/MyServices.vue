<script setup>

    let myStack = [
        { 
            name: 'JavaScript',
            icon: 'javascript'
        },
        { 
            name: 'Vue.js',
            icon: 'vue'
        },
        {
            name: 'Nuxt.js',
            icon: 'nuxt-icon'
        }
    ]
</script>
<template>
    <div>
        <div v-for="item in myStack">
            <Icon :name="item.icon" />
            {{ item.name }}
        </div>
    </div>
</template>