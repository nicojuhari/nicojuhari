<script setup>
import { NuxtLink } from '#components';


const keyFeatures = [
    'Attract more customers',
    'Increase sales by 20-30%',
    'Get found online',
    'Simplify reservations'
]

</script>
<template>
    <div class="container my-4 lg:my-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <UCard class="card-dark">
                <div class="text-center space-y-6 h-full flex flex-col">
                    <img src="/assets/nick-profile-photo.webp" alt="Nick's profile photo" title="Nick's profile photo"
                        class="rounded-full mb-6 shadow-md w-40 h-40 shrink-0 mx-auto border-4 border-[#60A561]" />
                    <p class="text-lg">Nick</p>
                    <h1 class="title">Full-Stack<br>Web Developer</h1>
                    <h2 class="text-lg">I create pixel-perfect, fast<br> and SEO-friendly web apps.</h2>
                    <div class="mt-auto pt-2 flex gap-6 items-center justify-center text-green-400">
                        <NuxtLink target="_blank" to="https://github.com/nicojuhari" title="GitHub Profile" rel="nofollow">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                        </NuxtLink>
                        <NuxtLink target="_blank" to="https://twitter.com/nicojuhari" title="Twitter | X Profile" rel="nofollow">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M21.604 25.622L7.693 41.498M37.924 6.502L25.554 21.07M6.61 6.5l27.44 35h7.56l-27.439-35z"/></svg>
                        </NuxtLink>
                        <NuxtLink target="_blank" to="https://www.linkedin.com/in/nicojuhari/" title="LinkedIn Profile" rel="nofollow">
                           <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 256 256"><path fill="currentColor" d="M212 28H44a16 16 0 0 0-16 16v168a16 16 0 0 0 16 16h168a16 16 0 0 0 16-16V44a16 16 0 0 0-16-16ZM96 176a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm-8-84a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm96 84a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.8-1.8A36 36 0 0 1 184 140Z"/></svg>
                        </NuxtLink>
                    </div>
                </div>
            </UCard>
            <UCard>
                <div class="space-y-6 flex flex-col h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 mx-auto" viewBox="0 0 36 36"><ellipse cx="18" cy="25" fill="#939598" rx="18" ry="10"/><ellipse cx="18" cy="23" fill="#F1F2F2" rx="18" ry="10"/><ellipse cx="18" cy="22.611" fill="#FFF" rx="14.8" ry="7.611"/><path fill="#E1E8ED" d="M8 28c0-3.044.417-7.208.042-13.875c.601-1.377 6.146-2.472 6.625-3.792C15.954 6.787 13.458 4.417 16 2c2.05-1.949 5-2 6 1c2-2 6-1 6 2c4-1 6 3 3 6c0 1-1 9-1 11s-.208 1.792-5.208 2.792S8 28 8 28"/><path fill="#FFAC33" d="M8 27V15s21-7 21-2.458V23z"/><path fill="#FFD983" d="M8 26V16s12.375-4.208 20-4v10z"/><path fill="#FFAC33" d="M8 21v-1l21-4v1z"/><path fill="#E1E8ED" d="m8 14l9-9c2 0 8 1 11 5z"/><path fill="#FFF" d="M30 10c1-1 1-5-3-4c0-1-2-4-5-2c0-1-5-2-6 0c10 3 14 6 14 6"/><path fill="#DD2E44" d="M17.958 10.458c-1.833-.208-4.417-1.083-3.917-3.5s2.474-4.881 3.75-5.542C18.917.833 20.117 1.26 21 4.667c.583 2.25 2.75 5.125-1.667 5.75c-.458 0-1.375.041-1.375.041"/><path fill="#F4ABBA" d="M18.375 5.042a.5.5 0 0 1-.4-.2l-.5-.667a.5.5 0 1 1 .8-.6l.5.667a.5.5 0 0 1-.4.8m-2.416 3.5a.5.5 0 0 1-.484-.626l.25-.958a.5.5 0 0 1 .967.253l-.25.958a.5.5 0 0 1-.483.373m4.374.083a.5.5 0 0 1-.261-.073l-.75-.458a.501.501 0 0 1 .522-.854l.75.458a.501.501 0 0 1-.261.927"/></svg>
                    <h2 class="title text-center">I Help Restaurants</h2>
                    <ul class="space-y-2.5">
                        <li v-for="item in keyFeatures" class="list-none flex items-center gap-2">
                            <UIcon name="i-ph-check" class="h-5 w-5 text-green-500"></UIcon>
                            <span class="text-lg">{{ item }}</span>
                        </li>
                    </ul>
                    <div class="text-center mt-auto">
                        <UButton class="px-8 w-1/2 justify-center" to="#restaurant-website-design" title="Restaurant Website Design">Read More</UButton>
                    </div>
                </div>
            </UCard>
            <UCard class="card-dark text-center">
                <div class="space-y-6 flex flex-col h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 mx-auto mb-6" viewBox="0 0 128 128"><path fill="#176CC7" d="M69.09 4.24c-1.08.96-9.48 17.63-9.48 17.63l-6.25 25.21l24.32-2.23S97.91 7.23 98.32 6.36c.73-1.58 1.12-2.23-1.67-2.23c-2.79-.01-26.55-.79-27.56.11"/><path fill="#FCC11A" d="M81.68 43.29c-1.21-.65-36.85-1.21-37.69 0c-.76 1.1-.33 6.87-.04 7.56c.52 1.2 11.97 5.85 11.97 5.85v2.89s.78.32 7.46.32s8.01-.34 8.01-.34l.05-2.78s9.94-5.12 10.46-5.83c.46-.59.99-7.02-.22-7.67m-10.34 9.14s.14-1.38-.55-1.72c-.69-.35-12.62-.29-13.56-.24s-.94 1.73-.94 1.73l-7.47-3.95l-.13-1.32l27.94.15l.06 1.78z"/><path fill="#FDFFFF" d="M59.04 51.84c-.94 0-1.65 1.06-1.65 2.74c0 1.58.54 2.88 1.73 2.81c1.13-.06 1.67-1.49 1.59-2.83c-.1-1.57-.48-2.72-1.67-2.72"/><path fill="#F8932A" d="M29.31 92.09c0 23.96 21.71 33.93 36.12 33.5c16.79-.5 34.85-13.24 33.36-36.1c-1.4-21.45-19.69-31.69-35.47-31.57c-18.34.13-34.01 13.24-34.01 34.17"/><path fill="#FCC11A" d="M64.52 121.29c-.25 0-.51 0-.76-.01c-7.5-.25-15.12-3.08-20.54-8.33c-5.8-5.62-9.38-12.73-9.4-20.9c-.05-21.46 18.34-29.35 30.17-29.35h.1c16.03.07 29.88 12.05 30.24 28.94c.16 7.52-2.92 15.48-8.96 21.42c-5.63 5.53-13.94 8.23-20.85 8.23"/><path fill="#2E9DF4" d="M25.51 3.72c-.63.58 23.46 43.48 23.46 43.48s4.04.52 13.06.6s13.49-.52 13.49-.52S56.79 4.15 55.67 3.72c-.55-.22-7.97-.3-15.22-.38c-7.26-.09-14.34-.18-14.94.38"/><path fill="#FEFFFA" d="M52.29 67.35c-1.46-1.25-8.89 2.52-14.11 11.15c-3.5 5.79-3.8 13.2-1.57 13.32s2.2-7.21 7.05-13.62c5.86-7.71 10.74-9.04 8.63-10.85"/><path fill="#F8932A" d="M64.37 66.9c-1.95 0-4.99 12.89-7.38 14.48s-14.77.07-14.91 1.81s9.19 8.98 10.28 11.65s-4.71 14.62-3.11 15.78c1.59 1.16 11.58-7.17 14.91-7.17c3.47 0 12.41 8.89 13.9 7.67c1.57-1.28-3.47-12.96-2.68-15.64c.8-2.68 11.65-8.4 11.22-11c-.43-2.61-13.03-.65-15.35-2.82S66.47 66.9 64.37 66.9"/></svg>
                    <h3 class="title">7+ Years<br>in Web Development</h3>
                    <p class="text-lg px-4">Expert Frontend, Backend,<br>and Full-Stack JavaScript Developer.</p>
                    <p class="text-lg px-4">Specializing in Building Engaging<br>and Functional Websites.</p>
                    <div class="mt-auto text-center">
                    <UButton to="/portfolio" class="w-1/2 justify-center" color="secondary" variant="subtle"
                            title="My Portfolio">Portfolio</UButton>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>