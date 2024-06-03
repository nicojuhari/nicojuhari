<script setup>
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
    <section>
        <div class="container">
            <h1 class="text-center mb-2 page-title">Advanced Free Word Counter</h1>

            <div class="mb-8 text-lg font-normal text-center">Analyze your text instantly and get detailed insights
                beyond just word count - characters, sentences, lines & more!</div>
        </div>
        <div class="container flex flex-col md:flex-row gap-8">
            <div class="word-counter-left">
                <UTextarea v-model="textRaw" :rows="19" placeholder="Add your text here ..."></UTextarea>
                <div class="mt-6" v-if="textRaw">
                    <UButton color="brand" @click="() => textRaw = ''">Clear</UButton>
                </div>
            </div>
            <div class="word-counter-right card">
                <UCard>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="grid place-content-center text-center gap-4">
                            <span class="font-medium text-2xl">{{ totalWords }}</span>
                            Words
                        </div>
                        <div class="grid place-content-center text-center gap-4">
                            <span class="font-medium text-2xl">{{ totalSpaces }}</span>
                            Spaces
                        </div>
                        <UDivider class="col-span-2" />
                        <div class="grid place-content-center text-center gap-4">
                            <span class="font-medium text-2xl">{{ totalChars }}</span>
                            <span class="h-12">Characters</span>
                        </div>
                        <div class="grid place-content-center text-center gap-4">
                            <span class="font-medium text-2xl">{{ totalCharsNoSpaces }}</span>
                            <span class="h-12">Characters without spacing</span>
                        </div>
                        <UDivider class="col-span-2" />
                        <div class="grid place-content-center text-center gap-4">
                            <span class="font-medium text-2xl">{{ totalSentences }}</span>
                            Sentences
                        </div>
                        <div class="grid place-content-center text-center gap-4">
                            <span class="font-medium text-2xl">{{ totalLines }}</span>
                            Lines
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </section>
    <section>
        <div class="container space-y-4">
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
    </section>
</template>
<style scoped>
    .word-counter-left, .word-counter-right {
        flex: 1;
    }
    @media (min-width: 768px) {
        .word-counter-left {
            flex: 2;
        }
        .word-counter-right {
            flex: 1;
        }
    }

</style>