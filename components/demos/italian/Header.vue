<script setup>

const bgImgURL = 'https://images.unsplash.com/photo-1600628421060-939639517883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340';

</script>

<template>
    <div>
        <Body class="bg-gray-100" />
        <section class="relative bg-center bg-no-repeat bg-cover" :style="`background-image:url(${bgImgURL})`">
            <div class="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
            <div class="container relative text-white py-4 flex items-center justify-between h-16">
                <div class="shrink-0">
                    <svg width="32" height="32" viewBox="0 0 512 512">
                        <path
                            d="M164.852 279.939l61.834-60.251L73.72 71.706c-33.626 32.764-33.626 86.677 0 119.44l91.132 88.793z"
                            fill="currentColor" />
                        <path
                            d="M312.389 241.88c33.636 14.802 80.283 4.232 113.91-29.593 41.222-40.165 49.909-98.303 17.363-128.96-31.465-31.71-91.131-23.245-132.354 16.921-34.718 33.825-45.566 79.276-30.374 110.986-47.739 47.568-211.552 207.173-211.552 207.173L99.759 448l149.71-145.866L399.177 448l30.374-29.593-149.709-145.869 32.547-30.658z"
                            fill="currentColor" />
                    </svg>
                </div>

                <nav class="hidden md:flex items-center gap-4 justify-end">
                    <a href="#">Home</a>
                    <a href="#">Menu</a>
                    <a href="#">About</a>
                </nav>
                <div class="md:hidden">
                    <svg width="32" height="32" viewBox="0 0 24 24">
                        <g fill="none">
                            <path
                                d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                            <path fill="currentColor"
                                d="M20 18a1 1 0 0 1 .117 1.993L20 20H4a1 1 0 0 1-.117-1.993L4 18h16Zm0-7a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm0-7a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2h16Z" />
                        </g>
                    </svg>
                </div>
            </div>
            <div class="container flex items-center justify-center flex-col h-[70vh] relative text-white">
                <h1 class="text-6xl md:text-8xl font-bold text-center tracking-wider text-[#e07c0c]">Mama Mia</h1>
                <div class="uppercase text-sm text-center font-medium tracking-[10px]">Italian Restaurant</div>
                <a class="bg-white text-black tracking-wider py-2 px-4 mt-10 inline-flex items-center justify-center rounded-full uppercase text-sm font-semibold"
                    href="#">Book Your Table</a>
            </div>
        </section>
        <div class="-translate-y-10 md:-translate-y-12">
            <div class="md:h-24 container p-4 rounded bg-white shadow-md flex flex-col md:flex-row gap-6">
                <div class="flex flex-1 gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2"
                        stroke="currentColor" class="w-10 h-10 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <div class="text-gray-400">Working hours:</div>
                        <div class="text-gray-600 font-bold">
                            10:00 - 23:00
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 gap-4 items-center">
                    <svg viewBox="0 0 20 20" class="w-10 h-10 text-gray-400">
                        <path fill="currentColor"
                            d="M13.5 13a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2ZM2 6.75A2.75 2.75 0 0 1 4.75 4h10.5A2.75 2.75 0 0 1 18 6.75v6.5A2.75 2.75 0 0 1 15.25 16H4.75A2.75 2.75 0 0 1 2 13.25v-6.5ZM4.75 5A1.75 1.75 0 0 0 3 6.75V8h14V6.75A1.75 1.75 0 0 0 15.25 5H4.75ZM17 9H3v4.25c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 17 13.25V9Z" />
                    </svg>
                    <div>
                        <div class="text-gray-400">We accept:</div>
                        <div class="text-gray-600 font-bold">
                            Cash and Cards
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 gap-4 items-center">
                    <svg class="w-10 h-10 text-gray-400" viewBox="0 0 256 256">
                        <path fill="currentColor"
                            d="M128.1 66a38 38 0 1 0 38 38a38 38 0 0 0-38-38Zm0 64a26 26 0 1 1 26-26a26.1 26.1 0 0 1-26 26Zm0-112a86.1 86.1 0 0 0-86 86c0 30.9 14.4 63.7 41.5 94.9a247.8 247.8 0 0 0 41.1 38a6 6 0 0 0 3.4 1.1a6.6 6.6 0 0 0 3.5-1.1a254.2 254.2 0 0 0 41-38c27.2-31.2 41.5-64 41.5-94.9a86.1 86.1 0 0 0-86-86Zm0 206.5c-15-11.6-74-60.9-74-120.5a74 74 0 0 1 148 0c0 59.6-59 108.9-74 120.5Z" />
                    </svg>
                    <div>
                        <div class="text-gray-400">Our address:</div>
                        <div class="text-gray-600 font-bold">
                            City, Street, 123
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
</div></template>