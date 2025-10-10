<!-- Display a table with the items in the cart -->
<script setup>
import { UButton } from '#components';
import { useCartStore } from '~/app/store/cart'
const cartStore = useCartStore()

console.log(cartStore.items)
</script>   
<template>
  <div class="container my-6">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
    <table class="w-full border-collapse" v-if="cartStore.items.length > 0">
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
    <div class="flex justify-end" v-if="cartStore.items.length > 0">
        <UButton @click="cartStore.clearCart" color="error" icon="i-ph-x" variant="solid" class="mt-4">
          Clear Cart
        </UButton>
        <UButton to="/demos/checkout" color="primary" icon="i-ph-credit-card" variant="solid" class="mt-4 ml-2">
          Proceed to Checkout
        </UButton>
      </div>
      <div v-if="cartStore.items.length === 0" class="text-center p-8 text-gray-600 border border-dashed border-gray-300 rounded-lg">
        Your cart is empty.
      </div>
  </div>
</template>