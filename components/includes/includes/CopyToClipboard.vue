<template>
    <button @click.prevent="copyToClipboard" class="btn relative overflow-hidden justify-center" :disabled="buttonState !== 'normal'">
        <span v-if="buttonState === 'normal'">Copy to Clipboard</span>
        <span v-else-if="buttonState === 'loading'" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            Loading...
        </span>
        <span v-else-if="buttonState === 'copied'">Copied!</span>
    </button>
</template>

<script setup lang="ts">
const buttonState = ref < 'normal' | 'loading' | 'copied' > ('normal')

const copyToClipboard = async () => {

    buttonState.value = 'loading'

    try {
       
        await navigator.clipboard.writeText(window.location.href)
        setTimeout(() => {
            buttonState.value = 'copied'
        }, 600)

        setTimeout(() => {
            buttonState.value = 'normal'
        }, 1200)
    } catch (err) {
        console.error('Failed to copy text: ', err)
        buttonState.value = 'normal'
    }
}
</script>

<style lang="scss" scoped>

</style>