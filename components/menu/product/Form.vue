<script setup>
    import { storeToRefs } from 'pinia';
    import { useMenuStore } from '~/store/menu'

    const emit = defineEmits(['close'])
    const { menuCategories, menu } = storeToRefs(useMenuStore())
    
    const emptyProduct = {
        uid: '',
        name: '',
        options: [],
        categoryId: '',
        description: '',
        imageUrl: '',
        tags: [],
        allergens: [],
        inStock: null
    }

</script>
<template>
</template>