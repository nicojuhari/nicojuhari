<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

useHead({
    title: 'Contact me | Full-Stack Web Developer',
    titleTemplate: '%pageTitle',
    meta: [
        { name: 'description', content: 'Get in touch for custom websites that convert & impress. Contact for a free quote & see how I can help you succeed online with expert design solutions.' },
        { name: 'keywords', content: 'freelancer, web developer, javascript developer, restaurant website design' }
    ],
})

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
    <div class="container">
        <h1 class="text-center title py-4 mt-12">Contact me</h1>
        <UCard class="m-auto max-w-[800px] relative">
            <UForm :validate="validate"  :state="formData" method="POST" class="space-y-4" @submit.prevent="submitForm">
                <UFormField label="Your name" name="name">
                    <UInput v-model="formData.name" class="w-full" />
                </UFormField>
                <UFormField label="Email" name="email">
                    <UInput v-model="formData.email" class="w-full" />
                </UFormField>
                <UFormField label="Message" name="message">
                    <UTextarea v-model="formData.message" class="w-full"/>
                </UFormField>
                <UButton type="submit" :loading="loading" :disabled="loading || isFormSent || validate(formData).length > 0">
                    Send
                </UButton>
            </UForm>
            <Loading v-if="loading"  class="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"/>
            <div v-if="isFormSent" class="mt-6 text-green-600">Thank you for your message! I will contact you shortly.</div>    
        </UCard>
    </div>
</template>
