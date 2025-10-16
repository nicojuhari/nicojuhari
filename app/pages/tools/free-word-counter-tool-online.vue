<script setup>
import { UCard } from '#components'

useHead({
    title: 'Free Word Counter Tool Online - Characters & Sentences',
    meta: [
        { name: 'description', content: 'Free Word Counter Tool Online - quickly count words, characters, and reading time from any text. Fast, simple, and mobile-friendly.' }
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
    <h1 class="text-center title mb-4">Free Word Counter Tool Online</h1>
    <p class="mb-8 text-lg font-normal text-center max-w-xl mx-auto">Free Word Counter Tool Online - quickly count words, characters, and reading-time estimates to speed up content edits on the go.</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2 card h-full flex flex-col gap-4">
            <div class="relative flex-1">
                <UTextarea v-model="textRaw" class="w-full flex-1" :rows="23" :maxrows="23" :autoresize="false" placeholder="Add your text here ..."></UTextarea>
                <UButton color="error" variant="subtle" title="Clear the text" class="cursor-pointer absolute right-1.5 bottom-1.5" v-if="textRaw" @click="() => textRaw = ''" icon="i-ph-x-light"></UButton>
            </div>
        </div>
        <UCard>
            <div class="grid grid-cols-2 gap-4">
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
        </UCard>
    </div>
    <div class="space-y-6 my-12">
        <p>Free Word Counter Tool Online - fast, accurate text counter you can use in seconds.</p>
        <div>
            <h3 class="font-semibold">What it does</h3>
            <ul class="list-disc pl-5">
                <li>Exact word count.</li>
                <li>Character count with and without spaces.</li>
                <li>Sentence and line counts.</li>
                <li>Estimated reading time.</li>
                <li>Works for short snippets and long documents.</li>
            </ul>
        </div>
        <div>
            <h3 class="font-semibold">How it helps</h3>
            <ul class="list-disc pl-5">
                <li>Save time - no manual counting.</li>
                <li>Fit copy to limits (menus, social, SMS).</li>
                <li>Improve clarity by spotting long sentences and lines.</li>
                <li>Edit on the go - mobile-friendly and instant.</li>
            </ul>
        </div>
        <div>
            <h3 class="font-semibold">Who it's for</h3>
            <ul class="list-disc pl-5">
                <li>Writers and editors needing quick counts.</li>
                <li>Marketers optimizing copy for platforms.</li>
                <li>Students checking essay lengths.</li>
                <li>Anyone needing fast, accurate text metrics.</li>
            </ul>
        </div>
        <div>
            <h3 class="font-semibold">How to use</h3>
            <ol class="list-decimal pl-5">
                <li>Paste your text or type directly into the box.</li>
                <li>Results update immediately.</li>
                <li>No downloads or sign-ups required.</li>
            </ol>
        </div>
        <div>
            <h3 class="font-semibold">Privacy</h3>
            <ul class="list-disc pl-5">
                <li>Text is processed in your browser.</li>
                <li>Nothing is stored on our servers.</li>
            </ul>
        </div>
        <div>
            <h3 class="font-semibold">Quick FAQs</h3>
            <ul class="list-disc pl-5">
                <li><strong>Is it free?</strong> Yes. Completely free with no hidden fees.</li>
                <li><strong>Do I need an account?</strong> No account or signup needed.</li>
                <li><strong>Is my text saved?</strong> No. All processing happens locally in your browser. We do not store any data.</li>
            </ul>
        </div>
    </div>
</template>