<script setup>
import { ref } from 'vue';


const stories = ref(null);
const storyblokApi = useStoryblokApi();

const { data } = await storyblokApi.get("cdn/stories", {
    starts_with: "web-projects",
});

stories.value = data.stories;

</script>
<template>
    <div class="container">
        <div class="my-20">
            <h1 class="subtitle mb-10">Projects</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NuxtLink :to="`/projects/${story.slug}`" v-for="story in stories" class="border-opacity-50">
                    <div class="rounded-lg overflow-hiddden border border-gray-100 shadow-lg">
                        <img :src="story.content.image?.filename" class="rounded-lg" />
                    </div>
                    <div class="py-4 px-2">
                        <h2 class="text-lg font-medium">{{ story.content.title}}</h2>
                        <p class="mt-4 line-clamp-2 text-gray-500 text-sm">{{ story.content.description }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>