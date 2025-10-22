<script setup>

useHead({
    title: 'Free Online Checklist Maker: Create & Manage Tasks Easily',
    meta: [{ name: 'description', content: 'Create and customize your own online checklists easily with our user-friendly and FREE Checklist Maker. Stay organized and boost your productivity today!' }],
})

const tasks = ref([]);
const newTask = reactive({
    id: 0,
    title: '',
    notes: '',
    completed: false,
});
const showDeleteModal = ref(false);
const isLoading = ref(true);
const editTaskActive = ref(false);


const addTask = () => {
    if (newTask.title.trim() === '') return;

    if (editTaskActive.value) {
        updateTask();
        return;
    }

    tasks.value.push({
        id: uid(),
        title: newTask.title,
        notes: newTask.notes,
        completed: false,
    });

    newTask.title = '';
    newTask.notes = '';
    newTask.id = 0;

    saveToLocalStorage();
};

const editTask = (taskId) => {
    editTaskActive.value = true;
    const task = tasks.value.find(task => task.id === taskId);
    newTask.title = task.title;
    newTask.notes = task.notes;
    newTask.id = task.id;
};

const updateTask = () => {
    const taskIndex = tasks.value.findIndex(task => task.id === newTask.id);
    tasks.value[taskIndex].title = newTask.title;
    tasks.value[taskIndex].notes = newTask.notes;
    newTask.title = '';
    newTask.notes = '';
    newTask.id = 0;
    editTaskActive.value = false;
    saveToLocalStorage();
};

const cancelUpdateTask = () => {
    newTask.title = '';
    newTask.notes = '';
    newTask.id = 0;
    editTaskActive.value = false;
};

// Export functionality
const exportAsText = () => {
    const checklistTitle = `My Checklist - ${new Date().toLocaleDateString()}\n${'='.repeat(50)}\n\n`;
    const tasksList = tasks.value.map(task => {
        const status = task.completed ? '✓' : '☐';
        const notes = task.notes ? ` (${task.notes})` : '';
        return `${status} ${task.title}${notes}`;
    }).join('\n');
    
    const content = checklistTitle + tasksList;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checklist-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const printChecklist = () => {
    const printWindow = window.open('', '_blank');
    const checklistTitle = `My Checklist - ${new Date().toLocaleDateString()}`;
    const tasksList = tasks.value.map(task => {
        const status = task.completed ? '✓' : '☐';
        const notes = task.notes ? ` <span style="color: #666; font-size: 0.9em;">(${task.notes})</span>` : '';
        const textDecoration = task.completed ? 'text-decoration: line-through; color: #999;' : '';
        return `<div style="margin: 8px 0; padding: 4px 0; ${textDecoration}">
                    <span style="font-size: 1.2em; margin-right: 8px;">${status}</span>
                    ${task.title}${notes}
                </div>`;
    }).join('');
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${checklistTitle}</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; }
                h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
                .task { margin: 8px 0; padding: 4px 0; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <h1>${checklistTitle}</h1>
            <div style="margin-top: 20px;">
                ${tasksList}
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
};

const removeTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
    saveToLocalStorage();
};

const deleteTasks = () => {
    tasks.value = [];
    showDeleteModal.value = false;
    saveToLocalStorage();
};

const saveToLocalStorage = () => {
    if (import.meta.client) {
        localStorage.setItem('nc_checklist_tasks', JSON.stringify(tasks.value));
    }
};
watch(tasks, saveToLocalStorage, { deep: true });

onMounted(() => {
    //run on client side
    if (import.meta.client) {
        // Set up the watcher after component is mounted
        
        const tasksFromLocalStorage = localStorage.getItem('nc_checklist_tasks');
        if (tasksFromLocalStorage) {
            tasks.value = JSON.parse(tasksFromLocalStorage);
        }
        isLoading.value = false;
    }
});

</script>

