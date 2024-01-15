<script setup>
import { useRouter, useRoute } from 'vue-router';
// import { type Menu } from '~/types';

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

// const { data: stripePrices, pending } = useFetch('/stripe/prices')
const showYearlyPrices = ref(false)

const intervalPrice = computed(() => {
    return showYearlyPrices.value ? 'year' : 'month'
})

const priceCards = ref(null)
const router = useRouter();
const route = useRoute();
const isLoading = ref(false)

const newMenuSchema = ref({
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

    isLoading.value = true
    const menuIdLocal = 'oneFoodMenu'
    const oneFoodMenu = JSON.parse(localStorage.getItem(menuIdLocal) || '[]');
    const newMenuId = uid()

    newMenuSchema.value.menu_uid = newMenuId;
    newMenuSchema.value.isFromLocal = true;

    oneFoodMenu.push(newMenuSchema.value)
    localStorage.setItem(menuIdLocal, JSON.stringify(oneFoodMenu));

    setTimeout(() => {
        isLoading.value = false
        router.push(`/menu/${newMenuId}`);
    }, 600)
}




</script>
<template>
    <UButton  @click.prevent="createMenuLocal"
                        class="mt-auto justify-center">
                        Create for Free
                    </UButton>
    <!-- <div class="pb-12" v-if="stripePrices?.length">
        <div class="flex gap-6 items-center justify-center my-5">
            <div class="font-semibold">Save 20%, with yearly plans</div>
            <label for="small-toggle" class="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" id="small-toggle" class="sr-only peer" v-model="showYearlyPrices">
                <div
                    class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
            </label>
        </div>
        <div class="flex flex-col md:flex-row gap-6 justify-center">
            <div ref="priceCards" v-for="price of filteredPrices"
                class="price-cards relative rounded-lg p-6 w-full max-w-sm flex flex-col overflow-hidden shadow-md border border-gray-500 border-opacity-20">
                <div class="py-4">
                    <div class="text-4xl font-bold capitalize">{{ price.name }}</div>
                    <div class="mt-4 h-[60px] overflow-hidden">
                        {{ price.description }}
                    </div>
                    <div class="mt-4 text-2xl font-medium sm:text-4xl"> $ {{
                        price['price_' + intervalPrice].unit_amount / 100 || 0 }}
                        <span v-if="price['price_' + intervalPrice].unit_amount" class="text-base font-medium"> / {{
                            price['price_' + intervalPrice].recurring.interval }}</span>
                    </div>
                </div>

                <div class="my-4" v-if="price.metadata?.features">
                    <p class="flex items-center mb-4 gap-4" v-for="item in JSON.parse(price.metadata?.features)"
                        :key="item">
                        <UIcon class="flex-shrink-0 text-brand-green" />
                        <span>
                            {{ item }}
                        </span>
                    </p>
                </div>

                <UButton v-if="price.name != 'Free' && !currentPrice"
                    @click.prevent="createCheckoutSession(price['price_' + intervalPrice].id)"
                    class="mt-auto justify-center" severity="success">
                    Subscribe
                </UButton>
                <UButton v-else-if="price.name != 'Free' && price['price_' + intervalPrice].id != currentPrice"
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
                </UButton>
            </div>
        </div>
    </div>
    <Loading bgOpacity v-if="pending" /> -->
</template>
<style>
.price-cards {
    --y: 0;
    --x: 0;
    transition: all 1.5s ease;
}

.price-cards:hover::after {
    opacity: 1;
}

.price-cards:after {
    content: '';
    position: absolute;
    z-index: 2;
    top: var(--y);
    left: var(--x);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #2c6abc;
    filter: blur(6rem);
    display: block;
    opacity: 0;
}

.price-cards.pro-plan:after {
    background: rgb(255, 255, 255);
}</style>