<script setup lang="ts">

useHead({
    title: 'Word Counter Tool | Free and Online',
    meta: [
        { name: 'description', content: 'Use Word Counter Tool Online and quickly count words, characters, and reading time from any text. Fast, simple, and FREE.' }
    ],
})

const textRaw = ref('')

const totalChars = computed(() => textRaw.value.length)
const totalWords = computed(() => {
    let text = textRaw.value.trim()
    if (text.length)
        return textRaw.value.trim().split(/\s+/).length
    else return 0
})

const totalSpaces = computed(() => {
    const count = textRaw.value.split(" ").length - 1
    return count > 0 ? count : 0
})

// characters without spaces
const totalCharsNoSpaces = computed(() => {
    return textRaw.value.replace(/\s/g, '').length
})

// count the sentences in a text even if there are no spaces after the period
const totalSentences = computed(() => {
    let text = textRaw.value.trim()
    if (text.length)
        return textRaw.value.split(/[.!?]+/).length - 1
    else return 0
})

// count the lines in a text or textarea
const totalLines = computed(() => {
    if (!textRaw.value) return 0
    let text = textRaw.value.trim()
    return text.split(/\r\n|\r|\n/).length
})

const readingtime = computed(() => {
    const wordsPerMinute = 200 // Average reading speed
    return Math.ceil(totalWords.value / wordsPerMinute)
})

// const limitValue = ref(0)
// const value = computed(() => toLimit(textRaw.value, limitValue.value))
// const toLimit = (value, limit) => {
//     return value.length > limit ? value.substring(0, limit) : value
// }

</script>
<template>
    <div class="container">
        <h1 class="title mb-2">Word Counter Tool</h1>
        <h2 class="mb-8">Quickly count words, characters, and reading-time estimates in your text.</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 h-full flex flex-col gap-4">
                <div class="relative flex-1">
                    <UTextarea v-model="textRaw" class="w-full flex-1" :rows="21" :maxrows="21" :autoresize="false" placeholder="Add your text here ..."></UTextarea>
                    <UButton color="error" variant="subtle" title="Clear the text" class="cursor-pointer absolute right-1.5 bottom-1.5" v-if="textRaw" @click="textRaw = ''" icon="i-ph-x-light"></UButton>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 card">
                <div class="grid place-content-center text-center gap-3">
                    <span class="font-medium text-2xl">{{ totalWords }}</span>
                    <span class="text-sm">Words</span>
                </div>
                <div class="grid place-content-center text-center gap-3">
                    <span class="font-medium text-2xl">{{ totalSpaces }}</span>
                    <span class="text-sm">Spaces</span>
                </div>
                <hr class="col-span-2 text-gray-100" />
                <div class="grid place-content-center text-center gap-3">
                    <span class="font-medium text-2xl">{{ totalChars }}</span>
                    <span class="h-12 text-sm">Characters</span>
                </div>
                <div class="grid place-content-center text-center gap-3">
                    <span class="font-medium text-2xl">{{ totalCharsNoSpaces }}</span>
                    <span class="h-12 text-sm">Characters without spacing</span>
                </div>
                <hr class="col-span-2 text-gray-100" />
                <div class="grid place-content-center text-center gap-3">
                    <span class="font-medium text-2xl">{{ totalSentences }}</span>
                    <span class="text-sm">Sentences</span>
                </div>
                <div class="grid place-content-center text-center gap-3">
                    <span class="font-medium text-2xl">{{ totalLines }}</span>
                    <span class="text-sm">Lines</span>
                </div>
                <hr class="col-span-2 text-gray-100" />
                <div class="grid place-content-center text-center gap-3 col-span-2">
                    <span class="font-medium text-2xl">{{ readingtime }} min</span>
                    <span class="text-sm">Reading Time</span>
                </div>
            </div>
        </div>
        <div class="space-y-4 mt-6">
            <p>Word Counter Tool is a fast, free, and accurate text counter you can use in seconds, paste or type and get instant results.</p>
            <p>It shows exact word and character counts (with and without spaces), sentence and line counts, and estimated reading time.</p>
            <p>Works for short snippets or long documents and updates live as you edit.</p>
            <p>Perfect for fitting social posts, messages, articles, or any platform with strict limits.</p>
            <p>No downloads, no signup, and all processing happens in your browser, we never store your text.</p>
        </div>
    </div>
</template>