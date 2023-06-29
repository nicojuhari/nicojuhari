<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close']);

const inputClasses = 'block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
const labelClasses = 'block mb-1 text-sm font-medium text-gray-900 dark:text-white'
</script>
<template>
    <div class="flex flex-col gap-3 p-6">
        <div>
            <label :class="labelClasses">Full Name</label>
            <input type="text" :class="inputClasses">
        </div>
        <div>
            <label :class="labelClasses">Phone</label>
            <input type="text" :class="inputClasses">
        </div>
        <div>
            <label :class="labelClasses">Email</label>
            <input type="email" :class="inputClasses">
        </div>
        <div>
            <div class="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <label :class="labelClasses">Date</label>
                    <input type="date" :class="inputClasses">
                </div>
                <div>
                    <label :class="labelClasses">Time</label>
                    <input type="time" :class="inputClasses">
                </div>
            </div>
        </div>
        <div>
            <label :class="labelClasses">Number of Persons</label>
            <input type="number" :class="inputClasses">
        </div>
        <div>
            <label :class="labelClasses">Your wishes</label>
            <textarea type="number" :class="inputClasses" class="min-h-[100px] max-h-44"></textarea>
        </div>
        <div>
             <a class="border-[#0C7C59] text-[#0C7C59] border w-full tracking-wider py-2 px-4 mt-6 inline-flex items-center justify-center rounded-full uppercase"
                                    href="#">Send</a>
            </div>
    </div>
</template>