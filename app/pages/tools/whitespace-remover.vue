<script setup>
useHead({
    title: 'Whitespace Remover | Replace or Remove the Spaces in Text',
    meta: [
        { name: 'description', content: 'Online Whitespace Remover - quickly replace or remove spaces with hyphens, underscores, slashes, or new lines. Fast, browser-based tool, no signup.' }
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
    <div class="container">
        <h1 class="title mb-2">Whitespace Remover</h1>
        <h2 class="mb-8">Replace text spaces with dashes (hyphens), underscores, slashes or new lines. Simple and fast.</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
                <div class="relative w-full">
                    <UTextarea v-model="textRaw" class="w-full overflow-auto" :rows="8" :maxrows="12" placeholder="Add your text here ..."></UTextarea>
                    <UButton color="error" variant="subtle" title="Clear the text" class="cursor-pointer absolute right-1.5 bottom-1.5" v-if="textRaw" @click="() => textRaw = ''" icon="i-ph-x-light"></UButton>
                </div>
                <div v-if="convertedText"
                    class="my-6 space-y-4">
                    <div class="p-1.5 rounded-md bg-white border max-h-[200px] overflow-y-auto">
                        <div v-if="keepNewlines || replaceWithSymbol === 'new line'" v-html="convertedText.split('\n').join('<br>')"></div>
                        <div v-else class="border-0 w-full outline-0 resize-none pl-1 h-full">{{  convertedText }}</div>
                    </div>
                    <div class="flex justify-end">
                        <UButton icon="i-ph-copy-simple-light" label="Copy" variant="subtle"
                            :loading="loading" :disabled="loading" color="success" title="Copy to Clipboard" @click="copyToClipboard" />
        
                    </div>
                </div>
            </div>
            <div class="space-y-6 card">
                <URadioGroup v-model="replaceWithSymbol" legend="Replace with:"
                    :items="replaceOptions" variant="table" size="sm"/>
                <URadioGroup v-model="transformText" legend="Transform the case?" :items="transformOptions" variant="table" size="sm" />
                    <USwitch label="Reverse the text?" v-model="reverseText"/>
                    <USwitch label="Keep the new lines?" v-model="keepNewlines" />
            </div>
        </div>
        <div class="mt-6 space-y-6">
            <div class="space-y-6">
                <p>
                    Quickly reformat text for filenames, URLs, social handles, menus, or any copy. Replace or remove spaces, change case, reverse word order, and keep line breaks — all in seconds, in your browser.
                </p>
    
                <div>
                    <h2 class="font-semibold text-lg mb-2">What it does</h2>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Replace spaces with: dashes (<span class="font-mono">-</span>), underscores (<span class="font-mono">_</span>), slashes (<span class="font-mono">/</span>), new lines, or keep spaces.</li>
                        <li>Remove extra whitespace (normalize multiple spaces to single).</li>
                        <li>Change case: none, lowercase, uppercase, capitalize each word.</li>
                        <li>Optionally reverse word order.</li>
                        <li>Optionally preserve existing new lines.</li>
                    </ul>
                </div>
    
                <div>
                    <h2 class="font-semibold text-lg mb-2">Why use it</h2>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Save time: no manual find and replace.</li>
                        <li>Ensure consistent filenames, slugs, and social handles.</li>
                        <li>Prevent errors from inconsistent spacing or casing.</li>
                    </ul>
                </div>
    
                <div>
                    <h2 class="font-semibold text-lg mb-2">How to use</h2>
                    <ol class="list-decimal list-inside space-y-1">
                        <li>Paste or type your text into the input box.</li>
                        <li>Choose “Replace with”: dashes, underscores, slashes, keep spaces, or new line.</li>
                        <li>Select “Transform the case?”: none, lowercase, uppercase, or capitalize.</li>
                        <li>Toggle “Reverse the text?” if you want words reversed.</li>
                        <li>Choose “Keep the new lines?” to preserve line breaks.</li>
                        <li>Results update instantly - copy the output and use it where needed.</li>
                    </ol>
                </div>
    
                <div>
                    <h2 class="font-semibold text-lg mb-2">Best use cases</h2>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Create clean filenames and URLs from product names or menu items.</li>
                        <li>Convert phrases to social handles or tags.</li>
                        <li>Format CSV or import-ready text.</li>
                        <li>Prepare short descriptions or SMS-friendly copy.</li>
                    </ul>
                </div>
    
                <div>
                    <h2 class="font-semibold text-lg mb-2">Privacy &amp; convenience</h2>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Runs in your browser. Text is not stored on our servers.</li>
                        <li>No signup or download required. Free to use.</li>
                    </ul>
                    <p class="pt-6">Try the Whitespace Remover to format text easily and quickly.</p>
                </div>
            </div>
        </div>
    </div>
</template>