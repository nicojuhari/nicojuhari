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
                    <img :src="story.content.image?.filename" :alt="story.content.title" :title="story.content.title" class="rounded-lg" loading="lazy" />
                </div>
                <div class="py-4 px-2">
                    <h2 class="text-lg">{{ story.content.title}}</h2>
                    <p class="mt-4 line-clamp-2 font-light opacity-50 text-sm">{{ story.content.stack }}</p>
                </div>
            </NuxtLink>
        </div>
        <div v-if="view_all_projects" class="text-center">
            <NuxtLink  to="/projects" title="View All Projects" class="btn btn-link btn-light mx-auto mt-10">View All Projects</NuxtLink>
        </div>
    </div>
</template>