<script setup>
import { useSortable } from '@vueuse/integrations/useSortable'

useHead({
    title: 'Free Online Checklist Maker: Create & Manage Tasks Easily',
    meta: [
        {
            name: 'description', content: 'Discard the paper! Create, manage, and complete your tasks using our free online checklist builder.Increase productivity and achieve your objectives.' }
    ],
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
    localStorage.setItem('nc_checklist_tasks', JSON.stringify(tasks.value));
};

watch(tasks, saveToLocalStorage, { deep: true });

onMounted(() => {
    const tasksFromLocalStorage = localStorage.getItem('nc_checklist_tasks');
    if (tasksFromLocalStorage) {
        tasks.value = JSON.parse(tasksFromLocalStorage);
        isLoading.value = false;
    }
});

//sortable
const checkListRef = ref(null)
const sortableOptions = ref(null)
const options = {
    handle: '[data-sort-handle]',
    animation: 300,
}

sortableOptions.value = useSortable(checkListRef, tasks.value, options)

</script>

<template>
    <section>
        <div class="container">
            <h1 class="text-center mb-2 page-title">Online Checklist Maker</h1>

            <div class="mb-8 text-lg font-normal text-center">Create and manage checklists online.<br>Easily
                organize your tasks, increase productivity, and remain on top of your goals.</div>
        </div>
    </section>
    <section class="bg-slate-50 min-h-">
        <div class="container">
            <div class="max-w-[600px] m-auto space-y-8">
                <UCard :ui="{ body: { padding: '!px-8 !py-10' } }">
                    <div class="space-y-6">
                        <UFormGroup label="Task" class="flex-1">
                            <UInput class="flex-1" v-model="newTask.title" @keyup.enter="addTask" size="md" />
                        </UFormGroup>
                        <UFormGroup label="Notes (optional)" class="flex-1">
                            <UTextarea :rows="2" v-model="newTask.notes" @keyup.enter="addTask"
                                :ui="{ base: 'h-14 min-h-14' }"></UTextarea>
                        </UFormGroup>
                        <div v-if="editTaskActive" class="space-x-6">
                            <UButton @click="updateTask" color="green" variant="soft" icon="i-ph-check-light"
                                class="mt-4 px-8 justify-center">Update Task</UButton>
                            <UButton @click="cancelUpdateTask" color="red" variant="soft" icon="i-ph-x-light"
                                class="mt-4 px-8 justify-center">Cancel</UButton>
                        </div>

                        <UButton v-else @click="addTask" color="brand" variant="soft" icon="i-ph-plus-light"
                            class="mt-4 px-8 justify-center">Add Task</UButton>
                    </div>
                </UCard>
            </div>
        </div>
        <div class="container py-16">
            <div class="max-w-[600px] m-auto">
                <div v-if="isLoading">
                    <div class="flex justify-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" viewBox="0 0 24 24">
                            <g>
                                <circle cx="12" cy="2.5" r="1.5" fill="#888888" opacity=".14"></circle>
                                <circle cx="16.75" cy="3.77" r="1.5" fill="#888888" opacity=".29"></circle>
                                <circle cx="20.23" cy="7.25" r="1.5" fill="#888888" opacity=".43"></circle>
                                <circle cx="21.5" cy="12" r="1.5" fill="#888888" opacity=".57"></circle>
                                <circle cx="20.23" cy="16.75" r="1.5" fill="#888888" opacity=".71"></circle>
                                <circle cx="16.75" cy="20.23" r="1.5" fill="#888888" opacity=".86"></circle>
                                <circle cx="12" cy="21.5" r="1.5" fill="#888888"></circle>
                                <animateTransform attributeName="transform" calcMode="discrete" dur="0.75s"
                                    repeatCount="indefinite" type="rotate"
                                    values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12">
                                </animateTransform>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="space-y-10" v-if="tasks.length">
                    <UCard :ui="{ body: { padding: '!p-0'}}">
                        <div ref="checkListRef">
                            <div v-for="item in tasks" :key="item.id" data-sort-handle
                                class="flex items-center justify-between border-b last:border-b-0 py-6 px-8 group">
                                <div class="flex items-center gap-6 min-h-10">
                                    <UCheckbox color="indigo" v-model="item.completed" class="cursor-pointer"
                                        :id="item.id" />
                                    <div>
                                        <div :class="{ 'line-through': item.completed }" class="text-lg"> {{ item.title
                                            }}
                                        </div>
                                        <div class="text-sm text-gray-400 line-clamp-2">{{ item.notes }}</div>
                                    </div>

                                </div>
                                <div class="shrink-0 space-x-4 hidden group-hover:block">
                                    <UButton variant="soft" icon="i-ph-pencil-simple-light" color="green"
                                        @click="editTask(item.id)"> </UButton>
                                    <UButton variant="soft" icon="i-ph-trash-light" color="red"
                                        @click="removeTask(item.id)"> </UButton>
                                </div>
                            </div>
                        </div>
                    </UCard>
                    <UButton @click.prevent="showDeleteModal = true" color="red" variant="outline" class="px-6">Clear
                        all
                    </UButton>
                </div>
                <div v-else-if="!isLoading">
                    <UCard class="text-center p-16">
                        <div class="text-2xl text-gray-600">No tasks added yet.</div>
                    </UCard>
                </div>

            </div>
        </div>
    </section>
    <section>
        <div class="container space-y-4">
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
    </section>
    <UModal v-model="showDeleteModal">
        <UCard>
            <template #header>
                <div class="text-lg">Do you really want to delete all tasks?</div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-6">
                    <UButton @click="showDeleteModal = false">Cancel</UButton>
                    <UButton color="red" @click="deleteTasks">Delete</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>


