<script setup lang="ts">
    import { onClickOutside } from '@vueuse/core';
    const showNav = ref(false);
    const templRef = ref(null);
    onClickOutside(templRef, () => showNav.value ? showNav.value = false : null) //close

    const toggleNav = () => {
        return showNav.value = !showNav.value;
    }
    
</script>
<template>
    <div class="menu-layout bg-gray-50">
        <IncludesSidebar ref="templRef" :class="showNav && '!translate-x-0'" @close="toggleNav"/>
        <main>
            <IncludesHeaderMenuPage @open-nav="toggleNav" :isOpen="showNav"/>
            <div class="container">
                <slot />
            </div>
        </main>
    </div>
</template>
<style>
    .menu-layout {
        display: grid;
        grid-template-columns: auto minmax(0,1fr);
        grid-template-rows: 0fr 1fr;
        margin: 0 auto;
        min-height: 100vh;
    }
    
    .menu-layout aside {
        grid-column: 1/2;
        grid-row: 1/3;
    }
    .menu-layout main {
        grid-column: 2/3;
        grid-row: 1/3;
    }

    @media (min-width: 768px) {
        .menu-layout {
            grid-template-columns: 16rem minmax(0, 3fr);
        }
    }
</style>