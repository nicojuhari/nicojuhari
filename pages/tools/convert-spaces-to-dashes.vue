<script setup>
useHead({
    title: 'Convert Spaces to Dashes or Underscores in Text: Online & Free!',
    meta: [
        { name: 'description', content: 'Convert spaces to slashes, dashes, underscores. Transform the text to uppercase, capitalize and lowercase. Perfect for code, SEO, filenames, and more!' }
    ],
})

const textRaw = ref('')
const loading = ref(false)
const replaceWithSymbol = ref('dashes')
const replaceOptions = ['dashes', 'underscores', 'slashes', 'keep spaces']
const replaceOptionsSymbol = {
    dashes: '-',
    underscores: '_',
    slashes: '/',
    'keep spaces': ' '
}

const transformText = ref('lowercase')
const transformOptions = ['none', 'lowercase', 'uppercase', 'capitalize']

const reverseText = ref('none')
const reverseTextOptions = ['none', 'reverse']

const convertedText = computed(() => {
    let text = '';
    if (!textRaw.value) return text

    //remove around spaces
    let textBefore = textRaw.value.trim()
    
    //replace spaces
    let replaceWith = replaceOptionsSymbol[replaceWithSymbol.value]
    text = textBefore.replace(/\s+/g, replaceWith)

    // transform text
    if (transformText.value === 'lowercase') text = text.toLowerCase()
    if (transformText.value === 'uppercase') text = text.toUpperCase()
    if (transformText.value === 'capitalize') {
        text = text.toLowerCase()
        text = text.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    //reverse text
    if (reverseText.value === 'reverse') text = text.split('').reverse().join('')

    return text
})



//copy to clipboard
const copyToClipboard = () => {
    loading.value = true
    navigator.clipboard.writeText(convertedText.value)
    setTimeout(() => {
        loading.value = false
    }, 1000)
}

</script>
<template>
    <section>
        <div class="container">
            <h1 class="text-center mb-2 page-title">Text Space Converter</h1>
            <div class="mb-8 text-lg font-normal text-center">Convert spaces (slashes, dashes, keep/remove), reverse the text<br>
                change case (uppercase, lowercase, capitalize) - all in one powerful tool!</div>
        </div>
        <div class="container grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-2">
                <UTextarea v-model="textRaw" :rows="8" placeholder="Add your text here ..."></UTextarea>
                <div v-if="convertedText"
                    class="border p-4 px-6 rounded-lg my-2 bg-gray-50 flex justify-between items-center">
                    <span class="truncaste text-esllipsis">{{ convertedText }}</span>
                    <UButton icon="i-ph-copy-simple-light" size="sm" color="green" square variant="solid"
                        :loading="loading" :disabled="loading" title="Copy to Clipboard" @click="copyToClipboard" />
                </div>
                <div class="mt-6" v-if="textRaw">
                    <UButton color="brand" @click="() => textRaw = ''">Clear</UButton>
                </div>
            </div>
            <div>
                <UCard>
                    <div class="space-y-8">
                        <URadioGroup v-model="replaceWithSymbol" legend="Replace the spaces with:"
                            :options="replaceOptions" />
                        <URadioGroup v-model="transformText" legend="Transform the text:" :options="transformOptions" />
                        <URadioGroup v-model="reverseText" legend="Reverse the text:" :options="reverseTextOptions" />
                    </div>
                </UCard>
            </div>
        </div>
    </section>
    <section>
        <div class="container my-8 space-y-4">
            <h2 class="text-2xl pt-4 font-semibold">Easily format your text with our free converter!</h2>
            <p>Tired of inconsistent dashes, underscores, and capitalization in filenames, URLs, or social media
                handles?</p>
            <p>
                Our powerful converter takes the hassle out of text formatting. Simply copy and paste your text, then
                choose
                your desired outcome:
            </p>
            <ul class="list-disc list-inside space-y-1.5">
                <li>Convert spaces to dashes (-) or underscores (_) - for clean and consistent file names and URLs.</li>
                <li>Change case entirely: uppercase, lowercase, or capitalize each word for perfect formatting.</li>
                <li>Reverse the order of words (Optional) - create unique usernames or titles.</li>
            </ul>
            <p>
                No more manual editing! Our tool simplifies the process, saving you time and ensuring consistency across
                your digital life.
            </p>
            <p class="pt-4"><strong>Here's why you'll love it:</strong></p>
            <ul class="list-disc list-inside space-y-1.5">
                <li><strong>Clean & Organized:</strong> Consistent formatting improves file navigation and search engine
                    visibility.</li>
                <li><strong>Fast & Easy:</strong> Simply copy, paste, and choose your formatting option.</li>
                <li><strong>Free for Everyone:</strong> Enjoy the benefits without any cost.</li>
            </ul>
            <p class="pt-4"><strong>Embrace a more organized digital life. Tame your text with our Free Space Converter
                    today!</strong></p>
        </div>
    </section>
</template>