<template>
    <div class="container container-sm">
        <h1 class="title mb-2">Online Checklist Maker</h1>
        <h2 class="mb-8">Create and manage checklists online.</h2>
            
        <div class="space-y-6">
            <!-- Inline Task Creation -->
            <div class="card">
                <div class="space-y-4">
                    <div v-if="editTaskActive" class="space-y-2">
                        <h3 class="text-lg font-medium">Edit Task</h3>
                        <UFormField label="Task" class="flex-1">
                            <UInput class="flex-1 w-full" v-model="newTask.title" @keyup.enter="updateTask" size="md" placeholder="Update task title..." />
                        </UFormField>
                        <UFormField label="Notes (optional)" class="flex-1">
                            <UTextarea v-model="newTask.notes" placeholder="Add notes..." :ui="{ base: 'h-20 min-h-20 max-h-20 overflow-auto' }" class="w-full"></UTextarea>
                        </UFormField>
                        <div class="flex gap-2 justify-end">
                            <UButton @click="cancelUpdateTask" color="gray" variant="soft" icon="i-ph-x-light">Cancel</UButton>
                            <UButton @click="updateTask" icon="i-ph-check-light">Update Task</UButton>
                        </div>
                    </div>
                    
                    <div v-else class="space-y-2">
                        <h3 class="text-lg font-medium">Add New Task</h3>
                        <div class="flex gap-2">
                            <UFormField class="flex-1">
                                <UInput class="flex-1 w-full" v-model="newTask.title" @keyup.enter="addTask" size="lg" placeholder="What do you need to do?" />
                            </UFormField>
                            <UButton @click="addTask" :disabled="!newTask.title.trim()" icon="i-ph-plus-light" size="lg">Add</UButton>
                        </div>
                        <UFormField v-if="newTask.title.trim()" label="Notes (optional)">
                            <UTextarea v-model="newTask.notes" @keyup.enter="addTask" placeholder="Add notes or details..." :ui="{ base: 'h-16 min-h-16 max-h-16 overflow-auto' }" class="w-full"></UTextarea>
                        </UFormField>
                    </div>
                </div>
            </div>
            
            
        </div>
            <div class="py-8">
                <div class="">
                    <Loading v-if="isLoading" class="mx-auto my-12"/>
                    
                    <div class="space-y-6" v-if="tasks.length">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="text-lg font-medium text-center">Your Checklist</h2>
                            </div>
                            <div v-for="item in tasks" :key="item.id"
                                class="flex items-center justify-between border-b border-gray-200 last:border-b-0 py-4 px-6 group hover:bg-gray-50 transition-colors">
                                <div class="flex items-center gap-4 min-h-10 flex-1">
                                    <UCheckbox color="success" v-model="item.completed" class="cursor-pointer shrink-0"
                                        :id="item.id" />
                                    <div class="flex-1 min-w-0">
                                        <div :class="{ 'line-through text-gray-500': item.completed }" class="text-base font-medium truncate"> 
                                            {{ item.title }}
                                        </div>
                                        <div v-if="item.notes" class="text-sm text-gray-500 line-clamp-2 mt-1">{{ item.notes }}</div>
                                    </div>
                                </div>
                                <div class="shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <UButton variant="soft" icon="i-ph-pencil-simple-light" color="gray" size="sm"
                                        @click="editTask(item.id)" title="Edit task"> </UButton>
                                    <UButton variant="soft" icon="i-ph-trash-light" color="red" size="sm"
                                        @click="removeTask(item.id)" title="Delete task"> </UButton>
                                </div>
                            </div>
                        </div>
                        

                        <!-- Export/Print Actions -->
                        <div v-if="tasks.length > 0" class="flex justify-center gap-2">
                            <UButton @click="exportAsText" variant="outline" icon="i-ph-download-simple-light" size="sm">Export as Text</UButton>
                            <UButton @click="printChecklist" variant="outline" icon="i-ph-printer-light" size="sm">Print Checklist</UButton>
                        </div>
                        
                        <div class="flex items-center justify-between gap-6 py-4 px-6 bg-gray-50 rounded-lg border">
                            <span class="text-sm text-gray-600">Delete all tasks</span>
                            <UButton @click.prevent="showDeleteModal = true" color="error" variant="soft" icon="i-ph-trash-light" size="sm">
                                Delete All
                            </UButton>
                        </div>
                    </div>
                    
                    <div v-else-if="!isLoading">
                        <div class="text-center py-12 card">
                            <div class="text-xl text-gray-600 flex flex-col gap-3 justify-center">
                                <span class="text-4xl">📝</span>
                                <span class="font-medium">No tasks yet!</span>
                                <span class="text-sm text-gray-500">Add your first task above to get started</span>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        
            <div class="space-y-4">
                <h2 class="text-2xl pt-4 font-semibold">Conquer Your To-Do List with Our Powerful Online Checklist Maker!
                </h2>
    
                <div>
                    Tired of juggling scraps of paper and struggling to stay organized? Our free online checklist maker is
                    here
                    to simplify your life. Create, manage, and conquer your tasks with ease, all in one convenient location.
                </div>
    
                <p class="pt-4">Here's what makes our tool stand out:</p>
                <ul class="list-disc list-inside space-y-1.5">
                    <li><strong>Effortless Organization:</strong> Ditch the paper and sticky notes! Effortlessly build clear
                        and concise checklists online.</li>
                    <li><strong>Boost Productivity:</strong> Focus on what matters most. Checklists help you prioritize
                        tasks, track progress,
                        and
                        avoid procrastination.</li>
                    <li><strong>Achieve Goals:</strong> Break down large goals into manageable steps. Use our checklist
                        maker to visualize your
                        progress and stay motivated.</li>
                    <li><strong>Intuitive Interface:</strong> Our user-friendly design makes creating and managing
                        checklists
                        a breeze. No
                        complex
                        software to learn, just jump right in.</li>
                    <li><strong>Free to Use:</strong> Get started with our online checklist maker today, completely free. No
                        sign-ups or hidden
                        costs
                        required.</li>
                </ul>
    
    
    
                <!-- Create unlimited checklists: No restrictions on the number of checklists you can manage.
                Add detailed tasks: Include clear descriptions and deadlines for each task on your list.
                Mark tasks complete: Tick off completed tasks with satisfaction and track your progress.
                Easy management: Drag and drop to reorder tasks and prioritize your workload efficiently.
                Offline access (Optional): Consider adding the ability to access and manage checklists offline for added
                convenience (requires additional development). -->
                <div class="pt-4">
                    <strong>Ready to take control of your to-do list?</strong> Get started with our free online checklist
                    maker today!
                    Increase
                    your productivity, achieve your goals, and experience the power of organized task management.
                </div>
    
            </div>
            <UModal v-model:open="showDeleteModal" title="Do you want to delete all the tasks?">
                <template #body>
                    <div class="flex justify-end gap-4">
                        <UButton @click="showDeleteModal = false">No</UButton>
                        <UButton color="error" @click="deleteTasks">Yes</UButton>
                    </div>
    
                </template>
            </UModal>
    </div>
</template>


