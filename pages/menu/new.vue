<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { type Menu } from '~/types';

const props = defineProps({
    upgrade: {
        default: false,
        type: Boolean,
    },
    currentPrice: {
        default: '',
        type: String,
    },
    subsId: {
        default: '',
        type: String,
    }
})

const { data } = await useFetch('/api/stripe/get-prices')
const showYearlyPrices = ref(true)

const intervalPrice = computed(() => {
    return showYearlyPrices.value ? 'year' : 'month'
})

const groupedPrices = computed(() => {
    let dd: any[] = [];
    let interval = showYearlyPrices.value ? 'year' : 'month'
    let ff = data.value?.filter((item) => item.recurring === interval || item.amount === 0);
    if (ff) {
        dd = ff.sort((a, b) => a?.amount - b?.amount);
    }
    return dd;
});


const router = useRouter();
const isLoading = ref(false)

const newMenuSchema = ref<Menu>({
    menu_uid: '',
    products: [],
    categories: [],
    promos: [],
    bundles: [],
    allergens:[],
    configs: {
        title: 'Default Menu Title',
    }
})

const createMenuLocal = async () => {
    isLoading.value = true;
    const menuIdLocal = "oneFoodMenu";
    const oneFoodMenu = JSON.parse(localStorage.getItem(menuIdLocal) || "[]");
    const newMenuId = uid();

    newMenuSchema.value.menu_uid = newMenuId;
    newMenuSchema.value.isFromLocal = true;

    oneFoodMenu.push(newMenuSchema.value);
    localStorage.setItem(menuIdLocal, JSON.stringify(oneFoodMenu));

    setTimeout(() => {
        isLoading.value = false;
        router.push(`/menu/${newMenuId}/dashboard`);
    }, 600);
}

const createCheckoutSession = async (priceId: string) => {
    try {
        const { getUserToken } = useAuth()
        const user = useUser()

        const newMenuId = uid()
        // Create Checkout Session
        const session = await $fetch(`/api/stripe/create-session`, {
            method: 'POST',
            headers: { 'Authorization': await getUserToken() } as {},
            body: {
                priceId,
                menuId: newMenuId,
                userEmail: user.value?.email,
                userId: user.value?.uid
            }
        });

        if(session.url) window.location.replace(session.url)
    } catch (err) {
        console.error(err)
    }

}




</script>
<template>
     <div class="container" v-if="data?.length">
        <div class="text-2xl text-center lg:mt-10 my-10">Create a new menu</div>
        <div class="flex gap-6 items-center justify-center my-5">
            <div class="font-semibold">Save 20%, with yearly plans</div>
            <label for="small-toggle" class="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" id="small-toggle" class="sr-only peer" v-model="showYearlyPrices">
                <div
                    class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
            </label>
        </div>
        <div class="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch">
            <div v-for="price of groupedPrices"
                class="price-cards relative rounded-lg p-6 w-full max-w-sm flex flex-col overflow-hidden shadow-md border border-gray-500 border-opacity-20">
                <div class="py-4">
                    <div class="text-4xl font-bold capitalize">{{ price.product.name }}</div>
                    <div class="mt-4 h-[60px] overflow-hidden">
                        {{ price.product.description }}
                    </div>
                    <div class="mt-4 text-2xl font-medium sm:text-4xl"> $ {{
                        price.amount / 100 }}
                        <span v-if="price.amount" class="text-base font-medium"> / {{
                            price.recurring }}</span>
                    </div>
                </div>

                <div class="my-4" v-if="price.product.features">
                    <p class="flex items-center mb-4 gap-4" v-for="item in price.product.features"
                        :key="item">
                        <UIcon name="i-ph-check" class="text-brand-success"/>
                        <span>
                            {{ item.name }}
                        </span>
                    </p>
                </div>
                <div class="mt-auto flex w-full">
                    <UButton v-if="price.amount != 0" @click.prevent="createCheckoutSession(price.id)" class="text-center justify-center" block>
                        Subscribe
                    </UButton>
                    <UButton v-if="price.amount == 0" @click.prevent="createMenuLocal" class="text-center justify-center" block>
                        Cerate for free
                    </UButton>
                </div>
                <!-- <UButton v-else-if="price.name != 'Free' && price['price_' + intervalPrice].id != currentPrice"
                    @click.prevent="changeSubsPlan(subsId, price['price_' + intervalPrice].id)"
                    class="mt-auto justify-center" severity="success">
                    Change Plan
                </UButton>
                <UButton v-else-if="price.name != 'Free' && price['price_' + intervalPrice].id == currentPrice" disabled
                    outlined class="mt-auto justify-center" severity="success">
                    Your Current Plan
                </UButton>
                <UButton v-else-if="price.name == 'Free'" @click.prevent="createMenuLocal" outlined severity="secondary"
                    class="mt-auto justify-center">
                    Create for Free
                </UButton> -->
            </div>
        </div>
    </div>
</template>