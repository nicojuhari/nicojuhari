<template>
    <footer class="py-6 text-center border-t border-brand-gray border-opacity-5 bg-white">
        <div>&copy; {{ new Date().getFullYear() }} - <span>Freelance Web Developer</span></div>
        <div class="mt-6 flex gap-6 items-center justify-center">
            <a target="_blank" href="https://github.com/nicojuhari" title="GitHub Profile" alt="GitHub Profile">
                <UIcon name="bxl:github" dynamic class="w-8 h-8" />
            </a>
            <a target="_blank" href="https://twitter.com/nicojuhari" title="Twitter Profile" alt="Twitter Profile">
                <UIcon name="ri:twitter-x-line" dynamic class="w-8 h-8" />
            </a>
        </div>
    </footer>
</template>