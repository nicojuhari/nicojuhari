<script setup>
import { reset } from '@formkit/core'
    useHead({
    title: 'Contact me - Freelance Web Developer',
    titleTemplate: '%pageTitle',
    meta: [
        { name: 'description', content: 'I craft custom websites that convert & impress. Contact me for a free quote & see how I can help you succeed online.' },
        { name: 'keywords', content: 'freelancer, web developer, javascript developer, website design' }
    ],
})

const formData = ref({})
const isFormSent = ref(false)
const loading = ref(false)
const web3FormAccessKey = '8e14a520-e3cc-45e3-b53b-fa21f7a8f562'

const submitForm = async () => {
    loading.value = true
    try {
        formData.value.access_key = web3FormAccessKey;
        formData.value.subject = formData.value.name + ' sent a message';
        formData.value.from_name = 'Website Contact Form';

        let response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData.value)
        })

        let data = await response.json()

        if (data.success) {
            isFormSent.value = true;
            // formData.value = {}
            reset('myContactForm')

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
    <div class="my-10">
        <div class="container">
            <h1 class="text-2xl md:text-4xl text-center my-10 md:my-20">Contact me</h1>
            <div class="m-auto max-w-[800px]">
                <FormKit type="form" method="POST" id="myContactForm" :actions="false" @submit="submitForm" v-model="formData">   
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <FormKit 
                            type="text" 
                            name="name" 
                            label="Name" 
                            validation="required|length:3,25"
                        />
                        <FormKit 
                            type="email" 
                            name="email" 
                            label="Email" 
                            validation="required|email"
                        />
                    </div>
                    <FormKit type="textarea" name="message" label="Message" validation="required|length:5,200"/>
                    <UButton type="submit" class="mt-8" :loading="loading" color="brand-blue">Send</UButton>
                </FormKit>
                <div v-if="isFormSent" class="mt-6">Thank you for your message! I will contact you shortly.</div>    
            </div>
        </div>
    </div>
</template>
