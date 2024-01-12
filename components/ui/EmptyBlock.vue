<script setup>
defineProps(['text'])
</script>
<template>
    <div class="overflow-clip flex items-center justify-center h-32 border-4 text-gray-400 rounded-md">
        <div class="w-full m-auto px-4 text-center">
            <slot></slot>
        </div>
    </div>
</template>