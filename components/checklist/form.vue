<script setup>
    const model = defineModel()
</script>
<template>
    <div class="space-y-6">
        <UFormGroup label="Task" class="flex-1">
            <UInput class="flex-1" v-model="model.title" @keyup.enter="addTask" size="md" />
        </UFormGroup>
        <UFormGroup label="Notes (optional)" class="flex-1">
            <UTextarea :rows="2" v-model="model.notes" @keyup.enter="addTask" :ui="{ base: 'h-14 min-h-14' }">
            </UTextarea>
        </UFormGroup>
        <UButton @click="addTask" class="mt-4 w-32 justify-center">Add Task</UButton>
    </div>
</template>