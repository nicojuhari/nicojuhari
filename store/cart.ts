import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define the type for cart items
type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

// composition API
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const addItem = (item: { id: number; name: string; price: number }) => {
    const existingItem = items.value.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (itemId: number) => {
    items.value = items.value.filter(i => i.id !== itemId)
  }

  const clearCart = () => {
    items.value = []
  }

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  return { items, addItem, removeItem, clearCart, totalItems, totalPrice }
}, {
  persist: {
    pick: ['items']
  }
})