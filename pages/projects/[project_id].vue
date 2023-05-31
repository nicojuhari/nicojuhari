<script setup>

const route = useRoute();

const story = await useStoryblok('web-projects/' + route.params?.project_id);

useHead({
    title: story?.value.content.title + ' | Freelance Web Developer',
    meta: [
        { name: 'keywords', content: story?.value.content.title + ' web developer, JavaScript, business websites, website development' },
        { name: 'description', content: `One of my web project - ${story?.value.content.title} | Freelance Web Developer in Vienna Austria` },
    ],
})

</script>

<template>
    <section class="container">
        <div class="mx-auto max-w-xl" v-if="story">
            
            <div>
                <img :src="story.content.image.filename" :alt="story.content.title" :title="story.content.title" class="w-full bg-slate-100 object-center object-fill" />
            </div>
            <h1 class="text-3xl mb-10 font-bold text-center">{{ story.content.title }}</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>Created in: <strong>{{ story.content.year }}</strong></div>
                <div class="md:text-right font-semibold">{{ story.content.stack }}</div>
            </div>
            <div class="mt-6">
                <div class="richtext text-lg">
                    {{ story.content.description }}
                </div>
            </div>
            <div>
                <a 
                v-if="story.content.link.url"
                class="btn btn-secondary mx-auto my-10"
                :href="story.content.link.url" title="Visit Website" target="blank" rel="nofollow">Visit Website</a>
            </div>
        </div>
    </section>
</template>