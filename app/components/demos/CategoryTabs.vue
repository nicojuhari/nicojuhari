<script setup>
import { searchKey, selectedCategoryID } from '~/app/composables/useMenu';

const props = defineProps({
    categories: {
        required: true,
        type: Array
    },
    alignCenter: {
        type: Boolean,
        default: false
    },
    scrollToCategory: {
        type: Boolean,
        default: false
    }
})


const menuCategories = ref(props.categories || [])
if (!props.scrollToCategory) menuCategories.value = [{ uid: '', name: 'View All' }, ...props.categories]

const selectedCategory = ref('')
const showSearchBar = ref(false)

const menuNav = ref(null)
const menuNavYPosition = ref(0)

const handleClick = (category_id) => {

    if(props.scrollToCategory) {
        let targetBlock = document.getElementById(category_id);
        targetBlock.scrollIntoView({ behavior: 'smooth' });
        selectedCategory.value = category_id
    } else {
        selectedCategoryID.value = category_id
        selectedCategory.value = category_id
    }
    
}

const toggleSearchBar = (open = true) => {
    showSearchBar.value = open
    selectedCategory.value = ''
    searchKey.value = ''
}

const getMenuPosition = () => {
    menuNavYPosition.value = menuNav.value.getBoundingClientRect().top
}


let event1 = null
onMounted(() => {
    getMenuPosition()
    //add scroll event listener
    document.addEventListener('scroll', getMenuPosition)

    if (props.scrollToCategory) {
        event1 = document.addEventListener('scroll', function () {
            const sections = document.querySelectorAll('[data-category-section]');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 90 && rect.bottom <= window.innerHeight) {
                    selectedCategory.value = section.getAttribute('data-category-section')
                }
            });
        });
    }

})

onBeforeUnmount(() => {
    //remove scroll event listener
    document.removeEventListener('scroll', event1)
    document.removeEventListener('scroll', getMenuPosition)
})

</script>
<template>
    <div class="sticky top-0 z-50 bg-white" ref="menuNav" :class="{ 'shadow': menuNavYPosition <= 0 }">
        <div class="container overflow-y-hidden relative">
            <div class="overflow-x-auto text-sm">
                <div class="inline-flex gap-4 mx-auto md:w-full py-4" :class="alignCenter && 'md:justify-center'">
                    <div @click.prevent="toggleSearchBar"
                        class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-[#3b3b3b]/10 text-[#3b3b3b] rounded-full cursor-pointer">
                        <svg class="w-6 h-6" viewBox="0 0 20 20">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div v-for="category in menuCategories" :key="category.uid" @click="handleClick(category.uid)"
                        :class="{ '!bg-[#3b3b3b]/70 !text-white': selectedCategory == category.uid }"
                        class="bg-[#3b3b3b]/5 text-[#3b3b3b] py-2 px-4 h-10 inline-flex items-center rounded-full cursor-pointer flex-shrink-0 duration-500"
                        :data-category-tab="category.uid"> {{ category.name }}
                    </div>
                </div>
            </div>
            <Transition name="fade">
                <div class="flex items-center gap-4 absolute left-0 w-full py-4 top-0 bg-white"
                    :class="alignCenter && 'md:justify-center'" v-if="showSearchBar">
                    <div @click.prevent="toggleSearchBar(false)"
                        class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-[#3b3b3b]/10 text-[#3b3b3b] rounded-full cursor-pointer">
                        <svg class="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z" />
                        </svg>
                    </div>
                    <div class="w-full max-w-sm relative">
                        <input type="text" v-model="searchKey" placeholder="Search ..."
                            class="h-10 border rounded-full px-4 w-full" ref="searchBar" />
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: transform 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-100%);
}
</style>