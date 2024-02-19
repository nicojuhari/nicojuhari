<script setup>
    import { storeToRefs } from 'pinia';
    import { useMenuStore } from '~/store/menu'

    const emit = defineEmits(['close'])
    const { menuProducts, menuCategories, menuAllergens, menu, viewObjectId } = storeToRefs(useMenuStore())
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
    const newProduct = ref({ ...emptyProduct });
    const productOptions = ref([])
    const productIdx = ref(0)
    const loading = ref(false)

    if (viewObjectId.value) {
        let result = searchArray(menuProducts.value, (item) => item.uid === viewObjectId.value)

        if (result?.item) {
            newProduct.value = { ...result.item }
            productIdx.value = result.index
            productOptions.value = JSON.parse(JSON.stringify(result.item.options))
        }
    }

    //get categories for select
    const selectMenuCategories = computed(() => {
        let newArr = []

        menuCategories.value.forEach((item) => {
            newArr.push({ label: item.name, value: item.uid })
        })

        return newArr
    })

    const handleForm = () => {
        loading.value = true

        //remove old fields
        let { isAvailable, salePrice, sizePrice, plu, extra, ...restProduct } = newProduct.value

        //concat options
        restProduct.options = [...productOptions.value]

        //remove emtpy Options
        restProduct.options = restProduct.options.filter((option, idx) => {

            if (Object.keys(option).length == 0) {
                return false;
            }

            if (idx > 0 && option.size == '') {
                return false;
            }

            return true;
        });

        newProduct.value = restProduct

        //update product
        if (viewObjectId.value) {
            if (menu.value) {
                menu.value.products = updateItemInArray(menuProducts.value, productIdx.value, newProduct.value)
            }
        } else {
            //create category
            menuProducts.value.push({ ...newProduct.value, uid: uid() })
        }

        setTimeout(() => {
            loading.value = false
            emit('close')
        }, 400)

    }

     onBeforeUnmount(() => {
        viewObjectId.value = null
        newProduct.value = {}
    })

</script>
<template>
    <UCard v-if="selectMenuCategories.length">
        <template #header>
            <div class="flex justify-between items-center">
                <span>  {{ viewObjectId ? 'View Product' : 'New Product' }} </span>
                <UButton @click.prevent="$emit('close')" color="gray" square variant="soft" icon="i-ph-x"/>
            </div>
        </template>
            <FormKit type="form" :actions="false" @submit="handleForm" id="productFormKit" v-model="newProduct">
            <FormKit type="text" outer-class="!mt-0" label="Product name" name="name" validation="required|length:3,100"></FormKit>
                <FormKit type="select" label="Category" name="categoryId" validation="required" placeholder=" " :options="selectMenuCategories"></FormKit>
                <FormKit type="textarea" label="Description" name="description"></FormKit>
                <FormKit type="text" label="Image URL" help="An image is not required, but it is highly recommended" name="imageUrl" validation="url"></FormKit>
                <div v-if="newProduct.imageUrl">
                    <img :src="newProduct.imageUrl" class="w-32 h-32 object-cover rounded-md mt-4"> 
                </div>
                
                <MenuProductPriceOptions v-model="productOptions" class="mt-6"/>
                <UFormGroup label="Is in stock ?" class="mt-6">
                    <UToggle color="teal" v-model="newProduct.inStock"/>
                </UFormGroup>
                <UFormGroup label="Allergens" class="mt-6">
                    <USelectMenu v-model="newProduct.allergens" :options="menuAllergens" option-attribute="name" value-attribute="uid" multiple placeholder="Select allergens" />
                </UFormGroup>
                <UFormGroup label="Tags" class="mt-6">
                    <MenuProductTags v-model="newProduct.tags"/>
                </UFormGroup>
                <!-- <Options v-model="productOptions"/>
                <Allergens v-model="newProduct.allergens" />
                <ProductTags v-model="newProduct.tags"/> -->
                <!-- <MagicTags v-model="magicTags"/> -->  
        </FormKit>
           
        <template #footer>
            <div class="flex justify-between items-center">
                <div v-if="viewObjectId" class="text-sm opacity-30">ID: {{ viewObjectId }}</div>
                <div class="flex justify-end gap-4 ml-auto">
                    <UButton @click="$formkit.submit('productFormKit')" color="brand-blue" variant="outline" :loading="loading">
                    {{ viewObjectId ? 'Update' : 'Create' }}
                    </UButton>
                </div>
            </div>
        </template> 
    </UCard>
    <UCard v-else>
        <div>
            <div class="mb-6">Please create some categories first!</div>
            <UButton :to="`/tools/free-menu-maker?menu_uid=${menu.menu_uid}&view=categories`">Category Page</UButton>
        </div>
    </UCard>
     
</template>