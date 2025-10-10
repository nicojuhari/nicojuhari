<!-- checkout page using stripe and our cart store -->
<script setup>
import { UButton, UModal } from '#components'
import { useCartStore } from '@/store/cart'
import StripeCheckoutForm from '@/components/demos/StripeCheckoutForm.vue'
import { ref } from 'vue'

definePageMeta({
  ssr: false  
})
useHead({
  title: 'Checkout',
  meta: [
    { name: 'description', content: 'Checkout page for completing your purchase' }
  ]
})

const cartStore = useCartStore()
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')

const handlePaymentSuccess = (result) => {
  showSuccessModal.value = true
  if (!result.demo) {
    cartStore.clearCart()
  }
}

const handlePaymentError = (error) => {
  errorMessage.value = error.message || 'Something went wrong with the payment. Please try again.'
  showErrorModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  cartStore.clearCart() // Clear cart after demo payment
  navigateTo('/demos')
}

const closeSuccessMessage = () => {
  // Clear the success query parameter and cart
//   cartStore.clearCart()
  router.replace('/demos/checkout')
}
</script>
<template>
  <div class="container my-6">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <div v-if="cartStore.items.length === 0" class="text-center p-8 text-gray-600 border border-dashed border-gray-300 rounded-lg">
      Your cart is empty. Please add items to your cart before proceeding to checkout.
    </div>
    <div v-else class="space-y-6">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border-b p-2 text-left">Item</th>
            <th class="border-b p-2 text-right">Price</th>
            <th class="border-b p-2 text-right">Quantity</th>
            <th class="border-b p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.id">
            <td class="border-b p-2">{{ item.name }}</td>
            <td class="border-b p-2 text-right">${{ item.price?.toFixed(2) }}</td>
            <td class="border-b p-2 text-right">{{ item.quantity }}</td>
            <td class="border-b p-2 text-right">${{ (item.price * item.quantity)?.toFixed(2) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="p-2 text-right font-bold">Total:</td>
            <td class="p-2 text-right font-bold">
              ${{ cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)?.toFixed(2) }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="mt-8 border-t pt-6">
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Payment Details</h2>
          <StripeCheckoutForm 
            :total-amount="cartStore.totalPrice" 
            :items="cartStore.items"
            @success="handlePaymentSuccess"
            @error="handlePaymentError"
          />
        </div>
        <div class="text-right mt-4">
          <UButton @click="cartStore.clearCart" color="error" icon="i-ph-x" variant="soft">
            Clear Cart
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>