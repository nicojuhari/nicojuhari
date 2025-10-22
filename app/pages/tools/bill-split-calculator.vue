<script setup lang="ts">
    import { useStorage } from '@vueuse/core'
    //set ssr false for this page
    definePageMeta({
        ssr: false
    })

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
            errorMessageFriends.value = 'Friend already exists';

            setTimeout(() => {
                errorMessageFriends.value = '';
            }, 3000);

            return;
        }
        const newFriend: Friend = {
            id: Date.now().toString(),
            name: name,
            amount: 0
        }
        friends.value.push(newFriend)
        friendName.value = ''
    }

    const removeFriend = (id: string) => {
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
    const restFromSplit = ref(0)
    function calculateRestFromSplit() {
        restFromSplit.value = expense.value.amount - Object.values(customSplits).reduce((a, b) => a + (b ?? 0), 0)
    }

    const addExpense = () => {
        if (expense.value.title.trim() === '' || expense.value.amount <= 0 || expense.value.paidBy === '') {
            return;
        }

        //prepare splitBetween
        let splitBetween: { id: string, amount: number }[] = []
        if (toSplitEqually.value) {
            const equalAmount = parseFloat((expense.value.amount / friends.value.length).toFixed(2))
            friends.value.forEach(friend => {
                splitBetween.push({ id: friend.id, amount: equalAmount })
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
        restFromSplit.value = 0
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
    onMounted(() => {
        //initialize friends from state
        // friends.value = getFromLocalStorage('billSplitterFriends') || []
    })


</script>
<template>
    <div class="container container-sm p-6 bg-white border rounded-md space-y-8 my-6">
        <h1 class="text-center title mb-4">Bill Split Calculator</h1>
        <div class="space-y-4">
            <div class="flex gap-2 items-end">
                <UFormField label="Friends" class="flex-1">
                   <UInput v-model="friendName" @keyup.enter="addFriend(friendName)" placeholder="Enter friend name" size="lg" class="flex-1 w-full" />
                </UFormField>
                <div class="shrink-0">
                    <UButton @click="addFriend(friendName)">Add</UButton>
                </div>
            </div>
            <div class="flex flex-wrap gap-2">
                <div v-for="friend in friends" :key="friend.id" class="border-2 border-gray-800 px-2 py-1 rounded-md flex items-center gap-2">
                    {{ friend.name }}
                    <UButton @click.stop="removeFriend(friend.id)" variant="soft" color="neutral" size="md" icon="i-ph-x"/>
                </div>
            </div>
        </div>
        <div class="space-y-6">
           <div class="flex justify-between items-center gap-6">
                <h2 class="text-xl font-semibold mb-4">Expenses</h2>
                <UButton @click="showExpenseModal = true" title="Add Expense">Add Expense</UButton>
           </div>
            <div>
                <table class="w-full table-auto border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border px-2 py-1 text-left">Title</th>
                            <th class="border px-2 py-1 text-left">Amount</th>
                            <th class="border px-2 py-1 text-left">Paid By</th>
                            <th class="border px-2 py-1 text-left">Split Between</th>
                            <th class="border px-2 py-1 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="exp in expenses" :key="exp.id">
                            <td class="border px-2 py-1">{{ exp.title }}</td>
                            <td class="border px-2 py-1">{{ exp.amount.toFixed(2) }}</td>
                            <td class="border px-2 py-1">{{ getFriendNameById(exp.paidBy) }}</td>
                            <td class="border px-2 py-1">
                                <ul class="list-disc list-inside">
                                    <li v-for="split in exp.splitBetween" :key="split.id">
                                        {{ getFriendNameById(split.id) }} ({{ split.amount }})
                                    </li>
                                </ul>
                            </td>
                            <td class="border px-2 py-1">
                                <UButton @click="expenses = expenses.filter(e => e.id !== exp.id)" variant="soft" color="error" size="sm" icon="i-ph-trash-light" title="Delete Expense"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Balance Summary -->
        <div v-if="friends.length > 0 && expenses.length > 0" class="space-y-6">
            <h2 class="text-xl font-semibold">Balance Summary</h2>
            
            <!-- Total Expenses -->
            <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-medium text-blue-800">Total Expenses: ${{ totalExpenses.toFixed(2) }}</h3>
            </div>
            
            <!-- Individual Balances -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium">Individual Balances</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="friend in friends" :key="friend.id" class="border rounded-lg p-4">
                        <h4 class="font-medium text-lg">{{ friend.name }}</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Paid:</span>
                                <span class="font-medium text-green-600">${{ (personPaid[friend.id] || 0).toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Owes:</span>
                                <span class="font-medium text-red-600">${{ (personSpent[friend.id] || 0).toFixed(2) }}</span>
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
                                    <span v-if="(personBalance[friend.id] ?? 0) > 0.01">+${{ (personBalance[friend.id] ?? 0).toFixed(2) }} (gets back)</span>
                                    <span v-else-if="(personBalance[friend.id] ?? 0) < -0.01">-${{ Math.abs((personBalance[friend.id] ?? 0)).toFixed(2) }} (owes)</span>
                                    <span v-else>$0.00 (settled)</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Settlement Instructions -->
            <div v-if="settlements.length > 0" class="space-y-4">
                <h3 class="text-lg font-medium">Settlement Instructions</h3>
                <div class="bg-yellow-50 p-4 rounded-lg space-y-3">
                    <p class="text-yellow-800 font-medium">To settle all debts, make these payments:</p>
                    <div class="space-y-2">
                        <div 
                            v-for="settlement in settlements" 
                            :key="`${settlement.from}-${settlement.to}`"
                            class="flex items-center justify-between bg-white p-3 rounded border"
                        >
                            <span>
                                <strong>{{ getFriendNameById(settlement.from) }}</strong> 
                                pays 
                                <strong>{{ getFriendNameById(settlement.to) }}</strong>
                            </span>
                            <span class="font-bold text-green-600">${{ settlement.amount.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-else-if="friends.length > 0 && expenses.length > 0" class="bg-green-50 p-4 rounded-lg">
                <p class="text-green-800 font-medium">🎉 All expenses are settled! Everyone is even.</p>
            </div>
        </div>
        
        <UModal v-model:open="showExpenseModal" size="md">
            <template #header>Add Expense</template>
            <template #body>
                <div class="space-y-4">
                    <UFormField label="What did you spend your money on?">
                        <UInput v-model="expense.title"/>
                    </UFormField>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UFormField label="Amount">
                            <UInput v-model.number="expense.amount" type="number" placeholder="0.00" />
                        </UFormField>
                        <UFormField label="Paid By">
                            <USelect v-model="expense.paidBy" :items="friendsOptions" class="w-full" />
                        </UFormField>
                    </div>
                    <USwitch v-model="toSplitEqually" label="Split equally?" />
                    <div v-if="!toSplitEqually" class="space-y-2">
                        <div
                        v-for="friend in friends"
                        :key="friend.id"
                        class="flex items-center justify-between"
                        >
                        <span>{{ friend.name }}</span>
                        <UInput
                            v-model.number="customSplits[friend.id]"
                            type="number"
                            placeholder="0.00"
                            min="0"
                            step="1"
                            class="w-24"
                            @change="calculateRestFromSplit"
                        />
                        </div>
                        <div v-if="restFromSplit > 0" class="text-green-500">Rest from split: {{ restFromSplit.toFixed(2) }} </div>
                        <div v-if="restFromSplit < 0" class="text-red-500">Rest from split: {{ restFromSplit.toFixed(2) }} </div>
                    </div>
                    <UButton @click="addExpense">Add Expense</UButton>
                </div>
            </template>

        </UModal>
    </div>
</template>