<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';

//state
const { menu } = storeToRefs(useMenuStore())

const list = [
    { name: 'categories' },
    { name: 'products'},
    { name: 'allergens'}
]

//update query
const router = useRouter()
const updateQuery = (newView: string) => {
    router.replace({
        query: {
            ...router.currentRoute.value.query,
            view: newView
        }
    })
}

</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UCard class="bg-gray-100">
              <div @click.prevent="updateQuery('settings')" class="flex h-full w-full justify-center items-center">
                {{ menu?.configs.title }}
                <UButton square icon="i-ph-pencil-simple-light" variant="link" color="brand-gray" />
            </div>
        </UCard>
        <UCard 
            v-for="item in list" 
            :key="item.name"
            @click.prevent="updateQuery(item.name)"
            class="cursor-pointer"
        >
            <div class="uppercase opacity-50">{{item.name}}</div>
                <div class="font-bold text-xl mt-2">
                {{ menu?.[item.name]?.length }} 
                </div>
        </UCard>
</div>
</template>