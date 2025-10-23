<script setup>
useHead({
    title: 'Whitespace Remover | Replace or Remove the Spaces in Text',
    meta: [
        { name: 'description', content: 'Online Whitespace Remover - quickly replace or remove spaces with hyphens, underscores, slashes, or new lines. Fast, browser-based tool, and FREE' }
    ],
})

const textRaw = ref('')
const loading = ref(false)
const replaceWithSymbol = ref('dashes')
const replaceOptions = ['dashes', 'underscores', 'slashes', 'keep spaces', 'new line', 'remove all spaces']
const replaceOptionsSymbol = {
    dashes: '-',
    underscores: '_',
    slashes: '/',
    'keep spaces': ' ',
    'new line': '\n',
    'remove all spaces': ''
}
const keepNewlines = ref(false)
const transformText = ref('none')
const transformOptions = ['none', 'lowercase', 'uppercase', 'capitalize']

const reverseText = ref(false)

const convertedText = computed(() => {
    let text = '';
    if (!textRaw.value) return text

    //remove around spaces
    let textBefore = textRaw.value.trim()
    
    //replace spaces
    let replaceWith = replaceOptionsSymbol[replaceWithSymbol.value]
    if (keepNewlines.value) {
        text = textBefore.replace(/ +/g, replaceWith)  
    }// Only replace spaces
    else text = textBefore.replace(/\s+/g, replaceWith) // Replace all whitespace (spaces and new lines)

    // transform text
    if (transformText.value === 'lowercase') text = text.toLowerCase()
    if (transformText.value === 'uppercase') text = text.toUpperCase()
    if (transformText.value === 'capitalize') {
        text = text.toLowerCase()
        text = text.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    //reverse text
    if (reverseText.value) text = text.split('').reverse().join('')

    //trim
    if (keepNewlines.value) {
        const lst = text.split('\n').map(line => line.trim().replace(/^[_\-\/\s]+|[_\-\/\s]+$/g, '')); // Remove leading/trailing _,-, or spaces
        // text = lines.join('<br>'); //
        text = lst.join('\n')
    } 
    
    return text
})


//copy to clipboard
const copyToClipboard = () => {
    loading.value = true;
    navigator.clipboard.writeText(convertedText.value);
    setTimeout(() => {
        loading.value = false;
    }, 1000);
}

</script>
<template>
    <div class="container container-sm">
        <h1 class="title mb-2">Whitespace Remover</h1>
        <h2 class="mb-8">Replace text spaces with dashes (hyphens), underscores, slashes or new lines. Simple and fast.</h2>
        <div class="grid grid-cols-1 gap-6">
            <div>
                <div class="relative w-full">
                    <UTextarea v-model="textRaw" class="w-full overflow-auto" :rows="8" :maxrows="12" placeholder="Add your text here ..."></UTextarea>
                    <UButton color="error" variant="subtle" title="Clear the text" class="cursor-pointer absolute right-1.5 bottom-1.5" v-if="textRaw" @click="() => textRaw = ''" icon="i-ph-x-light"></UButton>
                </div>
                <div v-if="convertedText"
                    class="my-6 space-y-4">
                    <div class="p-1.5 py-3 rounded-md bg-white border max-h-[200px] overflow-y-auto">
                        <div v-if="keepNewlines || replaceWithSymbol === 'new line'" v-html="convertedText.split('\n').join('<br>')"></div>
                        <div v-else class="border-0 w-full outline-0 resize-none pl-1 h-full">{{  convertedText }}</div>
                    </div>
                    <div class="flex justify-end">
                        <UButton icon="i-ph-copy-simple-light" label="Copy" variant="subtle"
                            :loading="loading" :disabled="loading" color="success" title="Copy to Clipboard" @click="copyToClipboard" />
        
                    </div>
                </div>
            </div>
            <div class="card grid grid-cols-1 md:grid-cols-3 gap-6">
                <URadioGroup v-model="replaceWithSymbol" legend="Replace with:"
                    :items="replaceOptions" variant="table" size="sm"/>
                <URadioGroup v-model="transformText" legend="Transform:" :items="transformOptions" variant="table" size="sm" />
                <div class="space-y-6 md:mt-6">
                    <USwitch label="Reverse the text?" v-model="reverseText"/>
                    <USwitch label="Keep the new lines?" v-model="keepNewlines" />
                </div>
            </div>
        </div>
        <div class="mt-6 space-y-4">
            <p>Quickly reformat text for filenames(images), URLs, social handles, and any short copy - all in seconds, in your browser.</p>
            <p>Replace or remove spaces with dashes, underscores, slashes, or new lines, and normalize extra whitespace automatically.</p>
            <p>Change case (lower, UPPER, Capitalize), optionally reverse word order, and preserve line breaks when you need them.</p>
            <p>Results update instantly so you can copy clean output straight into CSVs, slugs, or rename files.</p>
            <p>No signup, no uploads - everything runs locally and nothing is stored on our servers.</p>
        </div>
    </div>
</template>