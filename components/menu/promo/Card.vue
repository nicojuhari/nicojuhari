<script setup>
    defineProps({
        cardData: {
            default: {}
        }
    })

    // const cardData = {
    //     name: '-10% discount',
    //     description: 'nice drink til night, party',
    //     dateStart: '01.20.2024',
    //     dateEnd: '01.22.2024',
    //     textColor: '#fff',
    //     bgColor: '#000000',
    //     bgImage: ''
    // }
</script>
<template>
    <div class="w-80 h-40 bg-cover bg-center rounded-2xl bg-white p-4 shadow-lg flex flex-col gap-4 snap-start" :style="{'background-color': cardData?.bgColor, 'color': cardData?.textColor, 'background-image': `url(${cardData?.bgImage})`}">
        <div class="text-3xl font-bold line-clamp-2" v-if="cardData.name">{{ cardData?.name }}</div>
        <div class="line-clamp-2 mt-auto" v-if="cardData.description">{{ cardData.description }}</div>
    </div>
</template>