<template>
    <div class="flex flex-col min-h-screen">
        <IncludesHeader />
        <div class="flex-auto py-12">
            <slot></slot>
        </div>
        <IncludesFooter class="mt-auto" />
    </div>
</template>