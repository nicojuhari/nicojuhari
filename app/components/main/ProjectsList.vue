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
    <div class="grid grid-cols-1 md:grid-scols-2 gap-6 gap-y-10">
        <div v-for="story in stories" :key="story.content.title" class="flex flex-col border border-gray-200/60 bg-white rounded-lg overflow-hidden">
            <img :src="story.content.image?.filename" :alt="story.content.title" :title="story.content.title" loading="lazy" />
            <div class="flex flex-col flex-grow p-4">
                <h2 class="text-xl mb-6 font-bold">{{ story.content.title }}</h2>
                <div><strong>Built in: </strong> {{ story.content.year }} </div>
                <div class="mb-4"><strong>Tech Stack:</strong> <span class="text-sm">{{ story.content.stack }}</span></div>
                <div class="richtext mb-6">
                    {{ story.content.description }}
                </div>
            </div>
        </div>
    </div>
</template>