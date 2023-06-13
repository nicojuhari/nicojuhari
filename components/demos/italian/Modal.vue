<template>
    <ClientOnly>
        <Teleport to="body">
            <div class="modal modal-open fixed z-[90] flex items-end justify-center top-0 left-0 w-full h-screen p-4"
                :class="{ 'to-close': toClose == true }">
                <div class="modal-backdrop fixed z-[95] min-h-screen w-full top-0 left-0 bg-black bg-opacity-30" @click="closeModal"></div>
                <div class="modal-container bg-white rounded-xl z-[100] m-auto w-full flex flex-col flex-1 max-h-full relative overflow-hidden max-w-[375px] shadow-lg">
                    <div class="modal-close cursor-pointer bg-black text-white absolute bg-opacity-50 transition-all p-1 rounded-full right-2 top-2"
                        @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div class="modal-content overflow-y-auto h-full flex-1">
                        <div class="overflow-y-hidden">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
        </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close']);

useHead({
    bodyAttrs: {
        class: "modal-open"
    }
})

const toClose = ref(false)
const closeModal = () => {
    toClose.value = true
    setTimeout(() => {
        emit('close');

        document.body.classList.remove('modal-open')

    }, 500);
}
</script>

<style>
.modal-container {
    animation: modalAnimation .4s forwards;
}

.to-close {
    opacity: 0;
    transition: opacity .4s;
}

.to-close .modal-container {
    animation: modalCloseAnimation .4s forwards;
}

@keyframes modalAnimation {
    0% {
        opacity: 0;
        transform: translateY(20px) scale(0.75);
    }

    100% {
        opacity: 1;
        transform: translateY(0px) scale(1);
    }
}

@keyframes modalCloseAnimation {
    0% {
        opacity: 1;
        transform: translateY(0px) scale(1);
    }

    100% {
        opacity: 0;
        transform: translateY(20px) scale(.75);
    }
}
</style>