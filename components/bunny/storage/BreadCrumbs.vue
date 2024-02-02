<script setup>
import { computed } from "vue";

const { currentPath, changePath } = usePath();

const breadCrumbs = computed(() => {
    let crumbs = []
    let path = currentPath.value ? currentPath.value.replace('#', '') : '/'
    let paths = path.split('/')
    paths.forEach((crumb, index) => {
        if (crumb) {
            crumbs.push({
                name: crumb,
                path: paths.slice(0, index + 1).join('/')
            })
        }
    })
    return crumbs
})

</script>
<template>
    <div class="flex py-3 mt-4 md:mt-8  border-y items-center overflow-scroll">
        <div @click="changePath('', true)" class="cursor-pointer flex gap-2 items-center">
            <Icon name="ph:house-light" class="w-6 h-6" /> Home
        </div>
        <div v-for="crumb in breadCrumbs" class="pl-3 shrink-0">
            <div class="flex items-center">
                <span class="mr-3 text-2xl">&#8250;</span>
                <BunnyIconFolder class="w-6 h-6 mr-1 cursor-pointer" />
                <span class="cursor-pointer text-gray-500" @click="changePath(crumb.path + '/', true)">{{ crumb.name }}</span>
            </div>
        </div>
    </div>
</template>