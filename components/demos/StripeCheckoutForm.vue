
<script setup>
import { ref, onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const props = defineProps({
  totalAmount: {
    type: Number,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['success', 'error'])

const stripe = ref(null)
const elements = ref(null)
const processing = ref(false)

// Load Stripe.js with test publishable key
onMounted(async () => {
  try {
    // Using a test publishable key for demo
    const stripeJs = await loadStripe('pk_test_51LziNwCd8lErYpFkGMt2Na0XY0PTipWabDq63Hg5kCtwV8S2tApIIVONj2zHELglWrK0LfT9GyzzEPqfPhxqPJmz00dmoXbfGY')
    stripe.value = stripeJs
    
    // Create Elements instance
    elements.value = stripe.value.elements()
    
    // Create and mount the Payment Element
    const cardElement = elements.value.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    })

    // Mount card element
    cardElement.mount('#card-element')

    // Handle validation errors
    cardElement.on('change', (event) => {
      const displayError = document.getElementById('card-errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    })
  } catch (error) {
    console.error('Error loading Stripe:', error)
    const displayError = document.getElementById('card-errors')
    displayError.textContent = 'Failed to load card form. Please try again.'
  }
})

const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!stripe.value || !elements.value || processing.value) return

  processing.value = true
  const displayError = document.getElementById('card-errors')

  try {
    const card = elements.value.getElement('card')
    
    // Since this is a demo, we'll simulate a payment intent
    // In production, you would create a PaymentIntent on your server
    // Create a payment method from the card element
    const { paymentMethod, error: paymentMethodError } = await stripe.value.createPaymentMethod({
      type: 'card',
      card: card,
      billing_details: {
        name: 'Demo User'
      }
    })

    if (paymentMethodError) {
      throw paymentMethodError
    }

    // In a real app, you would make an API call to your server here
    // For demo, we'll simulate a successful payment
    // const demoPaymentIntentId = 'pi_' + Math.random().toString(36).substr(2, 9)
    // const demoSecret = Math.random().toString(36).substr(2, 20)
    const paymentIntent = await getPaymentIntent()

    console.log('Real:', paymentIntent)

    // Now confirm the payment with the properly formatted client secret
    const { error } = await stripe.value.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: paymentMethod.id
    })

    if (error) {
      displayError.textContent = error.message
      emit('error', error)
    } else {
      // Simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 1000))
      emit('success', { 
        demo: true,
        paymentIntent: paymentIntent,
        amount: props.totalAmount,
        items: props.items,
        status: 'succeeded'
      })
      
      displayError.textContent = ''
    }
  } catch (error) {
    displayError.textContent = error.message || 'Payment failed. Please try again.'
    emit('error', error)
  } finally {
    processing.value = false
  }
}

const getPaymentIntent = async () => {
  try {
    const result = await $fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(props.totalAmount * 100), items: props.items }) // amount in cents
    })

    return result
  } catch (error) {
    console.error('Error fetching PaymentIntent:', error)
    throw error
  }
}
</script>
<template>
  <div class="w-full max-w-md mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Card Element will be mounted here -->
      <div class="p-4 border rounded-lg bg-white">
        <div id="card-element" class="min-h-[40px]"></div>
      </div>

          <!-- Error display -->
      <div id="card-errors" class="text-red-500 text-sm mt-2"></div>

      <!-- Submit button -->
      <div class="text-right">
        <UButton 
          type="submit" 
          :loading="processing" 
          :disabled="!stripe || processing"
          color="primary"
          icon="i-ph-credit-card"
        >
          Pay ${{ totalAmount.toFixed(2) }}
        </UButton>
      </div>
    </form>

    <!-- Demo Mode Notice -->
    <div class="mt-4 p-4 bg-blue-50 rounded-lg">
      <p class="text-sm text-blue-800">
        <strong>Demo Mode:</strong> This is using Stripe Elements. 
        For testing, use:
        <br>• Card: 4242 4242 4242 4242
        <br>• Any future expiry date
        <br>• Any 3 digits for CVC
      </p>
    </div>
  </div>
</template>
