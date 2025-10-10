<script setup>

</script>
<template>
    <div class="min-h-screen flex flex-col">
        <Body class="bg-gray-100/70"/>
        <IncludesHeader />
        <main>
            <slot></slot>
        </main>
        <IncludesFooter class="mt-auto" />
    </div>
</template>