<script setup>
    import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';
    const { designConfig } = storeToRefs(useMenuStore());
    // const configs = reactive({
    //     version: 1,
    //     priceSymbol: '$',
    //     allergens: {
    //         title: 'Allergens',
    //         show: true
    //     },
    //     promos: true,
    //     bundles: true,

    // })

    const isLoading = ref(true)
    setTimeout(()=> isLoading.value = false, 600)

</script>
<template>
    <div>
        <div v-if="isLoading" class="fixed z-50 top-0 left-0 w-full h-full bg-white grid content-center">
            <Loading class="m-auto !border-t-gray-500"/>
        </div>
        <UCard>
            <div class="flex sm:items-center justify-between gap-4 mb-4 flex-col md:flex-row">
              <h3 class="text-xl">Free Designs</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <div class="text-center my-5">Configurator</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UFormGroup label="Design Version">
                            <USelectMenu v-model="designConfig.version" :options="[1,2,3,4]" />
                        </UFormGroup>
                        <UFormGroup label="Price Symbol">
                            <UInput v-model="designConfig.priceSymbol" />
                        </UFormGroup>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <UFormGroup label="Allergens title">
                                <UInput v-model="designConfig.allergens.title" />
                            </UFormGroup>
                            <UFormGroup label="Show allergens">
                                <UToggle v-model="designConfig.allergens.show" />
                            </UFormGroup>
                        </div>
                </div>
                <div class="col-span-2">
                    <IncludesCodeEditor/>
                </div>
            </div>
        </UCard>
       <MenuPreview/>
    </div>
</template>