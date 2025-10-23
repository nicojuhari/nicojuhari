<script setup lang="ts">

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';


useHead({
    title: 'Square Image Cropper - Perfect for Digital Menus',
    titleTemplate: '%s',
    meta: [
        { name: 'description', content: 'Use our square Image Cropper and create fast, consistent digital menus by cropping food photos to 300-2000px. Keep images sharp and uniform.' }
    ]
})

const fileUpload = ref(null as File | null);
const selectedSize = ref(800);
const imgSrc = computed(() => {
    return fileUpload.value ? URL.createObjectURL(fileUpload.value) : '';
});

const imgType = computed(() => {
    return fileUpload.value ? fileUpload.value.type : '';
});

const imageName = computed(() => {
    return fileUpload.value ? fileUpload.value.name.split('.').slice(0, -1).join('.') : 'cropped-image';
});

const croppedImage = ref(null as string | null);

const downLoadCroppedImage = () => {
    if (croppedImage.value) {
        const link = document.createElement('a');
        link.href = croppedImage.value;
        link.download = imageName.value + '.' + imgType.value.split('/')[1];
        link.click();
    }
};

const cropperRef = ref(null) as any


// Modified stencil props to enforce fixed size
const stencilProps = ref({
    aspectRatio: 1,
})
// Track the image dimensions separately
const imageWidth = ref(0)
const imageHeight = ref(0)


// Modified crop function to ensure exact size
const crop = () => {
    if (cropperRef.value) {
        const { canvas } = cropperRef.value.getResult();

        // Create a new canvas with exact dimensions
        const finalCanvas = document.createElement('canvas');

        if(imageWidth.value > 0 && imageHeight.value > 0) {
            finalCanvas.width = imageWidth.value;
            finalCanvas.height = imageHeight.value;
        } else {
            finalCanvas.width = canvas.width;
            finalCanvas.height = canvas.height;
        }
        
        const ctx = finalCanvas.getContext('2d');
        
        if (ctx) {
            // Draw the cropped image to the new canvas at exact size
            ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height);
            
            finalCanvas.toBlob((blob: Blob | null) => {
                if (blob && imgType.value) {
                    const file = new File([blob], imageName.value + '.' + imgType.value.split('/')[1], { type: imgType.value });
                    // revoke previous object URL to avoid memory leaks
                    if (croppedImage.value) {
                        URL.revokeObjectURL(croppedImage.value);
                    }
                    const url = URL.createObjectURL(file);
                    croppedImage.value = url;
                }
            }); // Use JPEG with 90% quality
        }
    }
};

const flip = (x: boolean, y: boolean) => {
    if(cropperRef?.value)
        cropperRef.value.flip(x, y);
}

const rotate = (angle: number) => {
    if(cropperRef?.value)
        cropperRef.value.rotate(angle * 90);
}

const setSquareImage = (size: number) => {
   
    selectedSize.value = size
    imageHeight.value = size
    imageWidth.value = size
    
    // Force refresh to apply new settings
    nextTick(() => {
        cropperRef.value?.refresh()
    })
}

const resetAll = () => {
    if(cropperRef?.value) cropperRef.value.reset();
    fileUpload.value = null;
    croppedImage.value = null;
    imageHeight.value = 0
    imageWidth.value = 0
}

</script>

<template>

<div class="container container-sm">
    <h1 class="title mb-2">Square Image Cropper</h1>
    <h2 class="mb-8">Make uniform (1:1) food photos fast - perfect for digital food menus.</h2>
    <UFileUpload v-model="fileUpload" label="Drop your image here" v-if="!imgSrc" class="w-full bg-gray-50 min-h-48 cursor-pointer" />
    <div v-else class="space-y-8 card">
        <cropper
                ref="cropperRef"
                class="m-auto max-w-[95%] cropper border max-h-[600px]"
                :canvas="{ width: '100%', height: '100%', maxHeight: '600px' }"
                :src="imgSrc"
                :stencil-props="{ ...stencilProps }"
                image-restriction="fit-area"
                @change="crop"
            />
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-8">
            <UButton @click="flip(true, false)" icon="i-ph-flip-horizontal-duotone" variant="soft" color="primary" class="w-10 h-10 justify-center"/>
            <UButton @click="flip(false, true)" icon="i-ph-flip-vertical-duotone" variant="soft" color="primary" class="w-10 h-10 justify-center"/>
            <UButton @click="rotate(1)" icon="i-ph-arrow-clockwise-duotone" variant="soft" color="success" class="w-10 h-10 justify-center"/>
            <UButton @click="rotate(-1)" icon="i-ph-arrow-counter-clockwise-duotone" variant="soft" color="error" class="w-10 h-10 justify-center"/>
        </div>
        <div class="flex flex-wrap gap-6 justify-center md:justify-start">
            <UButton @click="setSquareImage(600)" icon="i-ph-square" :variant="selectedSize != 600 ? 'soft' : 'solid'" color="neutral" label="600 x 600"/>
            <UButton @click="setSquareImage(800)" icon="i-ph-square" :variant="selectedSize != 800 ? 'soft' : 'solid'" color="neutral" label="800 x 800"/>
            <UButton @click="setSquareImage(1000)" icon="i-ph-square" :variant="selectedSize != 1000 ? 'soft' : 'solid'" color="neutral" label="1000 x 1000"/>
            <UInput v-if="selectedSize !== 0" type="number" min="300" max="2000" step="10" v-model.number="selectedSize" @change="setSquareImage(selectedSize)" class="w-24"/>
        </div>
        <div class="flex gap-6 justify-between">
            <UButton @click="resetAll" square icon="i-ph-trash" variant="soft" color="error" class="w-10 h-10 justify-center"/>
            <UButton v-if="croppedImage" @click="downLoadCroppedImage" icon="i-ph-download-simple" color="primary" label="Download Image"/>
        </div>
    </div>
    <div class="mt-6 space-y-4">
        <p>Upload a food photo and crop it to a perfect 1:1 square for a consistent menu look.</p>
        <p>Choose an output size between 600 and 1000 px, or add your custom size, so images stay sharp across all devices.</p>
        <p>Please drag the crop box to ensure the dish remains centered.</p>
        <p>Download the image and use the <NuxtLink to="https://tinypng.com/" title="Tinypng" target="_blank" class="underline">TinyPNG</NuxtLink> to reduce file size for faster loading.</p>
        <p>Tip: use high-contrast backgrounds and natural light so dishes read well at small sizes.</p>
    </div>
 </div>
</template>
<style>
.cropper {
	max-height: 600px;
	background: #DDD;
}
</style>