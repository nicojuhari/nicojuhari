<!-- hide the subtitle on /tools page -->

<template>
        <Body class="bg-gray-100/50" />
        <div class="my-6 md:my-8">
            <NuxtPage/>
        </div>
        <div class="container container-sm my-6 md:my-8">
            <p class="subtitle text-center mb-6" v-if="$route.path != '/tools' ">Other tools you may like</p>
            <MainToolsList />
        </div>
</template>