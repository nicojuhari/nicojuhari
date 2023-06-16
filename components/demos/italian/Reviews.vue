<script setup>

    //list of reviews about restaurant
    const list = [
        {
            text: 'Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida',
            name: 'Tom',
        },
        {
        text: 'Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida. Lorem ipsum dolor sit ame',
        name: 'Anna',
        },
        {
            text: 'Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida Lorem ipsum',
            name: 'Jimmy',
        },
         {
            text: 'Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida Lorem ipsum',
            name: 'Maria',
        },
    ]
</script>
<template>
    <div class="mx-auto">
        <Swiper :modules="[SwiperAutoplay, SwiperController]"
            :slides-per-view="1" :loop="true" :effect="'fade'"
            :fadeEffect="{
            crossFade: true
            }"
            :autoplay="{
                    delay: 4000,
                    disableOnInteraction: true,
            }">
            <SwiperSlide v-for="item in list" :key="item.name" class="text-white">
                <div class="text-center flex flex-col gap-2">
                    <div class="line-clamp-2">{{ item.text }}</div>
                    <div class="text-[#e07c0c]">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                    <div class="text-xl">{{ item.name }}</div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>