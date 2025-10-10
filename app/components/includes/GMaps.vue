<script setup>
defineProps({
    src: String,
})
</script>
<template>
    <div class="overflow-hidden">
        <iframe style="height:100%;width:100%;border:0;" frameborder="0" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade" :src="src">
        </iframe>
    </div>
</template>