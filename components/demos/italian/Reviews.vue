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
        {
        text: 'Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida',
        name: 'Tom',
    },
    {
        text: 'Lorem ipsum dolor sit amet, consectetur. Sed vitae nisi eget metus gravida. Lorem ipsum dolor sit ame',
        name: 'Anna',
    },
    ]

    onMounted( () => {
        setTimeout(() => {
            document.querySelector('[data-review-slider]').classList.remove('opacity-0')
        }, 1000)
    })
</script>
<template>
    <div data-review-slider class="mx-auto opacity-0 duration-500">
        <Swiper :modules="[SwiperAutoplay, SwiperController]"
            :loop="true" :effect="'fade'"
            :breakpoints="{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }"
            :fadeEffect="{
            crossFade: true
            }"
            :autoplay="{
                    delay: 4000,
                    disableOnInteraction: true,
            }">
            <SwiperSlide v-for="item in list" :key="item.name">
                <div class="text-center flex flex-col gap-2">
                    <div class="line-clamp-2">{{ item.text }}</div>
                    <div class="text-[#e07c0c]">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                    <div class="text-xl">{{ item.name }}</div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>