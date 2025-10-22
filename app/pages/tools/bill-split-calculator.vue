<script setup lang="ts">
    import { UiEmptyBlock } from '#components';
import { useStorage } from '@vueuse/core'

    useHead({
        title: 'Bill Split Calculator - Restaurant Bill Splitter',
        meta: [
            { name: 'description', content: 'Bill Split Calculator - easily split expenses among friends. Track who paid what and calculate balances. Perfect for trips, dinners, and shared costs.' }
        ],
    })

    const loading = ref(true)
    type Friend = {
        id: string;
        name: string;
        amount: number;
    }
    const friends = useStorage<Friend[]>('billSplitterFriends', [])

    const friendName = ref('')
    const errorMessageFriends = ref('')
    const addFriend = (name: string) => {
        if(name.trim() === '') return;

        //check if friend already exists
        const existingFriend = friends.value.find(friend => friend.name.toLowerCase() === name.toLowerCase());
        if (existingFriend) {
            errorMessageFriends.value = 'This name already exists';

            setTimeout(() => {
                errorMessageFriends.value = '';
            }, 2000);

            return;
        }

        //capitalise first letter
        const newFriend: Friend = {
            id: Date.now().toString(),
            name: name.charAt(0).toUpperCase() + name.slice(1),
            amount: 0
        }
        friends.value.push(newFriend)
        friendName.value = ''
    }

    const removeFriendMessage = ref('')
    const removeFriend = (id: string) => {
        // check if friend is part of any expense
        const isPartOfExpense = expenses.value.some(expense => expense.splitBetween.some(split => split.id === id));
        if (isPartOfExpense) {
            // Handle case where friend is part of an expense
            removeFriendMessage.value = 'Cannot remove friend who is part of an expense';
            setTimeout(() => {
                removeFriendMessage.value = '';
            }, 2000);
            return;
        }
        friends.value = friends.value.filter(friend => friend.id !== id)
    }

    const friendsOptions = computed(() => friends.value.map(f => ({ label: f.name, value: f.id })))
    const getFriendNameById = (id: string) => {
        const friend = friends.value.find(f => f.id === id)
        return friend ? friend.name : 'Unknown'
    }


    //Expenses

    type Expense = {
        id: string;
        title: string;
        amount: number;
        paidBy: string; //friend id
        splitBetween: { id: string, amount: number }[]; //array of friend ids
    }
    const expense = ref<Expense>({
        id: '',
        title: '',
        amount: 0,
        paidBy: '',
        splitBetween: []
    })
    const expenses = useStorage<Expense[]>('billSplitterExpenses', [])
    const toSplitEqually = ref(true)
    const customSplits = reactive<{ [key: string]: number }>({})
    const restFromSplit = computed(() => {
        if(toSplitEqually.value) {
            return 0
        }
        return expense.value.amount - Object.values(customSplits).reduce((a, b) => a + (b ?? 0), 0)
    })

    const addExpense = () => {
        if (expense.value.title.trim() === '' || expense.value.amount <= 0 || expense.value.paidBy === '' || restFromSplit.value !== 0) {
            return;
        }

        //prepare splitBetween
        let splitBetween: { id: string, amount: number }[] = []
        if (toSplitEqually.value) {
            const equalAmount = parseFloat((expense.value.amount / friends.value.length).toFixed(2))
            friends.value.forEach((friend, index) => {

                if(index === friends.value.length -1) {
                    //last person, assign the rest to avoid rounding issues
                    const assignedAmount = parseFloat((expense.value.amount - (equalAmount * (friends.value.length -1))).toFixed(2))
                    splitBetween.push({ id: friend.id, amount: assignedAmount })
                } else {
                    splitBetween.push({ id: friend.id, amount: equalAmount })
                }
            })
        } else {
            splitBetween = Object.keys(customSplits).filter(id => (customSplits[id] ?? 0) > 0).map(id => {
                const friend = friends.value.find(f => f.id === id)
                return friend ? { id: friend.id, amount: customSplits[id] } : null
            }).filter((item): item is { id: string, amount: number } => item !== null)

        }
        
        console.log('Custom splits:', splitBetween, customSplits);

        const newExpense: Expense = {
            id: Date.now().toString(),
            title: expense.value.title,
            amount: expense.value.amount,
            paidBy: expense.value.paidBy,
            splitBetween: splitBetween
        }
        expenses.value.push(newExpense)

        //reset
        expense.value = {
            id: '',
            title: '',
            amount: 0,
            paidBy: '',
            splitBetween: []
        }
        toSplitEqually.value = true

        for (const key in customSplits) {
            delete customSplits[key]
        }
        
        showExpenseModal.value = false
    }

    

    //Modal
    const showExpenseModal = ref(false)


    //Calculate the balances, how much the person paid and how much the person spend
    
    // Calculate how much each person spent (owes)
    const personSpent = computed(() => {
        const spentMap: { [friendId: string]: number } = {}
        
        // Initialize all friends to 0
        friends.value.forEach(friend => {
            spentMap[friend.id] = 0
        })
        
        // Calculate what each person owes based on expenses
        expenses.value.forEach(expense => {
            expense.splitBetween.forEach(split => {
                const id = split?.id ?? ''
                if (!id) return
                spentMap[id] = (spentMap[id] ?? 0) + (split.amount ?? 0)
            })
        })
        
        return spentMap
    })
    
    // Calculate how much each person paid
    const personPaid = computed(() => {
        const paidMap: { [friendId: string]: number } = {}
        
        // Initialize all friends to 0
        friends.value.forEach(friend => {
            paidMap[friend.id] = 0
        })
        
        // Sum up payments by each person
        expenses.value.forEach(expense => {
            // Ensure there is a valid payer id and initialize if missing, then add amount
            if (!expense.paidBy) return
            paidMap[expense.paidBy] = (paidMap[expense.paidBy] ?? 0) + expense.amount
        })
        
        return paidMap
    })
    
    // Calculate net balance (positive = owed money, negative = owes money)
    const personBalance = computed(() => {
        const balanceMap: { [friendId: string]: number } = {}
        
        friends.value.forEach(friend => {
            const paid = personPaid.value[friend.id] || 0
            const spent = personSpent.value[friend.id] || 0
            balanceMap[friend.id] = paid - spent
        })
        
        return balanceMap
    })
    
    // Calculate who owes money to whom
    const settlements = computed(() => {
        const balances = { ...personBalance.value }
        const settlements: { from: string, to: string, amount: number }[] = []
        
        // Get creditors (people who are owed money) and debtors (people who owe money)
        const creditors = Object.entries(balances)
            .filter(([_, balance]) => balance > 0)
            .map(([id, balance]) => ({ id, balance }))
            .sort((a, b) => b.balance - a.balance)
            
        const debtors = Object.entries(balances)
            .filter(([_, balance]) => balance < 0)
            .map(([id, balance]) => ({ id, balance: Math.abs(balance) }))
            .sort((a, b) => b.balance - a.balance)
        
        // Calculate settlements
        let i = 0, j = 0
        while (i < creditors.length && j < debtors.length) {
            const creditor = creditors[i]
            const debtor = debtors[j]

            // Guard against unexpected undefined entries (TypeScript safety)
            if (!creditor || !debtor) break
            
            const amount = Math.min(creditor.balance, debtor.balance)
            
            if (amount > 0.01) { // Avoid tiny amounts due to floating point precision
                settlements.push({
                    from: debtor.id,
                    to: creditor.id,
                    amount: Math.round(amount * 100) / 100
                })
            }
            
            creditor.balance -= amount
            debtor.balance -= amount
            
            if (creditor.balance <= 0.01) i++
            if (debtor.balance <= 0.01) j++
        }
        
        return settlements
    })
    
    // Total expenses
    const totalExpenses = computed(() => {
        return expenses.value.reduce((total, expense) => total + expense.amount, 0)
    })
    
    const resetAll = () => {
        friends.value = []
        expenses.value = []
        expense.value = {
            id: '',
            title: '',
            amount: 0,
            paidBy: '',
            splitBetween: []
        }
        toSplitEqually.value = true
        showExpenseModal.value = false
    }

    onMounted(() => {
        loading.value = false
    })


