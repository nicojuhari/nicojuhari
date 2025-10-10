<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const formData = reactive({
    name: '',
    email: '',
    message: '',
    access_key: '',
    subject: '',
    from_name: ''
})
const isFormSent = ref(false)
const loading = ref(false)
const web3FormAccessKey = '8e14a520-e3cc-45e3-b53b-fa21f7a8f562'

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Email is required' })

  //validate email, complete email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(state.email)) errors.push({ name: 'email', message: 'Invalid email' })

  //validate name
  if (!state.name) errors.push({ name: 'name', message: 'Name is required' })
  if (!state.message || state.message.length < 10) errors.push({ name: 'message', message: 'Message must be at least 10 characters' })
  return errors
}

const submitForm = async (e: FormSubmitEvent<typeof formData>) => {
    e.preventDefault()
    e.stopImmediatePropagation()
    e.stopPropagation()

    loading.value = true
    try {
        formData.access_key = web3FormAccessKey
        formData.subject = formData.name + ' sent a message'
        formData.from_name = 'Nicojuhari Contact Form'

        let response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        })

        let data = await response.json()

        if (data.success) {
            isFormSent.value = true;
            formData.name = ''
            formData.email = ''
            formData.message = ''
            formData.access_key = ''
            formData.subject = ''
            formData.from_name = ''

            setTimeout(() => {
                isFormSent.value = false;
            }, 4000)
        }
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

</script>
<template>
    <div class="container container-sm my-16 md:my-24">
        <h1 class="text-center title mb-6" id="contact-me">Contact me</h1>
        <div class="relative border rounded-md p-6 bg-white">
            <UForm :validate="validate"  :state="formData" method="POST" class="space-y-4" @submit.prevent="submitForm">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UFormField label="Your name" name="name">
                        <UInput v-model="formData.name" class="w-full" size="lg"/>
                    </UFormField>
                    <UFormField label="Email" name="email">
                        <UInput v-model="formData.email" class="w-full" size="lg"/>
                    </UFormField>
                </div>
                <UFormField label="Message" name="message">
                    <UTextarea v-model="formData.message" class="w-full" size="lg" placeholder="Please tell me about your project"/>
                </UFormField>
                <div class="text-right">
                    <UButton type="submit" :loading="loading" :disabled="loading || isFormSent || validate(formData).length > 0" size="lg" class="px-8">
                        Send
                    </UButton>
                </div>
            </UForm>
            <Loading v-if="loading"  class="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"/>
            <div v-if="isFormSent" class="mt-6 text-green-600">Thank you for your message! I will contact you shortly.</div>    
        </div>
    </div>
</template>
