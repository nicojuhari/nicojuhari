<script setup>
import QRCodeStyling from "qr-code-styling";

const qrCodeRef = ref()
const qrCodeObj = ref();
const svgTag = ref()
const downloadSize = ref(300)
const fileLogoName = ref()

const qrConfigs = ref({
    width: 300,
    height: 300,
    type: 'svg',
    data: 'https://nicojuhari.com',
    margin: 0,
    image: '',
    dotsOptions: {
        color: '#564b3e',
        type: 'dots',
    },
    backgroundOptions: {
        color: '#ffffff',
    },
    cornersSquareOptions: {
        type: "extra-rounded",
        color: "#324b62",
    },
    cornersDotOptions: {
        type: "dots",
        color: "#2c2811",
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: .5,
        margin: 0,
    },
})

const generateQrCode = (config) => {

    config.qrOptions = {
        "typeNumber": "",
        "mode": "Byte",
        "errorCorrectionLevel": "Q"
    }
    if (config.data == '') config.data = 'https://1food.menu'

    config.margin = config.margin * 9

    return new QRCodeStyling(config);

}

const downloadQr = (type) => {
    let opt = {
        ...qrConfigs.value,
        width: downloadSize.value,
        height: downloadSize.value,
    }

    if (type === 'png') {
        opt.backgroundOptions.color = 'transparent'
    }
    if (type === 'svg') {
        opt.type = type
    }

    let qr = generateQrCode(opt)

    setTimeout(() => {
        qr.download({ name: "qr-code-menu", extension: type });
    }, 300)
}
const uploadLogo = (e) => {
    let reader = new FileReader();

    reader.onload = (ev) => {
        qrConfigs.value.image = ev.target.result
    }

    fileLogoName.value = e.target.files[0]?.name
    reader.readAsDataURL(e.target.files[0]);
}

const clearLogo = () => {
    qrConfigs.value.image = '';
    qrConfigs.value.imageOptions.imageSize = .5;
    qrConfigs.value.imageOptions.margin = 0;
    fileLogoName.value = ''
}

const handleLogoSize = (to) => {
    if (to == 'up' && qrConfigs.value.imageOptions.imageSize < .5) {
        qrConfigs.value.imageOptions.imageSize = (+qrConfigs.value.imageOptions.imageSize + .1).toFixed(1);
    }

    if (to == 'down' && qrConfigs.value.imageOptions.imageSize > .1) {
        qrConfigs.value.imageOptions.imageSize = (+qrConfigs.value.imageOptions.imageSize - .1).toFixed(1);
    }
}

onMounted(() => {
    qrCodeObj.value = generateQrCode({ ...qrConfigs.value })
    if (qrCodeRef.value) qrCodeRef.value.innerHTML = '';
    qrCodeObj.value.append(qrCodeRef.value)
})

// onClickOutside(qrCodeRef, (event) => console.log(event))
watch(qrConfigs, () => {
    qrCodeObj.value = generateQrCode({ ...qrConfigs.value })

    if (qrCodeRef.value) qrCodeRef.value.innerHTML = '';
    qrCodeObj.value.append(qrCodeRef.value)
}, { deep: true })