</script>
<template>
    
    <div class="container container-sm">
        <h1 class="title mb-2">Bill Split Calculator</h1>
        <h2 class="mb-8">Perfect for splitting restaurant bills and travel expenses among friends.</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="card">
                <div class="space-y-2">
                    <p class="text-lg font-semibold">Add People</p>
                    <div class="relative">
                        <UInput v-model="friendName" maxlength="20" @keyup.enter="addFriend(friendName)" placeholder="Enter name" size="lg" />
                        <UButton color="neutral"
                                class="absolute right-0"
                                v-if="friendName.length > 0"
                                label="Add"
                                @click="addFriend(friendName)"
                            />
                    </div>
                    <div v-if="errorMessageFriends" class="text-red-500 text-sm">{{ errorMessageFriends }}</div>
                    
                    <div class="flex flex-wrap gap-2">
                        <div v-for="friend in friends" :key="friend.id" class="border-1 bg-gray-100/50 overflow-hidden rounded-md flex items-center gap-2">
                            <span class="pl-2">{{ friend.name }}</span>
                            <UButton @click.stop="removeFriend(friend.id)" variant="soft" color="neutral" size="sm" icon="i-ph-x"/>
                        </div>
                    </div>
                    <div v-if="removeFriendMessage" class="text-red-500 text-sm">{{ removeFriendMessage }}</div>
                </div>
            </div>
            <div class="card">
                <p class="text-lg font-semibold">Add Expenses</p>
                <UInput v-model="expense.title" placeholder="Description" class="mt-2"/>
                <div class="flex flex-col lg:flex-row gap-6 mt-6">
                     <UInput v-model.number="expense.amount" type="number" placeholder="0.00" class="w-full lg:w-1/3" />
                     <USelect v-model="expense.paidBy" placeholder="Paid By" :items="friendsOptions" class="w-full lg:w-2/3" />
                </div>
                <USwitch v-model="toSplitEqually" label="Split equally?" color="success" class="mt-6" /> 
                <div v-if="!toSplitEqually && expense.amount > 0" class="space-y-4 mt-6">
                    <div
                    v-for="friend in friends"
                    :key="friend.id"
                    class="flex items-center justify-between"
                    >
                    <span class="truncate">{{ friend.name }}</span>
                    <UInput
                        v-model.number="customSplits[friend.id]"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="1"
                        class="w-24 shrink-0"
                    />
                    </div>
                    <div v-if="restFromSplit > 0" class="text-green-500">Rest from split: {{ restFromSplit.toFixed(2) }} </div>
                    <div v-if="restFromSplit < 0" class="text-red-500">Rest from split: {{ restFromSplit.toFixed(2) }} </div>
                </div>
                <div class="text-right mt-6">
                    <UButton @click="addExpense" :disabled="restFromSplit>0">Add Expense</UButton>
                </div>
                    </div>
        </div>
        <div class="card space-y-10 mt-6" v-if="!loading">
            <div>
                 <!--Expenses -->
                <h2 class="text-lg font-semibold mb-2">Expenses</h2>    
                <div v-if="expenses.length > 0" class="overflow-x-auto">
                    <table class="w-full table-auto border-collapse border">
                        <thead>
                            <tr class="bg-gray-100/50">
                                <th class="px-2 py-1 text-left font-semibold text-sm">Title</th>
                                <th class="px-2 py-1 text-center font-semibold text-sm">Amount</th>
                                <th class="px-2 py-1 text-left font-semibold text-sm">Paid By</th>
                                <th class="px-2 py-1 text-left font-semibold text-sm">Split Between</th>
                                <th class="px-2 py-1 text-left font-semibold text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exp in expenses" :key="exp.id" class="border text-sm">
                                <td class="px-2 py-2"><div class="truncate w-24">{{ exp.title }}</div></td>
                                <td class="px-2 py-2 w-24 text-center">{{ exp.amount.toFixed(2) }}</td>
                                <td class="px-2 py-2"> <div class="truncate w-24">{{ getFriendNameById(exp.paidBy) }}</div></td>
                                <td class="px-2 py-2">
                                    <div v-for="split in exp.splitBetween" :key="split.id" class="inline-flex items-center mr-2">
                                        {{ getFriendNameById(split.id) }} <span class="text-xs">({{ split.amount }})</span>
                                    </div>
                                </td>
                                <td class="pl-2 py-2">
                                    <UButton @click="expenses = expenses.filter(e => e.id !== exp.id)" variant="soft" color="error" size="sm" icon="i-ph-x-light" title="Delete Expense"/>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr class="bg-gray-100/50 font-medium">
                                <td class="px-2 py-1 text-left">Total</td>
                                <td class="px-2 py-1 text-center">{{ totalExpenses.toFixed(2) }}</td>
                                <td class="px-2 py-1" colspan="3"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <UiEmptyBlock v-else>
                   No expenses added yet.
                </UiEmptyBlock>
            </div>
            <div class="space-y-2">
                <h3 class="text-lg font-semibold">Settlement Steps</h3>
                <div class="space-y-2" v-if="settlements.length > 0 && expenses.length > 0">
                        <div 
                            v-for="settlement in settlements" 
                            :key="`{settlement.from}-{settlement.to}`"
                            class="flex items-center justify-between bg-gray-100/50 p-3 rounded border"
                        >
                            <span>
                                <strong>{{ getFriendNameById(settlement.from) }}</strong> 
                                pays 
                                <strong>{{ getFriendNameById(settlement.to) }}</strong>
                            </span>
                            <span class="font-bold text-green-600">{{ settlement.amount.toFixed(2) }}</span>
                        </div>
                </div>
                <div v-else-if="friends.length > 0 && expenses.length > 0" class="bg-green-50 p-4 rounded-lg">
                    <p class="text-green-800 font-medium">🎉 All expenses are settled! Everyone is even.</p>
                </div>
                <ui-empty-block v-else>
                   No settlement steps to show yet.
                </ui-empty-block>
            </div>

            <div class="space-y-2">
                <h3 class="text-lg font-semibold">Individual Balances</h3>
                <div class="flex overflow-x-auto gap-4" v-if="expenses.length > 0">
                    <div v-for="friend in friends" :key="friend.id" class="border rounded-lg p-4 min-w-[280px]">
                        <h4 class="font-medium text-lg mb-2">{{ friend.name }}</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Paid:</span>
                                <span class="font-medium text-green-600">{{ (personPaid[friend.id] || 0).toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Spent:</span>
                                <span class="font-medium text-red-600">{{ (personSpent[friend.id] || 0).toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between border-t pt-2">
                                <span class="font-medium">Balance:</span>
                                <span 
                                    :class="{
                                        'text-green-600': (personBalance[friend.id] ?? 0) > 0,
                                        'text-red-600': (personBalance[friend.id] ?? 0) < 0,
                                        'text-gray-600': Math.abs(personBalance[friend.id] ?? 0) < 0.01
                                    }"
                                    class="font-bold"
                                >
                                    <span v-if="(personBalance[friend.id] ?? 0) > 0.01">+{{ (personBalance[friend.id] ?? 0).toFixed(2) }} (gets back)</span>
                                    <span v-else-if="(personBalance[friend.id] ?? 0) < -0.01">-{{ Math.abs((personBalance[friend.id] ?? 0)).toFixed(2) }} (owes)</span>
                                    <span v-else>0.00 (settled)</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <UiEmptyBlock v-else>
                   No balances to show yet.
                </UiEmptyBlock>
            </div>
            <div class="text-right" v-if="expenses.length > 0 || friends.length > 0">
                <UButton @click="resetAll" color="error" variant="soft" title="Delete all Data" icon="i-ph-trash-light">Delete All Data</UButton>
            </div>
        

        </div>
        <Loading v-else class="mx-auto my-20" />
        <div class="space-y-6 mt-6">
                <div class="space-y-4">
                    <p> Save time and stop the guesswork. Add people, log expenses, and choose equal or custom splits.</p>
                    <p>See who paid, who owes, and exact payment steps. The app finds the fewest transfers to settle debts. Works on mobile and desktop.</p>
                    
                    <div>
                        <h3 class="text-lg font-semibold">Key features</h3>
                        <ul class="space-y-2 list-disc list-inside">
                            <li>
                                Add or remove people quickly.
                            </li>
                            <li>
                                Equal or custom splits with real-time checks.
                            </li>
                            <li>
                                Full expense history and per-person balances.
                            </li>
                            <li>
                                Smart settlement that minimizes transactions.
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-lg">Privacy note</h4>
                        <p class="">
                            All data is stored only in your browser. Nothing is sent to our servers. You are the only one who can access your info.
                        </p>
                    </div>
                </div>
        </div>
    </div>
</template>