<script setup>
import { ref } from 'vue';

const props = defineProps({
    projects_limit: {
        type: Number,
        default: 100
    },
    view_all_projects: {
        type: Boolean,
        default: false
    }
})
const stories = ref(null);
const storyblokApi = useStoryblokApi();

const { data } = await storyblokApi.get("cdn/stories", {
    starts_with: "web-projects",
    per_page: props.projects_limit
});

stories.value = data.stories;

</script>
<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink :to="`/projects/${story.slug}`" v-for="story in stories" class="border-opacity-50">
                <div class="rounded-lg overflow-hiddden border-gray-100">
                    <img :src="story.content.image?.filename" :alt="story.content.title" :title="story.content.title" class="rounded-lg" />
                </div>
                <div class="py-4 px-2">
                    <h2 class="text-lg font-medium">{{ story.content.title}}</h2>
                    <p class="mt-4 line-clamp-2 text-gray-500 text-sm"><strong>{{ story.content.year }}</strong> - {{ story.content.stack }}</p>
                </div>
            </NuxtLink>
        </div>
        <NuxtLink v-if="view_all_projects" to="/projects" title="View All My Projects" class="btn btn-outline mx-auto mt-10">View All Projects</NuxtLink>
    </div>
</template>