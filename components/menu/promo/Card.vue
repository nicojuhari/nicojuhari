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
    <div class="max-w-[375px] bg-cover bg-center w-full min-h-48 rounded-2xl bg-white p-4 shadow-lg flex flex-col gap-4" :style="{'background-color': cardData?.bgColor, 'color': cardData?.textColor, 'background-image': `url(${cardData?.bgImage})`}">
        <div class="text-xl font-bold line-clamp-2" v-if="cardData.name">{{ cardData?.name }}</div>
        <div class="line-clamp-3" v-if="cardData.description">{{ cardData.description }}</div>
        <div class="mt-auto font-medium line-clamp-1" v-if="cardData.extraInfo">
            {{ cardData.extraInfo }}
        </div>
    </div>
</template>