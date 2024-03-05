<script setup>
import { ref } from 'vue';

const stories = ref(null);
const storyblokApi = useStoryblokApi();

const { data } = await storyblokApi.get("cdn/stories", {
    starts_with: "web-projects",
    per_page: 40
});

stories.value = data.stories;

</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="story in stories" :key="story.content.title" class="flex flex-col shadow-lg rounded-lg">
            <img :src="story.content.image?.filename" class="rounded-t-lg" :alt="story.content.title" :title="story.content.title" loading="lazy" />
            <div class="p-6 flex flex-col flex-grow">
                <h2 class="text-xl mb-6">{{ story.content.title }}</h2>
                <div><strong>Built in: </strong> {{ story.content.year }} </div>
                <div class="mb-4"><strong>Tech Stack:</strong> <span class="text-sm">{{ story.content.stack }}</span></div>
                <div class="richtext mb-6">
                    {{ story.content.description }}
                </div>
                <div class="mt-auto">
                    <a v-if="story.content.link.url"
                        class="flex mx-auto text-brand-400 border border-brand-400 h-10 w-10 items-center justify-center rounded-full"
                        :href="story.content.link.url" title="Visit Project" target="blank" rel="nofollow">
                        <UIcon name="i-ph-arrow-up-right-thin" class="w-8 h-8 flex-shrink-0" />
                    </a>
                </div>
    
            </div>
        </div>
    </div>
</template>