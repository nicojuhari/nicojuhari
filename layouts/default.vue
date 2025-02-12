<script setup>

</script>
<template>
    <div class="min-h-screen flex flex-col">
        <IncludesHeader />
        <main>
            <slot></slot>
        </main>
        <IncludesFooter class="mt-auto" />
    </div>
</template>