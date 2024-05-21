<script setup>
useHead({
    title: 'Instantly Count Words & Characters Online (Free!)',
    meta: [
        { name: 'description', content: 'Our free online tool helps you track word count and character count for perfect content creation. Ideal for writers, bloggers, and social media users. Try it Now!' }
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

//count sentences in a text
// const totalSentences = computed(() => {
//     let text = textRaw.value.trim()
//     if (text.length)
//         return textRaw.value.split(/[.!?]+\s+/).length - 1
//     else return 0
// })

</script>
<template>
    <section>
        <div class="container">
            <h1 class="text-center mb-10 page-title">Free Word Counter</h1>
            <div class="grid grid-cols-2 md:grid-cols-3 my-6">
                <div> Characters: <span class="font-bold">{{ totalChars }}</span></div>
                <div> Words: <span class="font-bold">{{ totalWords }}</span></div>
                <div> Spaces: <span class="font-bold">{{ totalSpaces }}</span></div>
                <!-- <div> Sentences: <span class="font-bold">{{ totalSentences }}</span></div> -->
            </div>
            <div>
                <UTextarea v-model="textRaw" :rows="19" placeholder="Add your text here ..."></UTextarea>
                <div class="mt-6" v-if="textRaw">
                    <UButton color="brand" @click="() => textRaw = ''">Clear</UButton>
                </div>
            </div>
        </div>
    </section>
</template>