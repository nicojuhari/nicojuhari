<script setup>



const listOfFeatures = [
    'Upload and delete files.',
    'Rename your files before uploading.',
    'Navigate through your folders.',
    'Get a shareable link to your files.',
]



</script>

<template>
    <section>
        <div class="container">
            <div class="mt-16 md:mt-24 text-center py-4">
                <div class="text-2xl md:text-5xl font-bold">Manage your <a class="text-orange-500"
                        href="https://bunny.net?ref=kw3bknywrh" target="_blank" rel="nofollow">bunny.net</a><br>assets with ease</div>
                <div class="flex justify-center mt-8">
                    <ul class="grid grid-cols-1 md:grid-cols-2 mx-auto gap-2">
                        <li v-for="feature in listOfFeatures" class="flex gap-2 items-center">
                            <Icon name="ph:check-circle-light" class="w-5 h-5 text-green-600" /> {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
          