</script>
<template>
    <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-6 p-4 md:p-6 rounded-2xl"
        style="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;">
        <div class="w-full">
            <div class="flex-col gap-1 max-w-sm m-auto flex md:hidden mt-2 mb-6">
                <label class="font-medium text-lg shrink-0">Your URL</label>
                <input type="url" name="" v-model="qrConfigs.data" class="border rounded p-2" placeholder="https://" />
            </div>
            <div class="font-semibold text-lg mb-1">Colors</div>
            <div class="grid grid-cols-2 w-full gap-6">
                <div class="flex flex-col gap-6">
                    <label class="flex bg-slate-100 gap-2 font-medium items-center cursor-pointer h-12">
                        <span class="border border-slate-100 block h-12 w-12"
                            :style="`background-color: ${qrConfigs.dotsOptions.color}`"></span>
                        <input type="color" v-model="qrConfigs.dotsOptions.color" class="opacity-0 w-0 h-0" />
                        <span>Dots</span>
                    </label>
                    <label class="flex bg-slate-100 gap-2 font-medium items-center cursor-pointer h-12">
                        <span class="border border-slate-100 block h-12 w-12"
                            :style="`background-color: ${qrConfigs.backgroundOptions.color}`"></span>
                        <input type="color" v-model="qrConfigs.backgroundOptions.color" class="opacity-0 w-0 h-0" />
                        <span>Background</span>
                    </label>
                </div>
                <div class="flex flex-col gap-6">
                    <label class="flex bg-slate-100 gap-2 font-medium items-center cursor-pointer h-12">
                        <span class="border border-slate-100 block h-12 w-12"
                            :style="`background-color: ${qrConfigs.cornersSquareOptions.color}`"></span>
                        <input type="color" v-model="qrConfigs.cornersSquareOptions.color" class="opacity-0 w-0 h-0" />
                        <span>Corners Shape</span>
                    </label>
                    <label class="flex bg-slate-100 gap-2 font-medium items-center cursor-pointer h-12">
                        <span class="border border-slate-100 block h-12 w-12"
                            :style="`background-color: ${qrConfigs.cornersDotOptions.color}`"></span>
                        <input type="color" v-model="qrConfigs.cornersDotOptions.color" class="opacity-0 w-0 h-0" />
                        <span>Corners Dot</span>
                    </label>
                </div>
            </div>
            <div class="mt-6 flex flex-col gap-2">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
                    <div>
                        <div class="font-medium text-gray-600">Body Shape</div>
                        <div class="bg-slate-100 p-4 rounded">
                            <div class="flex flex-wrap gap-6">
                                <div @click="qrConfigs.dotsOptions.type = 'square'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Square">
                                    <QrCodeIconsSquareDots />
                                </div>
                                <div @click="qrConfigs.dotsOptions.type = 'classy'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Classy">
                                    <QrCodeIconsClassyDots />
                                </div>
                                <div @click="qrConfigs.dotsOptions.type = 'rounded'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Rounded">
                                    <QrCodeIconsRoundedDots />
                                </div>
                                <div @click="qrConfigs.dotsOptions.type = 'dots'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Dots">
                                    <QrCodeIconsDotsDots />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="font-medium text-gray-600">Background Margin</div>
                        <div class="bg-slate-100 p-4 rounded">
                            <div class="flex flex-wrap gap-6">
                                <div @click="qrConfigs.margin = nr - 1"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5 flex items-center justify-center font-bold"
                                    v-for="nr in 4"> {{ nr - 1 }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
                    <div>
                        <div class="font-medium">Corner Shape</div>
                        <div class="bg-slate-100 p-4 rounded">
                            <div class="flex flex-wrap gap-6">
                                <div @click="qrConfigs.cornersSquareOptions.type = ''"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white grid place-content-center" title="Default">
                                    <UIcon name="i-ph-x-light" class="text-red-600 text-2xl" />
                                </div>
                                <div @click="qrConfigs.cornersSquareOptions.type = 'square'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Square">
                                    <QrCodeIconsSquareCorners />
                                </div>
                                <div @click="qrConfigs.cornersSquareOptions.type = 'extra-rounded'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Rounded">
                                    <QrCodeIconsRoundedCorners />
                                </div>
                                <div @click="qrConfigs.cornersSquareOptions.type = 'dots'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Dots">
                                    <QrCodeIconsDotsCorners />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="font-medium">Corner Dots</div>
                        <div class="bg-slate-100 p-4 rounded">
                            <div class="flex flex-wrap gap-6">
                                <div @click="qrConfigs.cornersDotOptions.type = ''"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5 grid place-content-center" title="Default">
                                     <UIcon name="i-ph-x-light" class="text-red-600 text-2xl" />
                                </div>
                                <div @click="qrConfigs.cornersDotOptions.type = 'square'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Square">
                                    <QrCodeIconsSquareCornerDots />
                                </div>

                                <div @click="qrConfigs.cornersDotOptions.type = 'dots'"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white p-1.5" title="Dots">
                                    <QrCodeIconsDotsCornerDots />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
                    <div>
                        <div class="font-medium">Logo</div>
                        <div class="bg-slate-100 p-4 rounded">
                            <div class="flex gap-6 items-center">
                                <div v-if="fileLogoName" @click="clearLogo"
                                    class="h-12 w-12 border rounded cursor-pointer bg-white flex items-center shrink-0 justify-center">
                                    <!-- <IconsClose class="text-red-600" /> -->
                                    <UIcon name="i-ph-x-light" class="text-red-600 text-2xl" />
                                </div>
                                <label v-else
                                    class="h-12 w-12 border shrink-0 border-info-700 rounded cursor-pointer bg-white flex items-center justify-center">
                                    <input type="file" @change="uploadLogo" class="opacity-0 w-0 h-0" />
                                    <UIcon name="i-ph-plus-light" class="text-info-700 text-2xl" />
                                    <!-- <IconsPlus class="text-info-700" /> -->
                                </label>
                                <div v-if="fileLogoName" class="truncate">{{ fileLogoName }}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="font-medium">Logo Size</div>
                        <div class="bg-slate-100 p-4 rounded">
                            <div class="flex gap-6 justify-between">
                                <div class="flex items-center">
                                    <div @click="handleLogoSize('up')"
                                        class="p-1 w-12 h-12 bg-white border cursor-pointer flex items-center justify-center">
                                        <UIcon name="i-ph-plus-light" class="text-2xl"/>
                                    </div>
                                    <div class="p-2 border-y h-12 w-12 flex items-center justify-center"> {{
                                        qrConfigs.imageOptions.imageSize * 10 }}
                                    </div>
                                    <div @click="handleLogoSize('down')"
                                        class="p-1 w-12 h-12 bg-white border cursor-pointer flex items-center justify-center">
                                        <UIcon name="i-ph-minus-light" class="text-2xl"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="md:max-w-[300px]">
            <div class="flex-col gap-1 max-w-sm m-auto hidden md:flex">
                <label class="font-medium text-lg shrink-0">Your URL</label>
                <input type="url" name="" v-model="qrConfigs.data" class="border rounded p-2" placeholder="https://" />
            </div>
            <div ref="qrCodeRef" class="m-auto flex items-center justify-center mt-4 qr-code-block" v-html="svgTag"></div>
            <div class="flex flex-col">
                <div class="text-center mt-4 font-medium">Image Quality</div>
                <label for="size-range" class="flex justify-between my-2 text-sm">
                    <span>Low</span>
                    <span>High</span>
                </label>
                <input id="size-range" type="range" v-model="downloadSize" min="200" max="2000"
                    class="w-full h-1 mb-3 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                <div class="text-center">{{ downloadSize }} x {{ downloadSize }} pixels</div>
            </div>
            <div class="flex gap-4 mt-6 justify-center">
                <UButton variant="soft" color="blue" @click="downloadQr('png')">Save PNG</UButton>
                <UButton variant="soft" color="blue" @click="downloadQr('jpeg')">Save JPEG</UButton>
                <UButton variant="soft" color="blue" @click="downloadQr('svg')">Save SVG</UButton>
        </div>
    </div>
</div></template>
