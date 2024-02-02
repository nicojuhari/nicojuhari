<script setup>

const route = useRoute();

const story = await useStoryblok('web-projects/' + route.params?.project_id);

useHead({
    title: story?.value.content.title,
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
                <img :src="story.content.image.filename" :alt="story.content.title" :title="story.content.title"
                    class="w-full bg-slate-100 object-center object-fill rounded-lg" />
            </div>
            <h1 class="text-3xl my-10 text-center">{{ story.content.title }}</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>Created in: <strong>{{ story.content.year }}</strong></div>
                <div class="md:text-right text-lg">{{ story.content.stack }}</div>
            </div>
            <div class="mt-6">
                <div class="richtext font-light">
                    {{ story.content.description }}
                </div>
            </div>
            <div>
                <a v-if="story.content.link.url"
                    class="flex mx-auto mt-16 text-brand-blue-light border border-brand-blue-light h-10 w-10 items-center justify-center rounded-full"
                    :href="story.content.link.url" title="Visit Project" target="blank" rel="nofollow">
                    <UIcon name="i-ph-arrow-up-right-thin" class="w-8 h-8 flex-shrink-0" />
                </a>
            </div>
        </div>
    </section>
</template>