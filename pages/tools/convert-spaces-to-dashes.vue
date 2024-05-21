<script setup>
useHead({
    title: 'Convert Spaces to Dashes or Underscores in Text: Online & Free!',
    meta: [
        { name: 'description', content: 'Easily Convert Spaces to Dashes (-) or Underscores (_) Online! Our free tool lets you instantly transform text with a single click. Perfect for filenames, URLs, and social media handles. Try it now!' }
    ],
})

const textRaw = ref('')
const loading = ref(false)
const replaceWithSymbol = ref('dashes')
const replaceOptions = ['dashes', 'underscores']

const transformText = ref('lowercase')
const transformOptions = ['none', 'lowercase', 'uppercase', 'capitalize']

const convertedText = computed(() => {
    let text = '';
    if (!textRaw.value) return text

    //remove around spaces
    let textBefore = textRaw.value.trim()
    
    let replaceWith = replaceWithSymbol.value === 'dashes' ? '-' : '_'
    text = textBefore.replace(/\s+/g, replaceWith)

    // transform text
    if (transformText.value === 'none') return text
    else if (transformText.value === 'lowercase') return text.toLowerCase()
    else if (transformText.value === 'uppercase') return text.toUpperCase()
    else if (transformText.value === 'capitalize') {
        text = text.toLowerCase()
        return text.replace(/\b\w/g, (char) => char.toUpperCase())
    }
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
            <h1 class="text-center mb-10 page-title">Text Space Converter</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 my-6 gap-6">
                <URadioGroup v-model="replaceWithSymbol" legend="Replace spaces with:" :options="replaceOptions" />
                <URadioGroup v-model="transformText" legend="Transform to:" :options="transformOptions" />
            </div>
            <div>
                <UTextarea v-model="textRaw" placeholder="Add your text here ..."></UTextarea>
                <div v-if="convertedText" class="border p-4 rounded-lg my-2 bg-gray-50 flex justify-between items-center">
                    <span class="truncate text-ellipsis">{{ convertedText }}</span>
                    <UButton icon="i-ph-copy-simple-light" size="sm" color="green" square variant="solid"
                    :loading="loading" :disabled="loading" title="Copy to Clipboard"
                        @click="copyToClipboard" />
                </div>
                <div class="mt-6" v-if="textRaw">
                    <UButton color="brand" @click="() => textRaw = ''">Clear</UButton>
                </div>
            </div>
            <div class="my-8 space-y-4">
                <p>Our free online tool helps you easily convert spaces to dashes (-) or underscores (_). No more
                    wrestling
                    with inconsistent filenames, URLs, or social media handles.</p>
                <p>Just copy and paste your text, choose dashes
                    or underscores, and let us do the work!</p>
                <p>Also, you can transform your text to:    
                    <ul class="list-disc list-inside">
                        <li>Lowercase</li>
                        <li>Uppercase</li>
                        <li>Capitalize</li>
                    </ul>
                </p>

                <p>This handy tool keeps things clean and organized. Consistent filenames make your computer easier to
                    navigate. Dashes or underscores in URLs can even improve search engine visibility. And for social
                    media,
                    a clean username with dashes or underscores makes a great first impression.</p>

                <p>Skip the manual editing and use our Space-to-Dash/Underscore Converter! It's simple, fast, and free
                    for
                    everyone. So go ahead, tame your text and embrace a more organized digital life!</p>
            </div>
        </div>
    </section>
</template>