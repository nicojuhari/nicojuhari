<template>
    <div class="flex flex-col min-h-screen">
        <div class="p-4 text-center bg-slate-100 flex items-center gap-4">
            <NuxtLink to="/" class="p-1 grid place-content-center grid-cols-1 bg-slate-300 rounded">
                <IconsArrow></IconsArrow>
            </NuxtLink>
            Back to All Designs
        </div>
        <slot></slot>
    </div>
</template>