<script setup>
import { UCard } from '#components'

useHead({
    title: 'Free Word Counter: Words, Characters, Spaces & More!',
    meta: [
        { name: 'description', content: 'Analyze your text with our free word counter! Get detailed counts for words, characters (with & without spaces), sentences - perfect for social media writers' }
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

// const limitValue = ref(0)
// const value = computed(() => toLimit(textRaw.value, limitValue.value))
// const toLimit = (value, limit) => {
//     return value.length > limit ? value.substring(0, limit) : value
// }

</script>
<template>
    <h1 class="text-center title py-4 mt-12">Advanced Free Word Counter</h1>
    <h2 class="mb-8 text-lg font-normal text-center max-w-xl mx-auto">Analyze your text instantly and get detailed insights
    beyond just word count - characters, sentences, lines & more!</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UCard class="md:col-span-2">
            <div class="relative">
                <UTextarea v-model="textRaw" class="w-full overflow-auto" :rows="16" :maxrows="16"  :autoresize="false" placeholder="Add your text here ..."></UTextarea>
                <UButton color="error" title="Clear the text" class="cursor-pointer absolute right-1.5 bottom-1.5" v-if="textRaw" @click="() => textRaw = ''" icon="i-ph-x-light"></UButton>
            </div>
        </UCard>
        <UCard>
            <div class="grid grid-cols-2 gap-6">
                <div class="grid place-content-center text-center gap-4">
                    <span class="font-medium text-2xl">{{ totalWords }}</span>
                    <span class="text-sm">Words</span>
                </div>
                <div class="grid place-content-center text-center gap-4">
                    <span class="font-medium text-2xl">{{ totalSpaces }}</span>
                    <span class="text-sm">Spaces</span>
                </div>
                <hr class="col-span-2 text-gray-100" />
                <div class="grid place-content-center text-center gap-4">
                    <span class="font-medium text-2xl">{{ totalChars }}</span>
                    <span class="h-12 text-sm">Characters</span>
                </div>
                <div class="grid place-content-center text-center gap-4">
                    <span class="font-medium text-2xl">{{ totalCharsNoSpaces }}</span>
                    <span class="h-12 text-sm">Characters without spacing</span>
                </div>
                <hr class="col-span-2 text-gray-100" />
                <div class="grid place-content-center text-center gap-4">
                    <span class="font-medium text-2xl">{{ totalSentences }}</span>
                    <span class="text-sm">Sentences</span>
                </div>
                <div class="grid place-content-center text-center gap-4">
                    <span class="font-medium text-2xl">{{ totalLines }}</span>
                    <span class="text-sm">Lines</span>
                </div>
            </div>
        </UCard>
    </div>
    <div class="space-y-4 mt-12">
        <h2 class="text-2xl pt-4 font-semibold">Struggling to keep track of your word count?</h2>
        <p>Say goodbye to manual counting with our Free Advanced Word Counter!</p>
        <p>This powerful tool goes beyond simple word counting, offering a comprehensive analysis of your text.
            Whether you're a writer, editor, student, or anyone who needs to track their word usage, our word
            counter is here to help.</p>



        <div>Here's what you get:</div>
        <ul class="list-disc list-inside space-y-1.5">
            <li><strong>Detailed Word Count:</strong> See exactly how many words are in your text.</li>
            <li><strong>Character Count (with & without spaces):</strong> Track characters for specific needs like
                social media posts or SMS messages.</li>
            <li><strong>Sentence & Line Counts:</strong> Gain insights into the structure and conciseness of your
                writing.</li>
            <li><strong>Instant Results:</strong> Simply paste your text or type directly into the app, and get your
                results in seconds!</li>
            <li><strong>Free & Easy to Use:</strong> No need to sign up or download anything. Just use it straight
                from your browser!</li>
        </ul>
        <p>Stop wasting time counting words manually and focus on what matters - creating great content!</p>


        <div class="text-2xl pt-4 font-semibold">FAQs:</div>
        <h3 class="text-lg pt-4 font-bold">Is this word counter free?</h3>
        <p>Absolutely! Our word counter is completely free to use, with no limitations or
            hidden fees.</p>
        <h3 class="text-lg pt-4 font-bold">What kind of text can I use?</h3>
        <p>You can use our word counter for any type of text, from short snippets to long
            documents.</p>
        <h3 class="text-lg pt-4 font-bold">Do I need to create an account?</h3>
        <p>No account creation is necessary. Simply paste your text or type directly
            into the app.</p>
        <h3 class="text-lg pt-4 font-bold">Is my text saved anywhere?</h3>
        <p>No, your text is not saved on our servers. It's processed and analyzed locally in your browser for
            maximum privacy.</p>

        <p class="font-medium pt-4">Ready to take your writing to the next level? Try our Free Advanced Word Counter today!</p>
    </div>
</template>