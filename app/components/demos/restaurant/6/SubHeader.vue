<script setup>
import { ref } from 'vue'
import Modal from '@/components/demos/italian/Modal.vue'

const showModal = ref(false)
const showModalId = ref(null)
const openModal = (val) => {
    showModal.value = true
    showModalId.value = val
}
const closeModal = () => {
    showModal.value = false
    showModalId.value = null
}
const list = [
    {
        id: 1,
        value: 'Tue - Sun, 10:00 - 23:00',
        icon: 'ph:clock-light'
    },
    {
        id: 2,
        value: 'Cash & Cards',
        icon: 'ph:credit-card-light'
    },
    {
        id: 3,
        value: '1234 Street Name, City Name',
        icon: 'ph:map-pin-light'
    }
]
</script>
<template>
    <div class="relative">
        <div class="md:h-24 py-4 flex flex-col md:flex-row gap-4 text-white">
            <div v-for="item in list" :key="item.name" @click.prevent="openModal(item.id)"
                class="flex flex-1 gap-4 items-center border-white rounded-md p-4 cursor-pointer border border-opacity-40">
                <Icon :name="item.icon" class="w-10 h-10 text-[#0C7C59]" />
                <div class="font-semibold">
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>
    <Modal v-if="showModal && showModalId == 1" @close="closeModal">
        <template #modalHeader="{ closeModal }">
            <div class="px-6 pt-4 pb-0 flex justify-between">
                <h3 class="text-2xl">Working Hours</h3>
                <Icon name="ph:x-light" class="w-8 h-8 cursor-pointer" @click="closeModal" />
            </div>
        </template>
        <DemosItalianModalsWorkingHours />
    </Modal>
    <Modal v-if="showModal && showModalId == 2" @close="closeModal">
        <template #modalHeader="{ closeModal }">
            <div class="px-6 pt-4 pb-0 flex justify-between">
                <h3 class="text-2xl">Payment Methods </h3>
                <Icon name="ph:x-light" class="w-8 h-8 cursor-pointer" @click="closeModal" />
            </div>
        </template>
        <div class="p-6">
            We accept <strong>CASH</strong> and all major <strong>credit cards</strong> (Visa, MasterCard, American
            Express).
        </div>
    </Modal>
    <Modal v-if="showModal && showModalId == 3" @close="closeModal">
        <template #modalHeader="{ closeModal }">
            <div class="px-6 pt-4 pb-0 flex justify-between">
                <h3 class="text-2xl">Our Address</h3>
                <Icon name="ph:x-light" class="w-8 h-8 cursor-pointer" @click="closeModal" />
            </div>
        </template>
        <div class="p-6">
            <div class="mb-6">1234 Street Name, City Name</div>
            <IncludesGmaps class="h-[300px]"
                src="https://www.google.com/maps/embed/v1/place?q=Freelance+Web+Developer+in+Vienna,+Dieselgasse,+Vienna,+Austria&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" />
        </div>
    </Modal>
</template>